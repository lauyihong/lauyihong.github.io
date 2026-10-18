#!/usr/bin/env node
// 把 markdown 渲染成 HTML 后用密码加密，输出一个自包含的静态页面。
//
// 用法：npm run encrypt-page -- <输入.md> <输出.html> [--title "页面标题"]
// 密码：优先读 PAGE_PASSWORD 环境变量；没有就在终端里隐藏输入（输两次确认）。
// 页面在浏览器本地用 Web Crypto 解密：PBKDF2-SHA256 派生密钥 + AES-256-GCM。
// 输出里只有标题、页面骨架和密文；写完会自检能否解密、骨架里有没有混入原文。

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { webcrypto } from 'node:crypto';
import { marked } from 'marked';

const ITERATIONS = 600_000;
const MIN_PASSWORD_LENGTH = 12;
const { subtle } = webcrypto;
const encoder = new TextEncoder();

function fail(message) {
  console.error(`encrypt-page: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const positional = [];
  let title = 'Protected Page';
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--title') {
      title = argv[++i];
      if (title === undefined) fail('--title 缺少值');
    } else if (arg.startsWith('--title=')) {
      title = arg.slice('--title='.length);
    } else {
      positional.push(arg);
    }
  }
  if (positional.length !== 2) {
    fail('用法：npm run encrypt-page -- <输入.md> <输出.html> [--title "页面标题"]');
  }
  return { input: positional[0], output: positional[1], title };
}

function promptHidden(question) {
  return new Promise((resolve) => {
    const { stdin, stderr } = process;
    if (!stdin.isTTY) fail('没有可交互的终端：请在终端里运行，或设置 PAGE_PASSWORD');
    stderr.write(question);
    stdin.setRawMode(true);
    stdin.setEncoding('utf8');
    stdin.resume();
    let chars = [];
    const cleanup = () => {
      stdin.off('data', onData);
      stdin.setRawMode(false);
      stdin.pause();
      stderr.write('\n');
    };
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === '\r' || ch === '\n') {
          cleanup();
          resolve(chars.join(''));
          return;
        }
        if (ch === '\u0003') {
          cleanup();
          process.exit(130);
        }
        if (ch === '\u007f' || ch === '\b') chars = chars.slice(0, -1);
        else if (ch >= ' ') chars.push(ch);
      }
    };
    stdin.on('data', onData);
  });
}

function lengthProblem(password) {
  const length = [...password].length;
  return length < MIN_PASSWORD_LENGTH ? `密码至少要 ${MIN_PASSWORD_LENGTH} 个字符（这次收到 ${length} 个）` : null;
}

async function getPassword() {
  if (process.env.PAGE_PASSWORD !== undefined) {
    const password = process.env.PAGE_PASSWORD.normalize('NFC');
    const problem = lengthProblem(password);
    if (problem) fail(problem);
    return password;
  }
  for (let attempt = 0; attempt < 3; attempt++) {
    const password = (await promptHidden('输入页面密码（不回显）：')).normalize('NFC');
    const problem = lengthProblem(password);
    if (problem) {
      console.error(problem);
      continue;
    }
    const again = (await promptHidden('再输一次确认：')).normalize('NFC');
    if (password === again) return password;
    console.error('两次输入的密码不一致，请重新输入');
  }
  fail('连续 3 次没有设好密码，已退出');
}

async function deriveKey(password, salt, iterations) {
  const baseKey = await subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
  return subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

function renderMarkdown(markdown) {
  return marked
    .parse(markdown, { gfm: true, async: false })
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

// 原文里较长的文字片段（按行、按表格单元切），用来检查页面骨架里有没有混入原文。
function plaintextFragments(markdown) {
  const fragments = new Set();
  for (const line of markdown.split(/\r?\n/)) {
    for (const cell of line.split('|')) {
      const text = cell
        .replace(/^[\s#>*+-]+/, '')
        .replace(/^\d+\.\s+/, '')
        .replace(/[*`_]/g, '')
        .trim();
      if ([...text].length >= 6 && !/^[-:\s]+$/.test(text)) fragments.add(text);
    }
  }
  return [...fragments];
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}

const toBase64 = (bytes) => Buffer.from(bytes).toString('base64');

