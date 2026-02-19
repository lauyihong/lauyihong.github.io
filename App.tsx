import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowLeft, Clock, Tag } from 'lucide-react';
import Navbar from './components/Navbar';
import Section from './components/Section';
import ChatWidget from './components/ChatWidget';
import { PROFILE, PUBLICATIONS, TECHNICAL_PROJECTS, DESIGN_PROJECTS, BLOG_POSTS } from './data';
import { Project, BlogPost } from './types';

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
    // Configuration from your snippet:
    // cl=d1d1d1 (Border Color)
    // co=ffffff (Background Color)
    // cmo=939393 (Map Ocean Color?)
    // cmn=000000 (Map Node/Text Color?)
    script.src = 'https://mapmyvisitors.com/map.js?cl=d1d1d1&w=a&t=n&d=oeiR-cUnGjbVvYidl9tI42Db7SfqSDYwxx9M3-OxrCw&co=ffffff&cmo=939393&cmn=000000';
    
    containerRef.current.innerHTML = ''; // Clean up placeholder
    containerRef.current.appendChild(script);
  }, []);

  return (
    // grayscale class forces the widget to be black & white.
    // min-h-[100px] reserves space so layout doesn't jump when loading.
    <div 
        ref={containerRef} 
        className="flex justify-center items-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
        style={{ minHeight: '100px' }}
    />
  );
};

