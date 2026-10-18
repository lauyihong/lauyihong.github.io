#!/usr/bin/env node
// Turns a Markdown file into a password-protected static page.
//
//   PAGE_PASSWORD='long pass phrase' node scripts/encrypt-page.mjs private/drafts.md public/drafts/index.html [--title "Drafts"]
//
// The Markdown is rendered to HTML here, local images are inlined, and the result
// is encrypted with AES-256-GCM (key from PBKDF2-SHA256, 600k iterations). Only the
// ciphertext lands in the output file; the browser decrypts it after the visitor
// types the password. Keep the source .md out of git (private/ is gitignored).
// If PAGE_PASSWORD is not set, the password is asked for interactively.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { webcrypto as crypto } from 'node:crypto';
import { marked } from 'marked';

const ITERATIONS = 600000;
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

function parseArgs(argv) {
  const positional = [];
  let title = 'Protected page';
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--title') title = argv[++i];
    else positional.push(argv[i]);
  }
  if (positional.length !== 2) {
    console.error('Usage: node scripts/encrypt-page.mjs <input.md> <output.html> [--title "Page title"]');
    process.exit(1);
  }
  return { input: positional[0], output: positional[1], title };
}

function askHidden(question) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    process.stdout.write(question);
    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    let value = '';
    stdin.on('data', function onData(ch) {
      if (ch === '\r' || ch === '\n' || ch === '\u0004') {
        stdin.setRawMode?.(false);
        stdin.pause();
        stdin.off('data', onData);
        process.stdout.write('\n');
        resolve(value);
      } else if (ch === '\u0003') {
        process.exit(130);
      } else if (ch === '\u007f') {
        value = value.slice(0, -1);
      } else {
        value += ch;
      }
    });
  });
}

async function getPassword() {
  if (process.env.PAGE_PASSWORD) return process.env.PAGE_PASSWORD;
  const first = await askHidden('Password: ');
  const second = await askHidden('Repeat password: ');
  if (first !== second) {
    console.error('Passwords do not match.');
    process.exit(1);
  }
  return first;
}

// Local images would otherwise sit unencrypted next to the page, so embed them.
async function inlineLocalImages(html, baseDir) {
  const matches = [...html.matchAll(/<img([^>]*?)src="([^"]+)"/g)];
  for (const [, , src] of matches) {
    if (/^(https?:|data:)/i.test(src)) continue;
    const file = path.resolve(baseDir, decodeURI(src));
    const mime = MIME[path.extname(file).toLowerCase()];
    if (!mime) throw new Error(`Unsupported image type: ${src}`);
    const data = (await readFile(file)).toString('base64');
    html = html.replaceAll(`src="${src}"`, `src="data:${mime};base64,${data}"`);
  }
  return html;
}

async function encrypt(plaintext, password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  );
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext)));
  const blob = new Uint8Array(salt.length + iv.length + ciphertext.length);
  blob.set(salt, 0);
  blob.set(iv, salt.length);
  blob.set(ciphertext, salt.length + iv.length);
  return Buffer.from(blob).toString('base64');
}

const escapeHtml = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

