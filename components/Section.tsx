import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = '' }) => {
  return (
    <section id={id} className={`py-20 border-b border-black/5 ${className}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
                <h2 className="text-xs font-mono uppercase tracking-widest sticky top-32 text-gray-500">{title}</h2>
            </div>
            <div className="md:col-span-9">
                {children}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
