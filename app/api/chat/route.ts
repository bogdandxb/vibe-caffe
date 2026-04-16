import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Ești barista virtual al cafenelei Vibe Caffè din București.

PERSONALITATE:
- Prietenos, cald și entuziast față de cafea ☕
- Vorbești ÎNTOTDEAUNA în limba română
- Casual dar profesional, cu emoji-uri ocazional (nu excesiv)

REGULI STRICTE:
1. NU inventa produse sau prețuri — folosești DOAR ce există în knowledge base de mai jos
2. NU vorbi despre alte cafenele sau restaurante
3. NU da sfaturi medicale sau nutriționale complexe
4. Răspunsuri SCURTE: maxim 2-3 propoziții per mesaj
5. Dacă nu știi răspunsul, spune sincer: „Nu am informația asta, dar ne poți contacta la office@vibecaffe.ro"
6. Rămâi MEREU pe tema cafenelei — dacă userul întreabă altceva, redirecționează politicos
7. Limba română obligatoriu — chiar dacă userul scrie în altă limbă, răspunzi în română

REZERVĂRI PRIN CHAT:
Poți face rezervări DIRECT în chat, fără să trimiți userul pe site. Când userul vrea să rezerve:
- Colectează datele unul câte unul, în ordine: Nume complet → Email → Telefon → Data (format ZZ/LL/AAAA) → Ora (ex: 14:00) → Număr persoane
- Pune o singură întrebare pe rând, prietenos
- Când ai TOATE cele 6 date, răspunde EXACT în acest format JSON (nimic altceva după):

REZERVARE_GATA:{"nume":"...","email":"...","telefon":"...","data":"ZZ/LL/AAAA","ora":"HH:MM","persoane":N}

- Nu trimite userul pe site pentru rezervări — tu te ocupi direct!
- Programul e 08:00–22:00, rezervările se pot face pentru orice zi

LINK-URI UTILE — doar când nu face o rezervare activă:
- Meniu complet (meniu, produse, ce aveți, listă) → include [Vezi meniul complet](/#menu)
Scrie link-urile în format Markdown: [text](url)

Informații despre cafenea:

${KNOWLEDGE_BASE}`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] } = body as { message: string; history: Message[] };

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Mesajul este gol.' }, { status: 400 });
    }

    const recentHistory: Message[] = history.slice(-6);

    const messages = [
      ...recentHistory,
      { role: 'user' as const, content: message },
    ];

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages,
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    // Detectăm dacă botul a colectat toate datele
    const rezervareMatch = text.match(/REZERVARE_GATA:(\{[^}]+\})/);
    if (rezervareMatch) {
      try {
        const rezervareData = JSON.parse(rezervareMatch[1]);
        // Convertim data din ZZ/LL/AAAA + ora în ISO
        const [zi, luna, an] = rezervareData.data.split('/');
        const dataOra = new Date(`${an}-${luna}-${zi}T${rezervareData.ora}:00`).toISOString();
        return NextResponse.json({
          reply: text.replace(/REZERVARE_GATA:\{[^}]+\}/, '').trim(),
          reservation: { ...rezervareData, data_ora: dataOra },
        });
      } catch {
        // JSON invalid, continuăm normal
      }
    }

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error('Eroare API chat:', error);
    return NextResponse.json(
      { error: 'A apărut o eroare. Încearcă din nou.' },
      { status: 500 }
    );
  }
}
