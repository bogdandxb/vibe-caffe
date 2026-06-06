-- Vibe Caffè — Schema Supabase
-- Rulează acest fișier în SQL Editor din Supabase pentru a recrea baza de date

-- Tabel: rezervari
CREATE TABLE IF NOT EXISTS public.rezervari (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nume          TEXT NOT NULL,
  email         TEXT NOT NULL,
  telefon       TEXT NOT NULL,
  persoane      INTEGER NOT NULL DEFAULT 2,
  data_ora      TIMESTAMP WITH TIME ZONE NOT NULL,
  status        TEXT NOT NULL DEFAULT 'in asteptare' CHECK (status IN ('in asteptare', 'confirmata', 'anulata')),
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE public.rezervari ENABLE ROW LEVEL SECURITY;

-- Politica: oricine poate insera o rezervare (formular public)
CREATE POLICY "Insert public" ON public.rezervari
  FOR INSERT WITH CHECK (true);

-- Politica: doar service role poate citi/actualiza/sterge (admin panel)
CREATE POLICY "Read service role only" ON public.rezervari
  FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Update service role only" ON public.rezervari
  FOR UPDATE USING (auth.role() = 'service_role');

CREATE POLICY "Delete service role only" ON public.rezervari
  FOR DELETE USING (auth.role() = 'service_role');
