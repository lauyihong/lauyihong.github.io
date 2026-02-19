
import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (target: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Research', target: 'research' },
    { name: 'Blog', target: 'blog' },
  ];

  const handleNavClick = (target: string) => {
    onNavigate(target);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-40 top-0 bg-white/90 backdrop-blur-sm border-b border-black/5">
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <button 
          onClick={() => handleNavClick('top')}
          className="text-sm font-bold tracking-tight font-mono uppercase flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          YIFENG LIU
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <button 
                key={link.name} 
                onClick={() => handleNavClick(link.target)}
                className="text-xs font-mono uppercase tracking-widest hover:text-gray-500 transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-black/10 p-6 flex flex-col gap-4 shadow-sm">
            {navLinks.map((link) => (
            <button 
                key={link.name} 
                onClick={() => handleNavClick(link.target)}
                className="text-sm font-mono uppercase pb-2 flex justify-between items-center text-left"
            >
              {link.name}
              <ArrowRight className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;