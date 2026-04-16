'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

type QuickReply = { label: string; message: string };

const INITIAL_QUICK_REPLIES: QuickReply[] = [
  { label: '☕ Vezi meniu', message: 'Ce produse aveți în meniu?' },
  { label: '⭐ Recomandări', message: 'Ce îmi recomandați?' },
  { label: '📅 Rezervări', message: 'Cum fac o rezervare?' },
  { label: '🕐 Program', message: 'Care este programul cafenelei?' },
];

const CONTEXTUAL_QUICK_REPLIES: { keywords: string[]; replies: QuickReply[] }[] = [
  {
    keywords: ['meniu', 'produs', 'cafea', 'espresso', 'cappuccino', 'latte', 'cold brew', 'patiserie', 'specialty'],
    replies: [
      { label: '🌱 Opțiuni vegane', message: 'Ce opțiuni vegane aveți?' },
      { label: '🥐 Deserturi', message: 'Ce deserturi aveți?' },
      { label: '🧊 Cafea rece', message: 'Ce băuturi reci aveți?' },
    ],
  },
  {
    keywords: ['rezervare', 'rezerv', 'masa', 'loc', 'booking'],
    replies: [
      { label: '📝 Fă o rezervare', message: 'Vreau să fac o rezervare' },
      { label: '🕐 Program', message: 'Care este programul cafenelei?' },
    ],
  },
];

const WELCOME_MESSAGE: Message = {
  id: 0,
  text: 'Bună! 👋 Mă bucur că ești aici! Sunt barista tău virtual la Vibe Caffè. Te pot ajuta cu meniul, programul, rezervările sau orice altceva. Cu ce pot să te ajut azi?',
  sender: 'bot',
};

function getContextualReplies(text: string): QuickReply[] | null {
  const lower = text.toLowerCase();
  for (const ctx of CONTEXTUAL_QUICK_REPLIES) {
    if (ctx.keywords.some(kw => lower.includes(kw))) {
      return ctx.replies;
    }
  }
  return null;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quickReplies, setQuickReplies] = useState<QuickReply[]>(INITIAL_QUICK_REPLIES);
  const [userTyped, setUserTyped] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<{ role: 'user' | 'assistant'; content: string }[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  async function sendMessage(text: string, fromQuickReply = false) {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Butoanele dispar după ce userul scrie un mesaj propriu
    if (!fromQuickReply) {
      setUserTyped(true);
      setQuickReplies([]);
    }

    const userMsg: Message = { id: Date.now(), text: trimmed, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    historyRef.current.push({ role: 'user', content: trimmed });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyRef.current.slice(-7, -1),
        }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      let botText: string = data.reply ?? 'Ups, ceva nu a mers. Încearcă din nou.';

      // Dacă avem date de rezervare, le trimitem la API
      if (data.reservation) {
        try {
          const rezRes = await fetch('/api/rezervari', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data.reservation),
          });
          if (rezRes.ok) {
            botText = botText || `Rezervarea ta a fost confirmată! ✅\n\n📅 **${data.reservation.data}** la **${data.reservation.ora}**\n👥 **${data.reservation.persoane} persoane**\n\nTe așteptăm la Vibe Caffè! ☕`;
          } else {
            botText = 'Am colectat datele, dar a apărut o eroare la salvare. Te rog încearcă din nou sau folosește [formularul de rezervare](/#rezervari).';
          }
        } catch {
          botText = 'Am colectat datele, dar a apărut o eroare. Te rog folosește [formularul de rezervare](/#rezervari).';
        }
      }

      historyRef.current.push({ role: 'assistant', content: botText });
      const botMsg: Message = { id: Date.now() + 1, text: botText, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);

      // Setează butoane contextuale bazate pe răspunsul botului
      if (!userTyped || fromQuickReply) {
        const contextual = getContextualReplies(botText) ?? getContextualReplies(trimmed);
        if (contextual) {
          setQuickReplies(contextual);
        } else {
          setQuickReplies([]);
        }
      }
    } catch {
      const botMsg: Message = { id: Date.now() + 1, text: 'Ups, ceva nu a mers. Încearcă din nou.', sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setQuickReplies([]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input, false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    if (e.target.value.trim() && !userTyped) {
      setQuickReplies([]);
    }
  }

  function renderText(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const href = linkMatch[2];
        const isAnchor = href.startsWith('/#');
        return (
          <a
            key={i}
            href={href}
            onClick={isAnchor ? (e) => {
              e.preventDefault();
              const id = href.replace('/#', '');
              const el = document.getElementById(id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
              }
            } : undefined}
            className="underline font-semibold text-teal-300 hover:text-teal-200 transition-colors cursor-pointer"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return part.split('\n').map((line, j, arr) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ));
    });
  }

  return (
    <>
      {/* Fereastra de chat */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-50 md:w-96 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gray-950 md:rounded-2xl border border-teal-900/40 overflow-hidden shadow-2xl shadow-teal-900/20 flex flex-col h-full md:h-[540px]">

            {/* Header */}
            <div className="bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-xl shrink-0">☕</div>
                <div>
                  <p className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>Barista Vibe Caffè</p>
                  <p className="text-teal-100 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block"></span>
                    Online acum
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
                aria-label="Închide chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mesaje */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-teal-500 text-white rounded-br-sm'
                        : 'bg-gray-800 text-gray-100 rounded-bl-sm'
                    }`}
                  >
                    {renderText(msg.text)}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {quickReplies.length > 0 && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {quickReplies.map(qr => (
                  <button
                    key={qr.label}
                    onClick={() => sendMessage(qr.message, true)}
                    className="text-xs px-3 py-1.5 rounded-full border border-teal-700 text-teal-400 hover:bg-teal-700 hover:text-white transition-all duration-200"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2 flex gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input, false); } }}
                placeholder="Scrie un mesaj..."
                className="flex-1 bg-gray-800 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm border border-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="bg-teal-600 hover:bg-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Buton floating */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={isOpen ? 'Închide chat' : 'Deschide chat'}
        className={`fixed bottom-4 right-4 md:right-6 z-50 w-14 h-14 rounded-full bg-teal-600 hover:bg-teal-500 text-white shadow-lg hover:shadow-teal-600/40 transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          !isOpen ? 'animate-pulse-slow' : ''
        }`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl">☕</span>
        )}
      </button>
    </>
  );
}
