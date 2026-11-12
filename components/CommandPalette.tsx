import { useCallback, useEffect, useRef } from 'react';
import 'ninja-keys';
import type { NinjaKeys } from 'ninja-keys';
import { PROFILE } from '../data';

type NinjaAction = NinjaKeys['data'][number];

// Inline Lucide-style icons (ninja-keys renders `icon` as raw HTML).
const svg = (paths: string) =>
  `<svg class="ninja-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const ICONS = {
  home: svg('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>'),
  section: svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>'),
  book: svg('<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5"/><path d="M20 19v3H6.5"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  link: svg('<path d="M7 17 17 7"/><path d="M8 7h9v9"/>'),
  theme: svg('<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/>'),
};

const openExternal = (url: string) => window.open(url, '_blank', 'noopener,noreferrer');

interface UseCommandPaletteOptions {
  onNavigate: (target: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

/**
 * Mounts a single <ninja-keys> command palette (Ctrl+K / ⌘K) on the page and
 * returns a function that opens it, e.g. from the navbar search button.
 */
export function useCommandPalette({ onNavigate, isDark, onToggleTheme }: UseCommandPaletteOptions) {
  const elRef = useRef<NinjaKeys | null>(null);

  // Create the element once. Attributes must be set before it is connected,
  // otherwise ninja-keys auto-loads the Material Icons font from Google.
  useEffect(() => {
    const el = document.createElement('ninja-keys') as NinjaKeys;
    el.placeholder = 'Search pages, links, settings…';
    el.hideBreadcrumbs = true;
    el.noAutoLoadMdIcons = true;
    document.body.appendChild(el);
    elRef.current = el;
    return () => {
      el.remove();
      elRef.current = null;
    };
  }, []);

  useEffect(() => {
    elRef.current?.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const { socials } = PROFILE;
    const actions: NinjaAction[] = [
      // Navigate
      { id: 'home', title: 'Home', section: 'Navigate', keywords: 'top about bio', icon: ICONS.home, handler: () => onNavigate('top') },
      { id: 'research', title: 'Research & Projects', section: 'Navigate', keywords: 'robotics vision projects', icon: ICONS.section, handler: () => onNavigate('research') },
      { id: 'experience', title: 'Industry Experience', section: 'Navigate', keywords: 'work internship bytedance meituan', icon: ICONS.section, handler: () => onNavigate('experience') },
      // Contact
      { id: 'email', title: 'Email', section: 'Contact', keywords: `mail contact ${PROFILE.email}`, icon: ICONS.mail, handler: () => { window.location.href = `mailto:${PROFILE.email}`; } },
      { id: 'github', title: 'GitHub', section: 'Contact', keywords: 'code repositories', icon: ICONS.link, handler: () => openExternal(socials.github) },
      { id: 'scholar', title: 'Google Scholar', section: 'Contact', keywords: 'papers publications citations', icon: ICONS.link, handler: () => openExternal(socials.scholar) },
      { id: 'linkedin', title: 'LinkedIn', section: 'Contact', keywords: 'cv resume', icon: ICONS.link, handler: () => openExternal(socials.linkedin) },
      { id: 'x', title: 'X (Twitter)', section: 'Contact', keywords: 'twitter x social', icon: ICONS.link, handler: () => openExternal(socials.twitter) },
      // Settings
      { id: 'theme', title: isDark ? 'Switch to light mode' : 'Switch to dark mode', section: 'Settings', keywords: 'theme dark light appearance', icon: ICONS.theme, handler: onToggleTheme },
    ];
    el.data = actions;
  }, [onNavigate, isDark, onToggleTheme]);

  return useCallback(() => elRef.current?.open(), []);
}
