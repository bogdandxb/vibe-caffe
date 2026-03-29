'use client';

import { useState } from 'react';

// --- Utilitare date ---
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
const LUNI = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];
const ZILE = ['Du','Lu','Ma','Mi','Jo','Vi','Sâ'];

function genOre() {
  const ore: string[] = [];
  for (let h = 10; h <= 22; h++) {
    ore.push(`${String(h).padStart(2,'0')}:00`);
    if (h < 22) ore.push(`${String(h).padStart(2,'0')}:30`);
  }
  return ore;
}

export default function RezervariForm() {
  const azi = new Date();
  const [pas, setPas] = useState(1);
  const [calendarAn, setCalendarAn] = useState(azi.getFullYear());
  const [calendarLuna, setCalendarLuna] = useState(azi.getMonth());
  const [dataSel, setDataSel] = useState<Date | null>(null);
  const [oraSel, setOraSel] = useState('');
  const [form, setForm] = useState({ nume: '', email: '', telefon: '', persoane: 2 });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [eroare, setEroare] = useState('');

  // --- Navigare calendar ---
  const lunaPrev = () => {
    if (calendarLuna === 0) { setCalendarLuna(11); setCalendarAn(y => y - 1); }
    else setCalendarLuna(l => l - 1);
  };
  const lunaNext = () => {
    const maxLuna = new Date(azi.getFullYear(), azi.getMonth() + 6, 0);
    const next = new Date(calendarAn, calendarLuna + 1, 1);
    if (next <= maxLuna) {
      if (calendarLuna === 11) { setCalendarLuna(0); setCalendarAn(y => y + 1); }
      else setCalendarLuna(l => l + 1);
    }
  };

  // --- Zile rapide (urmatoarele 14) ---
  const zileRapide = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(azi);
    d.setDate(azi.getDate() + i + 1);
    return d;
  });

  // --- Zilele din luna curenta ---
  const totalZile = getDaysInMonth(calendarAn, calendarLuna);
  const primaZi = getFirstDayOfMonth(calendarAn, calendarLuna);
  const eDataTrecuta = (d: Date) => d < new Date(azi.getFullYear(), azi.getMonth(), azi.getDate());
  const eMaxData = (d: Date) => d > new Date(azi.getFullYear(), azi.getMonth() + 6, azi.getDate());

  // --- Submit ---
  const handleSubmit = async () => {
    if (!dataSel || !oraSel || !form.nume || !form.email || !form.telefon) return;
    setStatus('loading');
    const [h, m] = oraSel.split(':');
    const data_ora = new Date(dataSel.getFullYear(), dataSel.getMonth(), dataSel.getDate(), +h, +m).toISOString();
    const res = await fetch('/api/rezervari', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, data_ora }),
    });
    const data = await res.json();
    if (res.ok) { setStatus('success'); }
    else { setStatus('error'); setEroare(data.error || 'Eroare. Încearcă din nou.'); }
  };

  const resetForm = () => {
    setPas(1); setDataSel(null); setOraSel('');
    setForm({ nume: '', email: '', telefon: '', persoane: 2 });
    setStatus('idle'); setEroare('');
  };

  // --- SUCCESS ---
  if (status === 'success') {
    return (
      <section id="rezervari" className="py-20 px-6 bg-gradient-to-br from-teal-950 to-gray-950">
        <div className="max-w-lg mx-auto text-center">
          <div className="backdrop-blur-md bg-white/10 border border-teal-500/30 rounded-3xl p-10 shadow-2xl">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-white mb-3">Rezervare confirmată!</h2>
            <p className="text-white/70 mb-2">
              {dataSel?.toLocaleDateString('ro-RO', { weekday:'long', day:'numeric', month:'long' })} la {oraSel}
            </p>
            <p className="text-white/60 text-sm mb-8">Te vom contacta în scurt timp la {form.email}</p>
            <button onClick={resetForm}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-all hover:scale-105">
              Rezervare nouă
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rezervari" className="py-20 px-6 bg-gradient-to-br from-teal-950 to-gray-950">
      <div className="max-w-2xl mx-auto">

        {/* TITLU */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-3">Rezervă o masă</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Asigură-ți <span className="text-yellow-600">locul</span>
          </h2>
          <p className="text-white/60">Completează cei 3 pași simpli de mai jos</p>
        </div>

        {/* STEPPER */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1,2,3].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                pas === i ? 'bg-teal-500 text-white scale-110' :
                pas > i ? 'bg-yellow-600 text-white' : 'bg-white/10 text-white/40'
              }`}>{pas > i ? '✓' : i}</div>
              {i < 3 && <div className={`w-12 h-0.5 ${pas > i ? 'bg-yellow-600' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-16 text-xs text-white/50 mb-10">
          <span className={pas >= 1 ? 'text-teal-400' : ''}>Data</span>
          <span className={pas >= 2 ? 'text-teal-400' : ''}>Ora</span>
          <span className={pas >= 3 ? 'text-teal-400' : ''}>Detalii</span>
        </div>

        {/* CARD */}
        <div className="backdrop-blur-md bg-white/10 border border-teal-500/20 rounded-3xl p-6 md:p-10 shadow-2xl">

          {/* PAS 1 - DATA */}
          {pas === 1 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-6 text-center">Alege data</h3>

              {/* Zile rapide */}
              <div className="mb-6">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-3">Următoarele 14 zile</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {zileRapide.map((d, i) => {
                    const sel = dataSel?.toDateString() === d.toDateString();
                    return (
                      <button key={i} onClick={() => setDataSel(d)}
                        className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          sel ? 'bg-teal-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}>
                        <span>{ZILE[d.getDay()]}</span>
                        <span className="text-lg font-bold">{d.getDate()}</span>
                        <span>{LUNI[d.getMonth()].slice(0,3)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={lunaPrev} className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">‹</button>
                  <span className="text-white font-semibold">{LUNI[calendarLuna]} {calendarAn}</span>
                  <button onClick={lunaNext} className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">›</button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {ZILE.map(z => <div key={z} className="text-center text-white/40 text-xs py-1">{z}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: primaZi }).map((_, i) => <div key={i} />)}
                  {Array.from({ length: totalZile }, (_, i) => {
                    const d = new Date(calendarAn, calendarLuna, i + 1);
                    const trecut = eDataTrecuta(d);
                    const maxim = eMaxData(d);
                    const sel = dataSel?.toDateString() === d.toDateString();
                    return (
                      <button key={i}
                        disabled={trecut || maxim}
                        onClick={() => setDataSel(d)}
                        className={`aspect-square rounded-xl text-sm font-medium transition-all ${
                          sel ? 'bg-teal-500 text-white scale-110' :
                          trecut || maxim ? 'text-white/20 cursor-not-allowed' :
                          'text-white/80 hover:bg-white/20'
                        }`}>
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button disabled={!dataSel} onClick={() => setPas(2)}
                className="w-full mt-8 py-4 bg-teal-600 hover:bg-teal-500 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-xl transition-all hover:scale-[1.02]">
                Continuă →
              </button>
            </div>
          )}

          {/* PAS 2 - ORA */}
          {pas === 2 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Alege ora</h3>
              <p className="text-white/50 text-sm text-center mb-6">
                {dataSel?.toLocaleDateString('ro-RO', { weekday:'long', day:'numeric', month:'long' })}
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {genOre().map(ora => (
                  <button key={ora} onClick={() => setOraSel(ora)}
                    className={`py-3 rounded-xl text-sm font-medium transition-all ${
                      oraSel === ora ? 'bg-teal-500 text-white scale-105' : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}>
                    {ora}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setPas(1)} className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all">
                  ← Înapoi
                </button>
                <button disabled={!oraSel} onClick={() => setPas(3)}
                  className="flex-1 py-4 bg-teal-600 hover:bg-teal-500 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-xl transition-all hover:scale-[1.02]">
                  Continuă →
                </button>
              </div>
            </div>
          )}

          {/* PAS 3 - DETALII */}
          {pas === 3 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Detaliile tale</h3>
              <p className="text-white/50 text-sm text-center mb-6">
                {dataSel?.toLocaleDateString('ro-RO', { weekday:'long', day:'numeric', month:'long' })} la {oraSel}
              </p>
              <div className="space-y-4">
                <input type="text" placeholder="Nume complet *" value={form.nume}
                  onChange={e => setForm({...form, nume: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-all" />
                <input type="email" placeholder="Email *" value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-all" />
                <input type="tel" placeholder="Telefon *" value={form.telefon}
                  onChange={e => setForm({...form, telefon: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-all" />
                <div>
                  <label className="text-white/60 text-sm mb-2 block">Număr persoane: <span className="text-teal-400 font-bold">{form.persoane}</span></label>
                  <input type="range" min={1} max={12} value={form.persoane}
                    onChange={e => setForm({...form, persoane: +e.target.value})}
                    className="w-full accent-teal-500" />
                  <div className="flex justify-between text-white/30 text-xs mt-1"><span>1</span><span>12</span></div>
                </div>
              </div>
              {status === 'error' && (
                <div className="mt-4 bg-red-500/20 border border-red-500/40 rounded-xl px-4 py-3 text-red-300 text-sm">{eroare}</div>
              )}
              <div className="flex gap-3 mt-8">
                <button onClick={() => setPas(2)} className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all">
                  ← Înapoi
                </button>
                <button
                  disabled={status === 'loading' || !form.nume || !form.email || !form.telefon}
                  onClick={handleSubmit}
                  className="flex-1 py-4 bg-yellow-700 hover:bg-yellow-600 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold rounded-xl transition-all hover:scale-[1.02]">
                  {status === 'loading' ? '⏳ Se trimite...' : 'Rezervă acum'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
