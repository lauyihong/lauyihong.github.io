import { Project } from '../types';

export const TECHNICAL_PROJECTS: Project[] = [
  {
    id: "pr1",
    title: "xLeRobot: Autonomous Mahjong-Playing Robot",
    description: "An end-to-end robotic system for playing physical mahjong. Built on the SO-100 robotic arm with custom end-effector for precise tile manipulation. Integrates Vision-Language Models for game-state perception and strategic decision-making, with visuomotor control deployed via the LeRobot framework. Formulates a flow network optimization model bridging high-level planning and physical execution.",
    tags: ["Robotics", "VLM", "LeRobot"],
    collaborators: ["Yifeng Liu"],
    affiliation: "MIT · Feb 2026",
    links: [
      { label: "project page", url: "#" },
      { label: "video", url: "#" },
      { label: "code", url: "#" }
    ]
  },
  {
    id: "pr2",
    title: "Articulated Object Reconstruction & Modeling with Active Vision",
    description: "An end-to-end pipeline for reconstructing articulated objects from fixed-perspective photos: 3D mesh generation → SAM-based part-level segmentation → hinge/joint estimation → interactable movable mesh assembly. The system supports active vision for iterative refinement through robot-object interaction.",
    tags: ["3D Vision", "Segmentation", "Robotics"],
    collaborators: ["Yifeng Liu", "Multisensory Intelligence Group"],
    affiliation: "MIT Media Lab · Sep 2025 – Present",
    links: [
      { label: "details", url: "#" }
    ]
  },
  {
    id: "pr3",
    title: "Real2Code: Articulated Object Code Generation from Visual Observations",
    description: "Reproduction and extension of the Real2Code pipeline for generating simulation-ready articulated assets from visual observations. Integrated PointNet-based 3D shape completion, Blender rendering pipeline, and SAPIEN simulation environment for creating interactable digital twins of real-world articulated objects.",
    tags: ["3D Vision", "Simulation", "PointNet"],
    collaborators: ["Yifeng Liu (reproduction & extension)"],
    affiliation: "MIT Media Lab · 2025",
    links: [
      { label: "code", url: "#" }
    ]
  },
  {
    id: "pr4",
    title: "Resolving Braess's Paradox via Deep Reinforcement Learning in Open Traffic Systems",
    description: "A framework modeling real-world traffic as an MDP and training DQN agents to control traffic lights and speed limits. Designed per-vehicle optimal agents and demonstrated emergent reduction of Braess's paradox through learned cooperative policies.",
    tags: ["Deep RL", "Traffic", "MDP"],
    collaborators: ["Yifeng Liu"],
    affiliation: "MIT · May 2024",
    links: [
      { label: "paper", url: "#" },
      { label: "code", url: "#" }
    ]
  },
  {
    id: "pr5",
    title: "End-to-End Policy Learning for 3D Bin Packing",
    description: "A 3D bin packing solver using end-to-end deep RL to compute optimal spatial packing strategies for arbitrary item sets and fixed container sizes. Achieved competitive solution quality with significant speedup over heuristic baselines, enabling real-time packing decisions in logistics workflows.",
    tags: ["Deep RL", "Optimization", "Logistics"],
    collaborators: ["Yifeng Liu"],
    affiliation: "ByteDance · Summer 2024"
  }
];
