// News shown above "Research & Projects" on the home page.
// Add new items at the top. `text` may contain simple HTML (e.g. links).
export interface NewsItem {
  date: string; // e.g. "2026 Nov"
  text: string;
}

export const NEWS: NewsItem[] = [
  {
    date: "2026 Nov",
    text: "I just won 1st place 🏅 in the CoRL 2026 TAG/G2A Workshop Competition. All will be released soon!!",
  },
];
