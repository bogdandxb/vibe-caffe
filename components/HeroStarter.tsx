'use client';

/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: offset, behavior: 'smooth' });
}

export default function HeroStarter() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* VIDEO FUNDAL */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-coffee.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY SEMI-TRANSPARENT */}
      <div className="absolute inset-0 bg-black/50" />

      {/* SCROLL INDICATOR */}
      <a
        href="#features"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/75 hover:text-yellow-700 transition-colors animate-bounce hero-fade-in"
        style={{ animationDelay: '1.5s' }}
        aria-label="Scroll mai jos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-shadow-hero hero-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          Unde afacerile prind gust
        </h1>

        {/* SUBTITLU */}
        <p
          className="text-lg md:text-2xl lg:text-3xl mb-8 text-white/90 text-shadow-subtitle hero-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          Cafea fină pentru conversații importante
        </p>

        {/* BUTOANE CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center hero-fade-in"
          style={{ animationDelay: '1.1s' }}
        >
          {/* Buton 1 - Primary */}
          <button
            onClick={() => scrollToSection('menu')}
            className="px-6 py-3 bg-yellow-700 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl text-sm"
          >
            Vezi Meniul
          </button>

          {/* Buton 2 - Secondary */}
          <a
            href="#contact"
            className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white/10 text-sm"
          >
            Vizitează-ne
          </a>
        </div>
      </div>
    </section>
  );
}

