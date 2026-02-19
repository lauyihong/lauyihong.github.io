import { Project } from '../types';

export const TECHNICAL_PROJECTS: Project[] = [
  {
    id: "pr1",
    title: "Adaptive Gripper Control",
    description: "Hardware-software co-design of a gripper that adapts its geometry based on object topology using real-time tactile feedback.",
    tags: ["Python", "PyBullet", "Control Theory"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
    details: {
      subtitle: "Tactile Intelligence for Unstructured Manipulation",
      challenge: `Standard robotic grippers operate on a rigid logic: they assume a known geometry or rely on crushing force to secure an object. 
      However, in unstructured environments—like construction sites or disaster zones—objects are often irregular, fragile, or slippery.
      The goal was to create a gripper that doesn't just "grab" but "feels" the object's topology and adjusts its own geometry accordingly.`,
      solution: `We developed a soft-actuated finger design embedded with high-resolution tactile sensors. The control loop utilizes a hierarchical approach:
      
      1. **Low-Level (1kHz):** Local reflex loops adjust finger stiffness based on shear force detection to prevent slippage.
      2. **Mid-Level (100Hz):** A geometric reconstruction algorithm estimates the local surface curvature of the object.
      3. **High-Level (10Hz):** An RL policy (PPO) decides the optimal grasp strategy (e.g., pinch, wrap, or cage) based on the reconstructed shape.`,
      results: `The adaptive gripper achieved a **94% success rate** on the YCB object set, outperforming standard rigid grippers by 15% on adversarial geometries (e.g., mustard bottles, power drills). 
      Furthermore, the hardware-software co-design reduced the energy consumption by 20% by optimizing the force application vectors.`,
      additionalImages: [
        "https://images.unsplash.com/photo-1535378437327-b712818f6652?auto=format&fit=crop&q=80&w=800", 
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
      ]
    }
  },
  {
    id: "pr2",
    title: "Site-Sim Environment",
    description: "An open-source simulation environment for construction robotics based on real-world architectural BIM data.",
    tags: ["C++", "Isaac Gym", "ProcGen"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "pr3",
    title: "Opti-Plan Library",
    description: "A lightweight C++ library for trajectory optimization in constrained 3D manifolds. Designed for low-compute embedded systems.",
    tags: ["C++", "Optimization", "Embedded"],
    // No image - Text only example
  },
  {
    id: "pr4",
    title: "Swarm 3D Printing",
    description: "Cooperative multi-robot additive manufacturing system for large-scale architectural components without bounding box constraints.",
    tags: ["ROS2", "Python", "Manufacturing"],
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=600"
  }
];