function buildPage(title, payload) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow, noarchive">
<title>${escapeHtml(title)}</title>
<style>
  :root {
    --bg: #f6f5f2; --surface: #ffffff; --text: #1d1d1b; --muted: #6b6a66;
    --line: #e2e0da; --accent: #b5562a; --chip: #efede8; --bad: #b3261e;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg: #161614; --surface: #1f1f1d; --text: #ecebe7; --muted: #a09e98;
      --line: #34332f; --accent: #e08a5c; --chip: #2a2a27; --bad: #f2b8b5;
    }
  }
  :root[data-theme="dark"] {
    --bg: #161614; --surface: #1f1f1d; --text: #ecebe7; --muted: #a09e98;
    --line: #34332f; --accent: #e08a5c; --chip: #2a2a27; --bad: #f2b8b5;
  }
  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; scroll-padding-top: 16px; }
  body {
    margin: 0; background: var(--bg); color: var(--text);
    font: 15px/1.7 system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  [hidden] { display: none !important; }

  .lock { min-height: 100vh; display: grid; place-items: center; padding: 24px 16px; }
  .lock form {
    width: 100%; max-width: 380px; background: var(--surface); border: 1px solid var(--line);
    border-radius: 12px; padding: 28px 24px;
  }
  .lock h1 { font-size: 22px; line-height: 1.3; margin: 0 0 6px; }
  .lock p { margin: 0 0 18px; color: var(--muted); font-size: 14px; }
  .lock label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px; }
  .lock input {
    width: 100%; font: inherit; padding: 9px 12px; border-radius: 8px;
    border: 1px solid var(--line); background: var(--bg); color: var(--text);
  }
  .lock input:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
  .lock button {
    margin-top: 14px; width: 100%; font: inherit; font-weight: 600; padding: 9px 12px;
    border: 0; border-radius: 8px; background: var(--accent); color: #fff; cursor: pointer;
  }
  .lock button:disabled { opacity: 0.6; cursor: progress; }
  .lock .status { min-height: 1.6em; margin: 10px 0 0; font-size: 13px; color: var(--muted); }
  .lock .status.error { color: var(--bad); }

  .layout { max-width: 1240px; margin: 0 auto; padding: 32px 16px 80px; }
  @media (min-width: 1100px) {
    .layout { display: grid; grid-template-columns: 260px minmax(0, 1fr); gap: 40px; align-items: start; }
    .toc-box { position: sticky; top: 16px; max-height: calc(100vh - 32px); overflow-y: auto; }
  }
  .toc-box { font-size: 13px; margin-bottom: 24px; }
  .toc-box summary { cursor: pointer; font-weight: 600; color: var(--muted); margin-bottom: 6px; }
  .toc-box ol { list-style: none; margin: 0; padding: 0; }
  .toc-box li { margin: 2px 0; }
  .toc-box li.h3 { padding-left: 14px; }
  .toc-box a { color: var(--muted); text-decoration: none; display: block; line-height: 1.5; padding: 1px 0; }
  .toc-box a:hover { color: var(--accent); }

  article { min-width: 0; }
  article h1 { font-size: 26px; line-height: 1.3; margin: 0 0 16px; letter-spacing: -0.01em; }
  article h2 { font-size: 20px; line-height: 1.35; margin: 40px 0 12px; padding-top: 12px; border-top: 1px solid var(--line); }
  article h3 { font-size: 16px; line-height: 1.4; margin: 28px 0 8px; }
  article p, article ul, article ol { margin: 0 0 12px; }
  article ul, article ol { padding-left: 22px; }
  article li { margin: 3px 0; }
  article code {
    font: 13px/1.5 ui-monospace, SFMono-Regular, Consolas, monospace;
    background: var(--chip); padding: 1px 5px; border-radius: 4px; overflow-wrap: anywhere;
  }
  article pre { background: var(--chip); padding: 12px 14px; border-radius: 8px; overflow-x: auto; }
  article pre code { background: none; padding: 0; }
  article blockquote { margin: 0 0 12px; padding: 4px 14px; border-left: 3px solid var(--line); color: var(--muted); }
  article a { color: var(--accent); }
  article hr { border: 0; border-top: 1px solid var(--line); margin: 28px 0; }
  .table-wrap { overflow-x: auto; margin: 0 0 16px; border: 1px solid var(--line); border-radius: 8px; background: var(--surface); }
  .table-wrap table { border-collapse: collapse; width: 100%; font-size: 13.5px; line-height: 1.55; }
  .table-wrap th, .table-wrap td { padding: 7px 10px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
  .table-wrap th { background: var(--chip); font-weight: 600; white-space: nowrap; }
  .table-wrap tr:last-child td { border-bottom: 0; }
  @media (max-width: 640px) {
    .layout { padding-top: 20px; }
    article h1 { font-size: 22px; }
    .table-wrap td { min-width: 7em; }
  }
</style>
</head>
<body>
<main class="lock" id="lock">
  <form id="unlock" autocomplete="on">
    <h1>${escapeHtml(title)}</h1>
    <p>此页面已加密，输入密码后在本地浏览器中解密。</p>
    <label for="password">密码</label>
    <input id="password" name="password" type="password" autocomplete="current-password" required autofocus>
    <button type="submit" id="submit">打开</button>
    <p class="status" id="status" role="status" aria-live="polite"></p>
  </form>
</main>
<div class="layout" id="page" hidden>
  <details class="toc-box" id="toc-box">
    <summary>目录</summary>
    <nav aria-label="目录"><ol id="toc"></ol></nav>
  </details>
  <article id="content"></article>
</div>
<script type="application/json" id="payload">${JSON.stringify(payload)}</script>
<script>
(() => {
  const payload = JSON.parse(document.getElementById('payload').textContent);
  const form = document.getElementById('unlock');
  const input = document.getElementById('password');
  const button = document.getElementById('submit');
  const status = document.getElementById('status');
  const fromBase64 = (text) => Uint8Array.from(atob(text), (ch) => ch.charCodeAt(0));

  async function decrypt(password) {
    const baseKey = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(password.normalize('NFC')), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', hash: 'SHA-256', salt: fromBase64(payload.salt), iterations: payload.iterations },
      baseKey, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromBase64(payload.iv) }, key, fromBase64(payload.ciphertext));
    return new TextDecoder().decode(plain);
  }

  function buildToc(article) {
    const toc = document.getElementById('toc');
    article.querySelectorAll('h2, h3').forEach((heading, index) => {
      heading.id = 'sec-' + (index + 1);
      const item = document.createElement('li');
      item.className = heading.tagName.toLowerCase();
      const link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      item.appendChild(link);
      toc.appendChild(item);
    });
    const box = document.getElementById('toc-box');
    if (!toc.children.length) box.hidden = true;
    else if (window.matchMedia('(min-width: 1100px)').matches) box.open = true;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!window.crypto || !crypto.subtle) {
      status.textContent = '浏览器不支持解密（需要 HTTPS 和较新的浏览器）。';
      status.className = 'status error';
      return;
    }
    button.disabled = true;
    status.textContent = '解密中…';
    status.className = 'status';
    try {
      const html = await decrypt(input.value);
      const article = document.getElementById('content');
      article.innerHTML = html;
      buildToc(article);
      document.getElementById('lock').hidden = true;
      document.getElementById('page').hidden = false;
      window.scrollTo(0, 0);
    } catch (error) {
      status.textContent = '密码不对，请再试一次。';
      status.className = 'status error';
      input.select();
    } finally {
      button.disabled = false;
    }
  });
})();
</script>
</body>
</html>
`;
}

async function main() {
  const { input, output, title } = parseArgs(process.argv.slice(2));
  const markdown = await readFile(input, 'utf8');
  const password = await getPassword();

  const html = renderMarkdown(markdown);
  const salt = webcrypto.getRandomValues(new Uint8Array(16));
  const iv = webcrypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt, ITERATIONS);
  const ciphertext = new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv }, key, encoder.encode(html)));
  const payload = {
    version: 1,
    iterations: ITERATIONS,
    salt: toBase64(salt),
    iv: toBase64(iv),
    ciphertext: toBase64(ciphertext),
  };
  const page = buildPage(title, payload);

  // 自检 1：用同一个密码按页面里的参数重新派生密钥，必须能解出原样的 HTML。
  const checkKey = await deriveKey(password, salt, payload.iterations);
  const roundTrip = new TextDecoder().decode(await subtle.decrypt({ name: 'AES-GCM', iv }, checkKey, ciphertext));
  if (roundTrip !== html) fail('自检失败：解密结果与原文不一致');

  // 自检 2：去掉密文后的页面骨架里不能出现原文片段（标题是自己指定的，除外）。
  const skeleton = page.replace(payload.ciphertext, '');
  const leaks = plaintextFragments(markdown).filter((text) => !title.includes(text) && skeleton.includes(text));
  if (leaks.length) fail(`自检失败：页面里出现了 ${leaks.length} 处原文片段，例如「${leaks[0]}」`);

  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, page, 'utf8');
  const kb = (Buffer.byteLength(page) / 1024).toFixed(1);
  console.log(`已写入 ${output}（${kb} KB）。自检通过：能解密还原，页面骨架里没有原文片段。`);
}

main().catch((error) => fail(error.message));
