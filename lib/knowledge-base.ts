export const menuItems = [
  // ESPRESSO
  { categorie: 'Espresso', nume: 'Espresso', pret: 12, descriere: 'Shot dublu de espresso intens', vegan: true },
  { categorie: 'Espresso', nume: 'Americano', pret: 14, descriere: 'Espresso diluat cu apă caldă', vegan: true },
  { categorie: 'Espresso', nume: 'Cappuccino', pret: 16, descriere: 'Espresso cu lapte spumat', vegan: false },
  { categorie: 'Espresso', nume: 'Flat White', pret: 17, descriere: 'Microfoam mătăsos peste espresso', vegan: false },
  { categorie: 'Espresso', nume: 'Latte', pret: 17, descriere: 'Espresso cu lapte abundent', vegan: false },

  // SPECIALTY
  { categorie: 'Specialty', nume: 'Cortado', pret: 18, descriere: 'Espresso tăiat cu lapte cald în părți egale', vegan: false },
  { categorie: 'Specialty', nume: 'Ristretto', pret: 14, descriere: 'Extract concentrat, mai scurt decât espresso', vegan: true },
  { categorie: 'Specialty', nume: 'Pour Over', pret: 20, descriere: 'Cafea filtrată manual, aromă delicată', vegan: true },
  { categorie: 'Specialty', nume: 'Cold Drip Latte', pret: 22, descriere: 'Extract la rece servit cu lapte de ovăz', vegan: true },
  { categorie: 'Specialty', nume: 'Matcha Latte', pret: 19, descriere: 'Ceai matcha premium cu lapte spumat', vegan: false },
  { categorie: 'Specialty', nume: 'Chai Latte', pret: 18, descriere: 'Amestec de condimente cu lapte cremos', vegan: false },

  // COLD BREW
  { categorie: 'Cold Brew', nume: 'Cold Brew Classic', pret: 18, descriere: 'Infuzat 18 ore la rece, fin și răcoritor', vegan: true },
  { categorie: 'Cold Brew', nume: 'Cold Brew Tonic', pret: 20, descriere: 'Cold brew cu apă tonică și portocală', vegan: true },
  { categorie: 'Cold Brew', nume: 'Iced Latte', pret: 17, descriere: 'Espresso dublu peste gheață cu lapte', vegan: false },
  { categorie: 'Cold Brew', nume: 'Iced Matcha', pret: 19, descriere: 'Matcha shake cu lapte de cocos și gheață', vegan: true },
  { categorie: 'Cold Brew', nume: 'Frappé Caramel', pret: 21, descriere: 'Cafea blended cu caramel și frișcă', vegan: false },

  // PATISERIE
  { categorie: 'Patiserie', nume: 'Croissant Simplu', pret: 9, descriere: 'Croissant franțuzesc cu unt, crocant și fraged', vegan: false },
  { categorie: 'Patiserie', nume: 'Croissant Migdale', pret: 12, descriere: 'Umplut cu cremă de migdale, pudrat cu zahăr', vegan: false },
  { categorie: 'Patiserie', nume: 'Pain au Chocolat', pret: 13, descriere: 'Foietaj cu două batoane de ciocolată belgiană', vegan: false },
  { categorie: 'Patiserie', nume: 'Tartă Fructe', pret: 16, descriere: 'Blat de vanilie cu cremă și fructe proaspete', vegan: false },
  { categorie: 'Patiserie', nume: 'Cheesecake NY', pret: 18, descriere: 'Rețetă clasică New York cu coulis de fructe roșii', vegan: false },
  { categorie: 'Patiserie', nume: 'Brownie Ciocolată', pret: 14, descriere: 'Brownie dens cu ciocolată 70% și nuci pecan', vegan: false },
];

export const cafeaInfo = {
  program: 'Luni–Duminică: 08:00–22:00',
  locatie: 'Strada 13 Decembrie 129A, Brașov',
  facilitati: ['WiFi gratuit', 'Pet-friendly', 'Priză la fiecare masă', 'Muzică live vineri'],
  rezervari: 'Poți face rezervare direct pe site, în secțiunea Rezervări.',
};

export const recomandari = {
  celMaiPopular: menuItems.find(i => i.nume === 'Cappuccino')!,
  celMaiIeftin: menuItems.reduce((a, b) => a.pret < b.pret ? a : b),
  celMaiScump: menuItems.reduce((a, b) => a.pret > b.pret ? a : b),
  optiuniVegane: menuItems.filter(i => i.vegan),
};

export const categorii = [
  { nume: 'Espresso', emoji: '☕' },
  { nume: 'Specialty', emoji: '✨' },
  { nume: 'Cold Brew', emoji: '🧊' },
  { nume: 'Patiserie', emoji: '🥐' },
];

export const KNOWLEDGE_BASE = `
Vibe Caffè — Knowledge Base

PROGRAM: ${cafeaInfo.program}
LOCAȚIE: ${cafeaInfo.locatie}
FACILITĂȚI: ${cafeaInfo.facilitati.join(', ')}
REZERVĂRI: ${cafeaInfo.rezervari}

MENIU COMPLET:
${categorii.map(cat => {
  const produse = menuItems.filter(i => i.categorie === cat.nume);
  return `${cat.emoji} ${cat.nume.toUpperCase()}:\n${produse.map(p => `  - ${p.nume}: ${p.pret} RON — ${p.descriere}${p.vegan ? ' [VEGAN]' : ''}`).join('\n')}`;
}).join('\n\n')}

RECOMANDĂRI:
- Cel mai popular: ${recomandari.celMaiPopular.nume} (${recomandari.celMaiPopular.pret} RON)
- Cel mai ieftin: ${recomandari.celMaiIeftin.nume} (${recomandari.celMaiIeftin.pret} RON)
- Cel mai scump: ${recomandari.celMaiScump.nume} (${recomandari.celMaiScump.pret} RON)
- Opțiuni vegane: ${recomandari.optiuniVegane.map(i => i.nume).join(', ')}
`;
