/**
 * 🎯 FEATURES STARTER - Sectiunea De ce Vibe Caffè?
 *
 * Layout Bento Grid:
 * - 1 card mare stanga (Cafea de Specialitate)
 * - 2 carduri mici stivuite dreapta (Patiserie + Ambient)
 * Imagini sus (40%) + text jos (60%)
 * Hover: scale imagine + shadow card
 * Animatii fade-in staggered la scroll
 */

const cards = [
  {
    title: 'Cafea de Specialitate',
    description:
      'Boabe de origine unică, prăjite artizanal în mici loturi. Fiecare ceașcă preparată de baristași certificați pentru un extract perfect.',
    tag: 'Origine unică · Prăjire artizanală',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Patiserie Artizanală',
    description:
      'Produse pregătite zilnic cu ingrediente naturale, fără conservanți. Croissante și tarte care completează perfect cafeaua ta.',
    tag: 'Făcut zilnic · Ingrediente naturale',
    image:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&auto=format&fit=crop&q=80',
  },
  {
    title: 'Ambient Relaxant',
    description:
      'Spațiu gândit pentru conversații importante. WiFi rapid, prize la fiecare masă, atmosferă discretă pentru întâlniri de afaceri.',
    tag: 'WiFi · Spațiu de lucru',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
  },
];

export default function FeaturesStarter() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* TITLU SECTIUNE */}
        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            De ce <span className="text-yellow-700">Vibe Caffè</span>?
          </h2>
          <p className="text-lg text-gray-600">
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD MARE - STANGA */}
          <div
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
                       transition-all duration-300 hover:shadow-xl
                       opacity-0 animate-[fadeInUp_0.7s_ease-out_0.1s_forwards]"
          >
            {/* Imagine 40% */}
            <div className="h-[40%] min-h-[220px] overflow-hidden">
              <img
                src={cards[0].image}
                alt={cards[0].title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            {/* Text 60% */}
            <div className="p-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{cards[0].title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{cards[0].description}</p>
              <span className="text-sm font-semibold text-yellow-700 uppercase tracking-wider">
                {cards[0].tag}
              </span>
            </div>
          </div>

          {/* COLOANA DREAPTA */}
          <div className="flex flex-col gap-6">

            {/* CARD MIC - SUS */}
            <div
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1
                         transition-all duration-300 hover:shadow-xl
                         opacity-0 animate-[fadeInUp_0.7s_ease-out_0.3s_forwards]"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={cards[1].image}
                  alt={cards[1].title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{cards[1].title}</h3>
                <p className="text-gray-600 leading-relaxed">{cards[1].description}</p>
              </div>
            </div>

            {/* CARD MIC - JOS */}
            <div
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-1
                         transition-all duration-300 hover:shadow-xl
                         opacity-0 animate-[fadeInUp_0.7s_ease-out_0.5s_forwards]"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={cards[2].image}
                  alt={cards[2].title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{cards[2].title}</h3>
                <p className="text-gray-600 leading-relaxed">{cards[2].description}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
