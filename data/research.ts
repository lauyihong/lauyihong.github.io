import { ResearchItem } from '../types';

// Items shown when "Research & Projects" is clicked on the home page.
// image: path under /public (e.g. "/research/foo.png"); omit for a blank placeholder.
// status: venue/type label, e.g. "Conference · NeurIPS 2025", "Workshop", "Competition", "Journal", "Preprint".
export const RESEARCH: ResearchItem[] = [
  {
    id: "lerobotneck",
    title: "LeRobotNeck: Open Sourced Low Cost Robot Neck for Active Perception",
    status: "Open Source · Hardware",
    badgeNote: "Coming Soon!!!",
    authors: [],
    image: "/research/lerobotneck.jpg",
    links: [
      { label: "code", url: "https://github.com/lauyihong/lerobotneck" },
    ],
  },
  {
    id: "tower-challenge",
    title: "Agentic Task Decomposition for Skill-Specialist Robot Policies",
    status: "CORL 2026 Generation to Action Challenge · Competition",
    authors: ["Yifeng Liu"],
    award: "#1 🏆 in challenge!",
    image: "/research/tower_t5_t4_t1.gif",
    links: [
      { label: "project page", url: "/tower-challenge/" },
      { label: "technical report", url: "/tower-challenge/TOWER_Sakai_technical_report.pdf" },
    ],
  },
  {
    id: "act2see",
    title: "Act2See: Structured Articulated Representations through Robot Interaction",
    status: "Workshop · RSS 2026 FM4RoboPlan",
    note: "Extended paper in submission",
    authors: ["Yifeng Liu*", "Yuzhen Chen*", "Bingyang Wang*", "Chengqi Li", "Jingyi Lu", "Han Li", "Kaichen Zhou", "Mengyu Wang", "Fangneng Zhan"],
    authorNote: "* Equal contribution",
    image: "/research/act2see.gif",
    links: [
      { label: "project page", url: "https://lauyihong.github.io/act2see/" },
      { label: "paper", url: "https://openreview.net/forum?id=sghH6peEK8" },
      { label: "code (coming soon)" }, // repo private until review ends: https://github.com/lauyihong/active_perception
    ],
  },
];
