import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowLeft, Clock, Tag } from 'lucide-react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import ChatWidget from './components/ChatWidget';
import { PROFILE, PUBLICATIONS, TECHNICAL_PROJECTS, INDUSTRY_EXPERIENCE } from './data';
import { Project, IndustryExperience } from './types';

// --- Components ---

const MapWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if script is already there to avoid duplicates
    if (containerRef.current.querySelector('#mapmyvisitors')) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'mapmyvisitors';
    script.src = 'https://mapmyvisitors.com/map.js?cl=d1d1d1&w=a&t=n&d=oeiR-cUnGjbVvYidl9tI42Db7SfqSDYwxx9M3-OxrCw&co=ffffff&cmo=939393&cmn=000000';

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
        ref={containerRef}
        className="flex justify-center items-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        style={{ minHeight: '100px' }}
    />
  );
};

const ProjectDetailView: React.FC<{ project: Project; onBack: () => void }> = ({ project, onBack }) => {
  const { details } = project;

  // Fallback for projects without extended details
  if (!details) {
    return (
       <div className="pt-32 pb-20 px-6 md:px-12 container mx-auto max-w-4xl min-h-screen flex flex-col animate-in fade-in duration-500">
         <button onClick={onBack} className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-black transition-colors mb-12 text-gray-500">
            <ArrowLeft className="w-4 h-4" /> Back to Index
         </button>

         <div className="mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-mono uppercase tracking-wider">
                        {tag}
                    </span>
                ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-6">{project.title}</h1>
            <p className="text-xl font-light text-gray-600 leading-relaxed">{project.description}</p>
            {project.affiliation && (
              <p className="font-mono text-xs text-gray-400 mt-4">{project.affiliation}</p>
            )}
         </div>

         {project.image && (
             <div className="w-full aspect-video bg-gray-100 overflow-hidden mb-12">
                 <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale" />
             </div>
         )}

         <div className="p-8 bg-gray-50 border border-gray-200">
           <p className="font-mono text-sm text-gray-500">Additional case study details are being compiled.</p>
         </div>
       </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 md:px-12 animate-in fade-in duration-500">
      <div className="container mx-auto max-w-3xl">
        {/* Navigation */}
        <button
            onClick={onBack}
            className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest hover:text-black transition-colors mb-16 text-gray-400"
        >
            <div className="p-2 border border-gray-200 rounded-full group-hover:border-black transition-colors">
                <ArrowLeft className="w-3 h-3" />
            </div>
            Back to Index
        </button>

        {/* Header */}
        <div className="border-b border-black/10 pb-12 mb-12">
            <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-mono uppercase tracking-wider">
                        {tag}
                    </span>
                ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-medium leading-tight mb-6 text-black">
                {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
                {details.subtitle}
            </p>
        </div>

        {/* Main Image */}
        {project.image && (
            <div className="w-full aspect-video mb-16 bg-gray-100 overflow-hidden border border-black/5">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
        )}

        {/* Article Body */}
        <div className="prose prose-lg prose-neutral max-w-none mb-20">
            {details.challenge && (
                <>
                    <h3 className="text-2xl font-medium mt-12 mb-6">The Challenge</h3>
                    <div className="text-gray-700 text-lg leading-relaxed font-light mb-8 whitespace-pre-line">
                        {details.challenge}
                    </div>
                </>
            )}

            {details.solution && (
                <>
                    <h3 className="text-2xl font-medium mt-12 mb-6">Approach</h3>
                    <div className="text-gray-700 text-lg leading-relaxed font-light mb-8 whitespace-pre-line">
                        {details.solution}
                    </div>
                </>
            )}

            {details.results && (
                <>
                    <h3 className="text-2xl font-medium mt-12 mb-6">Results</h3>
                    <div className="text-gray-700 text-lg leading-relaxed font-light mb-8 whitespace-pre-line">
                        {details.results}
                    </div>
                </>
            )}
        </div>

        {details.additionalImages && details.additionalImages.length > 0 && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {details.additionalImages.map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] overflow-hidden bg-gray-50 border border-black/5">
                         <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                    </div>
                ))}
             </div>
        )}
      </div>
    </div>
  );
}

