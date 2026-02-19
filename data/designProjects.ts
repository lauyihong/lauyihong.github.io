import { Project } from '../types';

export const DESIGN_PROJECTS: Project[] = [
  {
    id: "dp1",
    title: "Responsive Pavilion",
    description: "A kinetic structure deployed in Shanghai that adjusts its porosity based on sunlight sensors and pedestrian flow density.",
    tags: ["Rhino", "Arduino", "Fabrication"],
    collaborators: ["Collaborator D", "Collaborator E"],
    image: "https://images.unsplash.com/photo-1505568133821-19884076557a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "dp2",
    title: "Urban Voids Analysis",
    description: "Computational analysis of negative space in high-density housing blocks, utilizing graph theory to propose communal interventions.",
    tags: ["Grasshopper", "Python", "Urbanism"],
    collaborators: ["Collaborator F"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "dp3",
    title: "The Machine Aesthetic",
    description: "A speculative design manifesto and series of drawings exploring the intersection of brutalist architecture and data center cooling infrastructure.",
    tags: ["Drawing", "Theory", "Speculative"],
    collaborators: ["Collaborator G"],
  }
];