function renderPage(title, payload) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(title)}</title>
<style>
  :root {
    --bg: #f6f5f2; --surface: #ffffff; --text: #1d1d1b; --muted: #6b6a66;
    --line: #e2e0da; --accent: #b5562a; --chip: #efede8; --bad: #b3261e;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --bg: #161614; --surface: #1f1f1d; --text: #ecebe7; --muted: #a09e98;
      --line: #34332f; --accent: #e08a5c; --chip: #2a2a27; --bad: #f2867d;
    }
  }
  :root[data-theme="dark"] {
    --bg: #161614; --surface: #1f1f1d; --text: #ecebe7; --muted: #a09e98;
    --line: #34332f; --accent: #e08a5c; --chip: #2a2a27; --bad: #f2867d;
  }
  * { box-sizing: border-box; }
  html { -webkit-text-size-adjust: 100%; }
  body {
    margin: 0; background: var(--bg); color: var(--text);
    font: 16px/1.75 system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  .gate { min-height: 100vh; display: grid; place-items: center; padding: 16px; }
  .gate form {
    width: 100%; max-width: 360px; background: var(--surface); border: 1px solid var(--line);
    border-radius: 12px; padding: 28px 24px;
  }
  .gate h1 { font-size: 18px; margin: 0 0 6px; }
  .gate p { color: var(--muted); font-size: 14px; margin: 0 0 18px; }
  .gate input {
    width: 100%; font: inherit; color: var(--text); background: var(--bg);
    border: 1px solid var(--line); border-radius: 8px; padding: 9px 12px;
  }
  .gate input:focus { outline: 2px solid var(--accent); outline-offset: 1px; }
  .gate button {
    width: 100%; margin-top: 12px; font: inherit; font-weight: 600; color: #fff;
    background: var(--accent); border: 0; border-radius: 8px; padding: 9px 12px; cursor: pointer;
  }
  .gate button:disabled { opacity: .6; cursor: wait; }
  .gate .error { color: var(--bad); font-size: 14px; min-height: 1.5em; margin: 10px 0 0; }
  article { max-width: 760px; margin: 0 auto; padding: 40px 16px 80px; overflow-wrap: break-word; }
  article h1 { font-size: 28px; line-height: 1.3; margin: 0 0 16px; }
  article h2 { font-size: 21px; margin: 2em 0 .6em; }
  article h3 { font-size: 17px; margin: 1.6em 0 .5em; }
  article a { color: var(--accent); }
  article img { max-width: 100%; height: auto; border-radius: 6px; }
  article blockquote { margin: 1em 0; padding: 0 16px; border-left: 3px solid var(--line); color: var(--muted); }
  article code { font: 14px/1.5 ui-monospace, Consolas, monospace; background: var(--chip); padding: 2px 5px; border-radius: 4px; }
  article pre { background: var(--chip); padding: 14px 16px; border-radius: 8px; overflow-x: auto; }
  article pre code { background: none; padding: 0; }
  article table { border-collapse: collapse; display: block; overflow-x: auto; }
  article th, article td { border: 1px solid var(--line); padding: 6px 10px; }
  article hr { border: 0; border-top: 1px solid var(--line); margin: 2em 0; }
</style>
</head>
<body>
<main class="gate" id="gate">
  <form id="unlock">
    <h1>${escapeHtml(title)}</h1>
    <p>此页面已加密，请输入密码查看。</p>
    <input id="pw" type="password" autocomplete="current-password" placeholder="密码" required autofocus>
    <button id="go" type="submit">打开</button>
    <p class="error" id="err" role="alert"></p>
  </form>
</main>
<article id="content" hidden></article>
<script>
const PAYLOAD = "${payload}";
const ITERATIONS = ${ITERATIONS};

async function decrypt(password) {
  const bytes = Uint8Array.from(atob(PAYLOAD), (c) => c.charCodeAt(0));
  const salt = bytes.slice(0, 16), iv = bytes.slice(16, 28), data = bytes.slice(28);
  const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    baseKey, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
  return new TextDecoder().decode(await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data));
}

document.getElementById('unlock').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('go'), err = document.getElementById('err');
  btn.disabled = true; err.textContent = '';
  try {
    const html = await decrypt(document.getElementById('pw').value);
    const content = document.getElementById('content');
    content.innerHTML = html;
    const heading = content.querySelector('h1');
    if (heading) document.title = heading.textContent;
    document.getElementById('gate').remove();
    content.hidden = false;
  } catch {
    err.textContent = '密码错误，请重试。';
    btn.disabled = false;
  }
});
</script>
</body>
</html>
`;
}

const { input, output, title } = parseArgs(process.argv.slice(2));
const markdown = await readFile(input, 'utf8');
const html = await inlineLocalImages(await marked.parse(markdown), path.dirname(input));
const password = await getPassword();
if (password.length < 12) console.warn('Warning: short passwords can be brute-forced offline. Prefer 4+ random words.');
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, renderPage(title, await encrypt(html, password)));
console.log(`Wrote ${output}`);