const HomeView: React.FC<{
    onProjectSelect: (p: Project) => void;
}> = ({ onProjectSelect }) => {
    return (
        <>
             {/* Hero Section */}
            <div className="pt-32 pb-20 md:pt-48 md:pb-16">
                <div className="container mx-auto px-6 md:px-12 lg:px-24 border-b border-black/10 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                        {/* Title Row */}
                        <div className="md:col-span-9 md:col-start-4 mb-2">
                            <div className="text-3xl md:text-4xl font-medium text-black leading-tight">
                                I'm Yifeng Liu.
                            </div>
                        </div>

                        {/* Avatar & Links: Left Column */}
                        <div className="md:col-span-3 flex flex-col gap-6">
                            <div className="w-full max-w-[180px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img
                                    src={PROFILE.avatar}
                                    alt={PROFILE.name}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            <div className="flex flex-row flex-wrap gap-4 items-center">
                                <a href={PROFILE.cv} className="font-mono text-xs uppercase tracking-wider border-b border-black/20 hover:border-black pb-1">CV</a>
                                <a href={`mailto:${PROFILE.email}`} className="font-mono text-xs uppercase tracking-wider border-b border-black/20 hover:border-black pb-1">Email</a>
                                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-wider border-b border-black/20 hover:border-black pb-1">GitHub</a>
                                <a href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-wider border-b border-black/20 hover:border-black pb-1">Scholar</a>
                                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-wider border-b border-black/20 hover:border-black pb-1">LinkedIn</a>
                            </div>
                        </div>

                        {/* Bio Text: Right Column */}
                        <div className="md:col-span-9">
                             <div
                                className="prose prose-lg prose-neutral max-w-none"
                                dangerouslySetInnerHTML={{ __html: PROFILE.heroIntro || '' }}
                             />
                        </div>

                    </div>
                </div>
            </div>

            {/* Research Section */}
            <section id="research" className="py-20 border-b border-black/5">
              <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <div className="space-y-16">

                    {/* Research & Projects Table */}
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Research & Projects</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-black/10">
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-2/5">Title</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-1/5 hidden md:table-cell">Collaborators</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-1/5 hidden md:table-cell">Affiliation</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 w-1/5 hidden md:table-cell">Links</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TECHNICAL_PROJECTS.map((proj) => (
                                    <tr
                                        key={proj.id}
                                        className="group border-b border-black/5 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-5 pr-4">
                                            <span className="font-medium block mb-1">{proj.title}</span>
                                            <span className="text-gray-500 font-light text-sm leading-relaxed block">{proj.description}</span>
                                            {/* Mobile-only info */}
                                            <div className="md:hidden mt-2 space-y-1">
                                                <span className="text-gray-400 font-mono text-xs block">{proj.affiliation}</span>
                                                {proj.links && (
                                                    <div className="flex flex-wrap gap-3 mt-1">
                                                        {proj.links.map((link, i) => (
                                                            <a key={i} href={link.url} className="font-mono text-xs text-gray-500 underline underline-offset-2 decoration-gray-300 hover:text-black hover:decoration-black transition-colors">
                                                                {link.label}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-5 pr-4 text-sm text-gray-500 font-light align-top hidden md:table-cell">
                                            {proj.collaborators?.join(', ') ?? '—'}
                                        </td>
                                        <td className="py-5 pr-4 font-mono text-xs text-gray-500 align-top hidden md:table-cell">
                                            {proj.affiliation ?? '—'}
                                        </td>
                                        <td className="py-5 align-top hidden md:table-cell">
                                            {proj.links ? (
                                                <div className="flex flex-wrap gap-3">
                                                    {proj.links.map((link, i) => (
                                                        <a key={i} href={link.url} className="font-mono text-xs text-gray-500 underline underline-offset-2 decoration-gray-300 hover:text-black hover:decoration-black transition-colors">
                                                            {link.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            ) : '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Selected Publications Table */}
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Selected Publications</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-black/10">
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-2/5">Title</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-1/4 hidden md:table-cell">Venue</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-[60px] hidden md:table-cell">Year</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 w-[60px] hidden md:table-cell"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {PUBLICATIONS.map((pub) => (
                                    <tr key={pub.id} className="group border-b border-black/5 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 pr-4">
                                            <span className="font-medium block mb-1">{pub.title}</span>
                                            <span className="text-sm font-light block">
                                                {pub.authors.map((author, i) => (
                                                    <span
                                                        key={i}
                                                        className={author.includes("Liu") ? "text-black font-medium" : "text-gray-500"}
                                                    >
                                                        {author}{i < pub.authors.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </span>
                                            {/* Mobile-only info */}
                                            <div className="md:hidden mt-1">
                                                <span className="text-gray-400 font-mono text-xs">{pub.venue}, {pub.year}</span>
                                                {pub.link && (
                                                    <a href={pub.link} className="font-mono text-xs text-gray-500 underline underline-offset-2 decoration-gray-300 hover:text-black ml-3">paper</a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 pr-4 font-mono text-xs text-gray-500 align-top hidden md:table-cell">
                                            {pub.venue}
                                        </td>
                                        <td className="py-4 pr-4 font-mono text-xs text-gray-500 align-top hidden md:table-cell">
                                            {pub.year}
                                        </td>
                                        <td className="py-4 align-top hidden md:table-cell">
                                            {pub.link && (
                                                <a href={pub.link} className="font-mono text-xs text-gray-500 underline underline-offset-2 decoration-gray-300 hover:text-black hover:decoration-black transition-colors">
                                                    paper
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Industry Experience Table */}
                    <div id="experience">
                        <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Industry Experience</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-black/10">
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-[140px] hidden md:table-cell">Date</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-1/5">Role</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-4 w-1/4 hidden md:table-cell">Company</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 w-1/3 hidden md:table-cell">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {INDUSTRY_EXPERIENCE.map((exp) => (
                                    <tr key={exp.id} className="group border-b border-black/5 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 pr-4 font-mono text-xs text-gray-500 align-top hidden md:table-cell">
                                            {exp.date}
                                        </td>
                                        <td className="py-4 pr-4 align-top">
                                            <span className="font-medium text-sm">{exp.role}</span>
                                            {/* Mobile-only info */}
                                            <div className="md:hidden mt-1 space-y-1">
                                                <span className="text-gray-400 font-mono text-xs block">{exp.date}</span>
                                                <span className="text-gray-500 text-sm block">{exp.company}</span>
                                                <span className="text-gray-500 font-light text-sm block">{exp.description}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 pr-4 text-sm text-gray-500 align-top hidden md:table-cell">
                                            {exp.company}
                                        </td>
                                        <td className="py-4 text-sm text-gray-500 font-light align-top hidden md:table-cell">
                                            {exp.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-black/5 mt-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                        {/* Left: Identity */}
                        <div className="text-center md:text-left">
                            <div className="font-bold tracking-tight text-lg mb-1">YIFENG LIU</div>
                            <div className="font-mono text-xs text-gray-500 uppercase">Cambridge, MA</div>
                        </div>

                        {/* Center: Map Widget */}
                        <div className="flex justify-center order-last md:order-none mt-4 md:mt-0">
                             <MapWidget />
                        </div>

                        {/* Right: Socials & Copyright */}
                        <div className="flex flex-col items-center md:items-end gap-4">
                            <div className="flex gap-6">
                                <a href={`mailto:${PROFILE.email}`} className="text-sm text-gray-500 hover:text-black transition-colors">Email</a>
                                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-black transition-colors">GitHub</a>
                                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-black transition-colors">LinkedIn</a>
                            </div>
                            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                                © {new Date().getFullYear()} All Rights Reserved
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'project'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNavigation = (target: string) => {
      if (target === 'top') {
          setView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          setView('home');
          setTimeout(() => {
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 50);
      }
  };

  const handleProjectSelect = (project: Project) => {
      setSelectedProject(project);
      setView('project');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-gray-200 selection:text-black">
      <Navbar onNavigate={handleNavigation} />

      <main className="animate-in fade-in duration-500">
        {view === 'home' && (
            <HomeView onProjectSelect={handleProjectSelect} />
        )}
        {view === 'project' && selectedProject && (
            <ProjectDetailView project={selectedProject} onBack={() => handleNavigation('research')} />
        )}
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;
