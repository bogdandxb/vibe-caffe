'use client';

import { useState, useEffect } from 'react';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: offset, behavior: 'smooth' });
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-950/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-3 group">
          {/* Icon SVG - ceasca de cafea */}
          <div className="w-9 h-9 flex items-center justify-center">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
              {/* Abur */}
              <path d="M13 8 Q14 5 13 3" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M20 8 Q21 5 20 3" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M27 8 Q28 5 27 3" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Ceasca */}
              <path d="M8 12 H32 L29 28 H11 Z" fill="#14B8A6"/>
              {/* Interior ceasca */}
              <path d="M10 14 H30 L27.5 26 H12.5 Z" fill="#0D9488"/>
              {/* Toarta */}
              <path d="M32 15 Q38 15 38 20 Q38 25 32 25" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              {/* Farfuriuta */}
              <ellipse cx="20" cy="31" rx="14" ry="2.5" fill="#14B8A6"/>
              <ellipse cx="20" cy="31" rx="10" ry="1.5" fill="#0D9488"/>
              {/* Highlight cafea */}
              <ellipse cx="19" cy="20" rx="6" ry="3" fill="#7C3F1A" opacity="0.6"/>
            </svg>
          </div>

          {/* Text logo */}
          <div className="leading-none">
            <span className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
              Vibe{' '}
              <span className="text-yellow-600">Caffè</span>
            </span>
          </div>
        </a>

        {/* LINKS navigare */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Meniu', id: 'menu' },
            { label: 'Despre', id: 'about' },
            { label: 'Rezervări', id: 'rezervari' },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-white/80 hover:text-teal-400 font-medium transition-colors text-sm"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('rezervari')}
            className="px-5 py-2 bg-yellow-700 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 text-sm"
          >
            Rezervă acum
          </button>
        </div>

        {/* MOBILE - buton rezervare */}
        <button
          onClick={() => scrollToSection('rezervari')}
          className="md:hidden px-4 py-2 bg-yellow-700 hover:bg-yellow-600 text-white font-semibold rounded-lg text-sm transition-all"
        >
          Rezervă
        </button>

      </div>
    </nav>
  );
}
