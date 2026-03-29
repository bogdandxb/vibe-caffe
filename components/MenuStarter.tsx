'use client';

/**
 * 🍽️ MENU STARTER - Sectiunea Meniul Nostru
 *
 * Tab-uri categorii: Espresso, Specialty, Cold Brew, Patiserie
 * Grid 3 coloane desktop / 1 coloana mobile
 * Card: imagine 4:3 + nume + pret + descriere
 * Hover: scale(1.02) + shadow
 * Tranzitie smooth intre categorii (fade-in)
 */

import { useState } from 'react';

const menu = {
  Espresso: [
    { name: 'Espresso', price: 12, description: 'Shot dublu de espresso intens', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&auto=format&fit=crop&q=80' },
    { name: 'Americano', price: 14, description: 'Espresso diluat cu apă caldă', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&auto=format&fit=crop&q=80' },
    { name: 'Cappuccino', price: 16, description: 'Espresso cu lapte spumat', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop&q=80' },
    { name: 'Flat White', price: 17, description: 'Microfoam mătăsos peste espresso', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400&auto=format&fit=crop&q=80' },
    { name: 'Latte', price: 17, description: 'Espresso cu lapte abundent', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&auto=format&fit=crop&q=80' },
  ],
  Specialty: [
    { name: 'Cortado', price: 18, description: 'Espresso tăiat cu lapte cald în părți egale', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop&q=80' },
    { name: 'Ristretto', price: 14, description: 'Extract concentrat, mai scurt decât espresso', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&auto=format&fit=crop&q=80' },
    { name: 'Pour Over', price: 20, description: 'Cafea filtrată manual, aromă delicată', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80' },
    { name: 'Cold Drip Latte', price: 22, description: 'Extract la rece servit cu lapte de ovăz', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop&q=80' },
    { name: 'Matcha Latte', price: 19, description: 'Ceai matcha premium cu lapte spumat', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80' },
    { name: 'Chai Latte', price: 18, description: 'Amestec de condimente cu lapte cremos', image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&auto=format&fit=crop&q=80' },
  ],
  'Cold Brew': [
    { name: 'Cold Brew Classic', price: 18, description: 'Infuzat 18 ore la rece, fin și răcoritor', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop&q=80' },
    { name: 'Cold Brew Tonic', price: 20, description: 'Cold brew cu apă tonică și portocală', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&auto=format&fit=crop&q=80' },
    { name: 'Iced Latte', price: 17, description: 'Espresso dublu peste gheață cu lapte', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&auto=format&fit=crop&q=80' },
    { name: 'Iced Matcha', price: 19, description: 'Matcha shake cu lapte de cocos și gheață', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop&q=80' },
    { name: 'Frappé Caramel', price: 21, description: 'Cafea blended cu caramel și frișcă', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&auto=format&fit=crop&q=80' },
  ],
  Patiserie: [
    { name: 'Croissant Simplu', price: 9, description: 'Croissant franțuzesc cu unt, crocant și fraged', image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400&auto=format&fit=crop&q=80' },
    { name: 'Croissant Migdale', price: 12, description: 'Umplut cu cremă de migdale, pudrat cu zahăr', image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=400&auto=format&fit=crop&q=80' },
    { name: 'Pain au Chocolat', price: 13, description: 'Foietaj cu două batoane de ciocolată belgiană', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop&q=80' },
    { name: 'Tartă Fructe', price: 16, description: 'Blat de vanilie cu cremă și fructe proaspete', image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400&auto=format&fit=crop&q=80' },
    { name: 'Cheesecake NY', price: 18, description: 'Rețetă clasică New York cu coulis de fructe roșii', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop&q=80' },
    { name: 'Brownie Ciocolată', price: 14, description: 'Brownie dens cu ciocolată 70% și nuci pecan', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop&q=80' },
  ],
};

type Category = keyof typeof menu;
const categories = Object.keys(menu) as Category[];

export default function MenuStarter() {
  const [activeTab, setActiveTab] = useState<Category>('Espresso');
  const [visible, setVisible] = useState(true);

  const handleTabChange = (cat: Category) => {
    setVisible(false);
    setTimeout(() => {
      setActiveTab(cat);
      setVisible(true);
    }, 200);
  };

  return (
    <section id="menu" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* TITLU */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Meniul <span className="text-yellow-700">Nostru</span>
          </h2>
          <p className="text-lg text-gray-600">
            Preparate cu grijă, servite cu pasiune
          </p>
        </div>

        {/* TAB-URI CATEGORII */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-yellow-700 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PRODUSE */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {menu[activeTab].map((item) => (
            <div
              key={item.name}
              className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden
                         transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* IMAGINE 4:3 */}
              <div className="aspect-[4/3] overflow-hidden rounded-xl m-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              {/* TEXT */}
              <div className="px-5 pb-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                  <span className="text-yellow-700 font-bold text-lg whitespace-nowrap ml-4">
                    {item.price} RON
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
