import { Publication } from '../types';

export const PUBLICATIONS: Publication[] = [
  {
    id: "p1",
    title: "Discrete Optimization for Continuous Manipulation",
    authors: ["Evan Yifeng Liu", "Advisor Name"],
    venue: "RSS",
    year: 2024,
    abstract: "A hybrid approach utilizing mixed-integer programming to guide reinforcement learning policies in contact-rich manipulation tasks.",
    thumbnail: "https://picsum.photos/400/300"
  },
  {
    id: "p2",
    title: "Architectural Priors in Robot Perception",
    authors: ["Evan Yifeng Liu", "Collaborator A"],
    venue: "ICRA",
    year: 2023,
    abstract: "Leveraging structural blueprints to improve SLAM accuracy in dynamic construction environments.",
    thumbnail: "https://picsum.photos/401/300"
  },
  {
    id: "p3",
    title: "Multi-Agent logistics in Vertical Cities",
    authors: ["Evan Yifeng Liu", "Collaborator B"],
    venue: "Operations Research Letters",
    year: 2022,
    abstract: "Optimizing elevator dispatching and robot delivery routing in high-density architectural volumes.",
    thumbnail: "https://picsum.photos/402/300"
  }
];