const ProjectCard: React.FC<{ project: Project; onClick: (p: Project) => void }> = ({ project, onClick }) => {
  return (
    <div 
      onClick={() => onClick(project)}
      className="group flex flex-col h-full bg-white border border-neutral-200 cursor-pointer hover:border-black transition-all duration-300 hover:shadow-sm"
    >
      {/* Image Section */}
      {project.image && (
        <div className="w-full aspect-[4/3] overflow-hidden border-b border-neutral-100 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-medium text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1 group-hover:translate-y-0 duration-300">
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <p className="text-gray-600 font-light text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-neutral-50 group-hover:border-neutral-100 transition-colors">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-gray-500 bg-gray-50 px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
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

const BlogDetailView: React.FC<{ post: BlogPost; onBack: () => void }> = ({ post, onBack }) => {
    return (
      <div className="pt-32 pb-20 px-6 md:px-12 animate-in fade-in duration-500">
        <div className="container mx-auto max-w-2xl">
          <button 
              onClick={onBack} 
              className="group flex items-center gap-3 text-xs font-mono uppercase tracking-widest hover:text-black transition-colors mb-16 text-gray-400"
          >
              <div className="p-2 border border-gray-200 rounded-full group-hover:border-black transition-colors">
                  <ArrowLeft className="w-3 h-3" /> 
              </div>
              Back to Writing
          </button>
  
          <div className="border-b border-black/10 pb-8 mb-12">
            <div className="flex items-center gap-4 mb-6">
               <span className="font-mono text-xs uppercase tracking-widest text-gray-500">{post.date}</span>
               <span className="w-px h-3 bg-gray-300"></span>
               <span className="font-mono text-xs uppercase tracking-widest text-gray-500">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-medium leading-tight text-black mb-6">
                {post.title}
            </h1>
          </div>
  
          <div className="prose prose-lg prose-neutral max-w-none leading-relaxed">
            {post.content ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
                <p className="text-gray-500 italic">Content coming soon...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

const HomeView: React.FC<{ 
    onProjectSelect: (p: Project) => void; 
    onBlogSelect: (b: BlogPost) => void 
}> = ({ onProjectSelect, onBlogSelect }) => {
    return (
        <>
             {/* Hero Section - Updated Alignment */}
            <div className="pt-32 pb-20 md:pt-48 md:pb-16">
                <div className="container mx-auto px-6 md:px-12 lg:px-24 border-b border-black/10 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        
                        {/* Title Row: Placed in the right column (cols 4-12) first */}
                        <div className="md:col-span-9 md:col-start-4 mb-2">
                            <div className="text-3xl md:text-4xl font-medium text-black leading-tight">
                                I'm Yifeng Liu.
                            </div>
                        </div>

                        {/* Avatar & Links: Left Column (cols 1-3) */}
                        {/* Since Grid auto-flows, we place this next, and it goes to the 'next available slot' which is row 2 col 1-3 */}
                        <div className="md:col-span-3 flex flex-col gap-6">
                            <div className="w-full max-w-[180px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                                <img 
                                    src={PROFILE.avatar} 
                                    alt={PROFILE.name}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            <div className="flex flex-row flex-wrap gap-4 items-center">
                                <a href={`mailto:${PROFILE.email}`} className="font-mono text-xs uppercase tracking-wider border-b border-black/20 hover:border-black pb-1">Email</a>
                                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-wider border-b border-black/20 hover:border-black pb-1">GitHub</a>
                                <a href={PROFILE.socials.scholar} target="_blank" rel="noreferrer" className="font-mono text-xs uppercase tracking-wider border-b border-black/20 hover:border-black pb-1">Scholar</a>
                            </div>
                        </div>

                        {/* Bio Text: Right Column (cols 4-12) */}
                        {/* This goes to row 2, col 4-12, aligning its top with the Avatar */}
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
            <Section id="research" title="Research">
                <div className="space-y-16">

                    {/* Technical Projects Table */}
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Technical Projects</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-black/10">
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-8 w-2/5">Title</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-8 w-1/4">Category</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 w-1/3">Collaborators</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TECHNICAL_PROJECTS.map((proj) => (
                                    <tr
                                        key={proj.id}
                                        onClick={() => onProjectSelect(proj)}
                                        className="group border-b border-black/5 cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 pr-8">
                                            <span className="font-medium group-hover:underline underline-offset-2 decoration-gray-400">{proj.title}</span>
                                        </td>
                                        <td className="py-4 pr-8 font-mono text-xs text-gray-500">
                                            {proj.tags.join(' · ')}
                                        </td>
                                        <td className="py-4 text-sm text-gray-500 font-light">
                                            {proj.collaborators?.join(', ') ?? '—'}
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
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-8 w-2/5">Title</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-8 w-1/4">Venue</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 w-1/3">Authors</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PUBLICATIONS.map((pub) => (
                                    <tr key={pub.id} className="group border-b border-black/5 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 pr-8">
                                            <span className="font-medium">{pub.title}</span>
                                        </td>
                                        <td className="py-4 pr-8 font-mono text-xs text-gray-500">
                                            {pub.venue} {pub.year}
                                        </td>
                                        <td className="py-4 text-sm font-light">
                                            {pub.authors.map((author, i) => (
                                                <span
                                                    key={i}
                                                    className={author.includes("Yifeng") || author.includes("Liu") ? "text-black font-medium" : "text-gray-500"}
                                                >
                                                    {author}{i < pub.authors.length - 1 ? ', ' : ''}
                                                </span>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Design & Building Projects Table */}
                    <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-6">Design & Building Projects</h3>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-black/10">
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-8 w-2/5">Title</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 pr-8 w-1/4">Category</th>
                                    <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gray-400 pb-3 w-1/3">Collaborators</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DESIGN_PROJECTS.map((proj) => (
                                    <tr
                                        key={proj.id}
                                        onClick={() => onProjectSelect(proj)}
                                        className="group border-b border-black/5 cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-4 pr-8">
                                            <span className="font-medium group-hover:underline underline-offset-2 decoration-gray-400">{proj.title}</span>
                                        </td>
                                        <td className="py-4 pr-8 font-mono text-xs text-gray-500">
                                            {proj.tags.join(' · ')}
                                        </td>
                                        <td className="py-4 text-sm text-gray-500 font-light">
                                            {proj.collaborators?.join(', ') ?? '—'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </Section>

            {/* Blog / Writing Section */}
            <Section id="blog" title="Writing">
                <div className="space-y-0">
                    {BLOG_POSTS.map((post) => (
                        <a key={post.id} href="#" className="group block py-6 border-b border-black/5 hover:bg-gray-50 transition-colors -mx-4 px-4">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                <div className="md:w-32 shrink-0 font-mono text-xs text-gray-400 group-hover:text-black transition-colors">
                                    {post.date}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4 decoration-1 decoration-gray-300">{post.title}</h3>
                                    <p className="text-gray-500 font-light max-w-2xl">{post.preview}</p>
                                </div>
                                <div className="md:w-24 text-right font-mono text-xs text-gray-300 group-hover:text-gray-500">
                                    {post.readTime}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </Section>

            {/* Footer - Grid Layout for Perfect Centering */}
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
                                <a href={PROFILE.socials.twitter} className="text-sm text-gray-500 hover:text-black transition-colors">Twitter</a>
                                <a href={PROFILE.socials.linkedin} className="text-sm text-gray-500 hover:text-black transition-colors">LinkedIn</a>
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
  const [view, setView] = useState<'home' | 'project' | 'blog'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const handleNavigation = (target: string) => {
      if (target === 'top') {
          setView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
          setView('home');
          // Small timeout to allow view to switch before scrolling to element
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

  const handleBlogSelect = (blog: BlogPost) => {
      setSelectedBlog(blog);
      setView('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-gray-200 selection:text-black">
      <Navbar onNavigate={handleNavigation} />
      
      <main className="animate-in fade-in duration-500">
        {view === 'home' && (
            <HomeView onProjectSelect={handleProjectSelect} onBlogSelect={handleBlogSelect} />
        )}
        {view === 'project' && selectedProject && (
            <ProjectDetailView project={selectedProject} onBack={() => handleNavigation('research')} />
        )}
        {view === 'blog' && selectedBlog && (
            <BlogDetailView post={selectedBlog} onBack={() => handleNavigation('blog')} />
        )}
      </main>

      <ChatWidget />
    </div>
  );
};

export default App;