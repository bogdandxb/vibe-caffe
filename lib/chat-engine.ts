import { menuItems, cafeaInfo, recomandari, categorii } from './knowledge-base';

export function getResponse(message: string): string {
  const msg = message.toLowerCase().trim();

  // Salut
  if (/^(bun[ăa]|salut|hei|hello|hi|bun[ăa] ziua|bun[ăa] diminea[tț]a|bun[ăa] seara)/.test(msg)) {
    return 'Bună! 👋 Mă bucur că ești aici! Sunt barista tău virtual la Vibe Caffè. Te pot ajuta cu meniul, programul, rezervările sau orice altceva. Cu ce pot să te ajut azi?';
  }

  // Mulțumesc
  if (/(mul[tț]umesc|mersi|thanks|thank you)/.test(msg)) {
    return 'Cu mare drag! ☕ Dacă mai ai întrebări, sunt aici. Pe curând la o cafea!';
  }

  // Program
  if (/(program|orar|ore|când|deschis|închis|deschide[tț]i|închi[ds])/.test(msg)) {
    return `⏰ Suntem deschiși ${cafeaInfo.program}. Suficient timp pentru mai multe cafele! 😄 Te așteptăm!`;
  }

  // Locație / adresă
  if (/(loca[tț]ie|adres[ăa]|unde|strad[ăa]|cum ajung|hart[ăa])/.test(msg)) {
    return `📍 Ne găsești la ${cafeaInfo.locatie}! E ușor de găsit. Suntem deschiși zilnic 08:00–22:00, deci ai tot timpul să ajungi. 😊`;
  }

  // WiFi
  if (/(wifi|wi-fi|internet|parola wifi)/.test(msg)) {
    return '📶 Bineînțeles, avem WiFi gratuit! Parola ți-o dăm la comandă — lucrezi sau te relaxezi, ești binevenit să stai cât vrei. ☕';
  }

  // Pet-friendly
  if (/(pet|animal|câine|pisic[ăa]|c[âa][iî]ni|animale)/.test(msg)) {
    return '🐾 Da, cu drag! Suntem pet-friendly — prietenii tăi blănoși sunt bineveniti la Vibe Caffè. Poate îi luăm și lor un biscuite? 😄';
  }

  // Facilități generale
  if (/(facilit[ăa][tț]i|priz[ăa]|muz[ăi]c[ăa]|live|ce ave[tț]i)/.test(msg)) {
    return `✨ La noi te simți ca acasă! Ai: ${cafeaInfo.facilitati.join(', ')}. Ce-ți mai trebuie? 😊`;
  }

  // Rezervări
  if (/(rezerv[aă]|rezervare|mas[ăa]|loc|booking)/.test(msg)) {
    return `📅 Super că vrei să ne vizitezi! ${cafeaInfo.rezervari} E simplu — completezi numele, email-ul, telefonul, câte persoane sunteți și când vrei să vii. Gata, masa e a ta! 🎉`;
  }

  // Recomandare / cel mai popular
  if (/(recomand|popular|cel mai bun|best|favorit|specialitate|ce iau|ce comand)/.test(msg)) {
    const p = recomandari.celMaiPopular;
    return `Hmm, depinde de starea ta! ☕ Dacă vrei ceva clasic și care nu dă greș niciodată, mergi pe **${p.nume}** (${p.pret} RON) — ${p.descriere}. Dacă vrei ceva mai special, încearcă **Cold Drip Latte** (22 RON) — extract la rece cu lapte de ovăz, e absolut delicios! Îl încerci?`;
  }

  // Cel mai ieftin
  if (/(ieftin|mic pre[tț]|accesibil|buget|redus)/.test(msg)) {
    const p = recomandari.celMaiIeftin;
    return `💰 Dacă vrei ceva accesibil, **${p.nume}** e la doar ${p.pret} RON — ${p.descriere}. Simplu, bun și la preț prietenos! 😊`;
  }

  // Cel mai scump / premium
  if (/(scump|premium|special|exclusiv|de lux)/.test(msg)) {
    const p = recomandari.celMaiScump;
    return `👑 Vrei să te răsfați? **${p.nume}** la ${p.pret} RON este alegerea premium — ${p.descriere}. Merită fiecare leu! ✨`;
  }

  // Vegan
  if (/(vegan|plant[- ]based|f[aă]r[aă] lapte|vegetal|lactoz[aă])/.test(msg)) {
    const vegane = recomandari.optiuniVegane;
    return `🌱 Da, avem destule opțiuni vegane! ${vegane.map(i => `**${i.nume}** (${i.pret} RON)`).join(', ')}. Vrei să îți recomand ceva anume din lista asta?`;
  }

  // Meniu general
  if (/(meniu|men[iî]u|ce ave[tț]i|produse|list[aă]|categorii|ce servi[tț]i)/.test(msg)) {
    return `☕ Meniul nostru are 4 categorii grozave:\n${categorii.map(c => `${c.emoji} **${c.nume}**`).join('\n')}\n\nÎntreabă-mă despre oricare și îți spun produsele și prețurile! 😊`;
  }

  // Espresso
  if (/(espresso|americano|cappuccino|flat white|latte(?! macchiato))/.test(msg)) {
    const produse = menuItems.filter(i => i.categorie === 'Espresso');
    return `☕ Iată cafelele noastre clasice:\n${produse.map(p => `• **${p.nume}** — ${p.pret} RON: ${p.descriere}`).join('\n')}\n\nTe tentează vreuna? 😊`;
  }

  // Specialty
  if (/(specialty|specialitate|cortado|ristretto|pour over|cold drip|matcha|chai)/.test(msg)) {
    const produse = menuItems.filter(i => i.categorie === 'Specialty');
    return `✨ Preparatele noastre speciale — pentru cei cu gust rafinat:\n${produse.map(p => `• **${p.nume}** — ${p.pret} RON: ${p.descriere}`).join('\n')}\n\nCare îți sună mai bine?`;
  }

  // Cold Brew
  if (/(cold brew|iced|frapp[eé]|gheata|rece|r[aă]coritor)/.test(msg)) {
    const produse = menuItems.filter(i => i.categorie === 'Cold Brew');
    return `🧊 Perfect pentru o zi caldă! Opțiunile noastre reci:\n${produse.map(p => `• **${p.nume}** — ${p.pret} RON: ${p.descriere}`).join('\n')}\n\nCare te răcorește mai bine? 😄`;
  }

  // Patiserie
  if (/(patiserie|croissant|pain au chocolat|tart[aă]|cheesecake|brownie|dulce|mâncare|food|produ[sd])/.test(msg)) {
    const produse = menuItems.filter(i => i.categorie === 'Patiserie');
    return `🥐 Ahh, patiseria noastră e o răsfățare! Uite ce avem:\n${produse.map(p => `• **${p.nume}** — ${p.pret} RON: ${p.descriere}`).join('\n')}\n\nMerg perfect cu orice cafea! ☕`;
  }

  // Preț specific — caută produs după nume
  const produsCautat = menuItems.find(item =>
    msg.includes(item.nume.toLowerCase()) ||
    item.nume.toLowerCase().split(' ').some(word => word.length > 3 && msg.includes(word))
  );
  if (produsCautat) {
    return `${produsCautat.vegan ? '🌱' : '☕'} **${produsCautat.nume}** e la ${produsCautat.pret} RON — ${produsCautat.descriere}.${produsCautat.vegan ? ' Și e opțiune vegană, bonus! 🌿' : ' O alegere bună! 😊'}`;
  }

  // Prețuri generale
  if (/(pre[tț]|cost|c[âa]t cost[aă]|tarif|ron|lei)/.test(msg)) {
    return `💳 Prețurile noastre sunt destul de prietenoase — pornesc de la ${recomandari.celMaiIeftin.pret} RON (${recomandari.celMaiIeftin.nume}) și ajung la ${recomandari.celMaiScump.pret} RON (${recomandari.celMaiScump.nume}). Întreabă-mă despre orice produs specific! 😊`;
  }

  // Fallback
  return `Hmm, nu prea am înțeles, îmi pare rău! 😅 Poți întreba despre:\n• **Meniu** (espresso, specialty, cold brew, patiserie)\n• **Program** și **locație**\n• **Rezervări**\n• **Facilități** (WiFi, pet-friendly)\n• **Recomandări** (cel mai popular, vegan, etc.)`;
}
