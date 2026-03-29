'use client';

import { useState, useEffect, useCallback } from 'react';

type Status = 'toate' | 'in asteptare' | 'confirmat' | 'respins';

interface Rezervare {
  id: number;
  nume: string;
  email: string;
  telefon: string;
  persoane: number;
  data_ora: string;
  status: string;
  created_at: string;
}

const STATUS_COLORS: Record<string, string> = {
  'in asteptare': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
  'confirmat':    'bg-green-500/20 text-green-300 border-green-500/40',
  'respins':      'bg-red-500/20 text-red-300 border-red-500/40',
};

function formatData(iso: string) {
  return new Date(iso).toLocaleString('ro-RO', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminPage() {
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtruStatus, setFiltruStatus] = useState<Status>('toate');
  const [cautare, setCautare] = useState('');
  const [actiune, setActiune] = useState<number | null>(null);

  const fetchRezervari = useCallback(async () => {
    setLoading(true);
    const res = await fetch('/api/rezervari');
    const data = await res.json();
    setRezervari(data.rezervari || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchRezervari(); }, [fetchRezervari]);

  const schimbaStatus = async (id: number, status: string) => {
    setActiune(id);
    await fetch('/api/rezervari', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await fetchRezervari();
    setActiune(null);
  };

  const sterge = async (id: number) => {
    if (!confirm('Ești sigur că vrei să ștergi această rezervare?')) return;
    setActiune(id);
    await fetch(`/api/rezervari?id=${id}`, { method: 'DELETE' });
    await fetchRezervari();
    setActiune(null);
  };

  const filtrate = rezervari.filter(r => {
    const potrivireStatus = filtruStatus === 'toate' || r.status === filtruStatus;
    const potrivireCautare = r.nume.toLowerCase().includes(cautare.toLowerCase());
    return potrivireStatus && potrivireCautare;
  });

  const numarareStatus = (s: string) => rezervari.filter(r => r.status === s).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-950 to-gray-950 py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-2">Panou administrare</p>
          <h1 className="text-4xl font-bold text-white mb-1">Rezervări <span className="text-yellow-600">Vibe Caffè</span></h1>
          <p className="text-white/50">{rezervari.length} rezervări totale</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'În așteptare', status: 'in asteptare', color: 'border-yellow-500/40 text-yellow-400' },
            { label: 'Confirmate', status: 'confirmat', color: 'border-green-500/40 text-green-400' },
            { label: 'Respinse', status: 'respins', color: 'border-red-500/40 text-red-400' },
          ].map(s => (
            <div key={s.status} className={`backdrop-blur-md bg-white/5 border ${s.color} rounded-2xl p-4 text-center`}>
              <p className={`text-3xl font-bold ${s.color.split(' ')[1]}`}>{numarareStatus(s.status)}</p>
              <p className="text-white/50 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* FILTRE + CAUTARE */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Caută după nume..."
            value={cautare}
            onChange={e => setCautare(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-all"
          />
          <div className="flex gap-2 flex-wrap">
            {(['toate', 'in asteptare', 'confirmat', 'respins'] as Status[]).map(s => (
              <button key={s} onClick={() => setFiltruStatus(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                  filtruStatus === s ? 'bg-teal-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}>
                {s === 'toate' ? `Toate (${rezervari.length})` : s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white/50 py-20">Se încarcă...</div>
        ) : filtrate.length === 0 ? (
          <div className="text-center text-white/50 py-20">Nicio rezervare găsită.</div>
        ) : (
          <>
            {/* TABEL DESKTOP */}
            <div className="hidden md:block backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="text-left px-6 py-4">Nume</th>
                    <th className="text-left px-6 py-4">Contact</th>
                    <th className="text-left px-6 py-4">Data & Ora</th>
                    <th className="text-left px-6 py-4">Persoane</th>
                    <th className="text-left px-6 py-4">Status</th>
                    <th className="text-left px-6 py-4">Actiuni</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrate.map((r, i) => (
                    <tr key={r.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                      <td className="px-6 py-4">
                        <p className="text-white font-semibold">{r.nume}</p>
                        <p className="text-white/40 text-xs mt-0.5">{formatData(r.created_at)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white/80 text-sm">{r.email}</p>
                        <p className="text-white/50 text-xs">{r.telefon}</p>
                      </td>
                      <td className="px-6 py-4 text-white/80 text-sm">{formatData(r.data_ora)}</td>
                      <td className="px-6 py-4 text-white/80 text-sm">{r.persoane} pers.</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {r.status !== 'confirmat' && (
                            <button disabled={actiune === r.id} onClick={() => schimbaStatus(r.id, 'confirmat')}
                              className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/40 text-green-300 text-xs font-medium rounded-lg transition-all disabled:opacity-50">
                              ✓ Confirmă
                            </button>
                          )}
                          {r.status !== 'respins' && (
                            <button disabled={actiune === r.id} onClick={() => schimbaStatus(r.id, 'respins')}
                              className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs font-medium rounded-lg transition-all disabled:opacity-50">
                              ✕ Respinge
                            </button>
                          )}
                          <button disabled={actiune === r.id} onClick={() => sterge(r.id)}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/60 text-xs font-medium rounded-lg transition-all disabled:opacity-50">
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CARDURI MOBILE */}
            <div className="md:hidden space-y-4">
              {filtrate.map(r => (
                <div key={r.id} className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-bold text-lg">{r.nume}</p>
                      <p className="text-white/50 text-xs">{formatData(r.created_at)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[r.status]}`}>
                      {r.status}
                    </span>
                  </div>
                  <div className="space-y-1 mb-4 text-sm text-white/70">
                    <p>📧 {r.email}</p>
                    <p>📞 {r.telefon}</p>
                    <p>📅 {formatData(r.data_ora)}</p>
                    <p>👥 {r.persoane} persoane</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {r.status !== 'confirmat' && (
                      <button disabled={actiune === r.id} onClick={() => schimbaStatus(r.id, 'confirmat')}
                        className="flex-1 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-300 text-sm font-medium rounded-xl transition-all disabled:opacity-50">
                        ✓ Confirmă
                      </button>
                    )}
                    {r.status !== 'respins' && (
                      <button disabled={actiune === r.id} onClick={() => schimbaStatus(r.id, 'respins')}
                        className="flex-1 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 text-sm font-medium rounded-xl transition-all disabled:opacity-50">
                        ✕ Respinge
                      </button>
                    )}
                    <button disabled={actiune === r.id} onClick={() => sterge(r.id)}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white/60 text-sm rounded-xl transition-all disabled:opacity-50">
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </main>
  );
}
