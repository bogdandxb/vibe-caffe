/**
 * 📖 ABOUT STARTER - Povestea Vibe Caffè
 *
 * Layout: imagine stanga + text dreapta (desktop)
 * Mobile: stivuit vertical
 */

export default function AboutStarter() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* IMAGINE */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&auto=format&fit=crop&q=80"
              alt="Interiorul Vibe Caffè"
              className="w-full h-full object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="text-sm font-semibold text-yellow-700 uppercase tracking-widest mb-4">
              Povestea noastră
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Mai mult decât o cafea.<br />
              <span className="text-yellow-700">O tradiție.</span>
            </h2>

            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              <p>
                Vibe Caffè s-a născut dintr-o pasiune autentică pentru cafeaua de excepție și dorința de a crea un spațiu unde eleganța întâlnește confortul. De la prima ceașcă servită, ne-am dedicat unui singur ideal: să oferim o experiență memorabilă fiecărui oaspete.
              </p>
              <p>
                Cu o tradiție construită în timp, am selecționat cei mai buni baristași certificați și am ales exclusiv boabe de origine unică, prăjite artizanal în mici loturi. Fiecare detaliu — de la temperatura apei până la textura spumei — este îngrijit cu precizie și respect față de meșteșugul nostru.
              </p>
              <p>
                Astăzi, Vibe Caffè este locul preferat al oamenilor care apreciază calitatea, discreția și atmosfera rafinată. Un loc unde întâlnirile importante devin amintiri plăcute, iar o simplă pauză de cafea devine un moment de eleganță.
              </p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-100">
              <div>
                <p className="text-3xl font-bold text-yellow-700">8+</p>
                <p className="text-sm text-gray-500 mt-1">Ani de tradiție</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-700">12k+</p>
                <p className="text-sm text-gray-500 mt-1">Clienți fideli</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-yellow-700">30+</p>
                <p className="text-sm text-gray-500 mt-1">Preparate unice</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
