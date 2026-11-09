import { ResearchItem } from '../types';

// Items shown when "Research & Projects" is clicked on the home page.
// image: path under /public (e.g. "/research/foo.png"); omit for a blank placeholder.
// status: venue/type label, e.g. "Conference · NeurIPS 2025", "Workshop", "Competition", "Journal", "Preprint".
export const RESEARCH: ResearchItem[] = [
  {
    id: "tower-challenge",
    title: "Agentic Task Decomposition for Skill-Specialist Robot Policies",
    status: "Competition · TOWER Challenge 2026",
    authors: ["Yifeng Liu"],
    image: "/research/tower_t5_t4_t1.gif",
    links: [
      { label: "project page", url: "/tower-challenge/" },
      { label: "technical report", url: "/tower-challenge/TOWER_Sakai_technical_report.pdf" },
    ],
  },
  {
    id: "act2see",
    title: "Act2See: Structured Articulated Representations through Robot Interaction",
    status: "Workshop · RSS 2026 FM4RoboPlan · Extended paper in submission",
    authors: ["Yifeng Liu*", "Yuzhen Chen*", "Bingyang Wang*", "Chengqi Li", "Jingyi Lu", "Han Li", "Kaichen Zhou", "Mengyu Wang", "Fangneng Zhan"],
    image: "/research/act2see.gif",
    links: [
      { label: "project page", url: "https://lauyihong.github.io/act2see/" },
      { label: "paper", url: "https://openreview.net/forum?id=sghH6peEK8" },
      { label: "code", url: "https://github.com/lauyihong/active_perception" },
    ],
  },
];
