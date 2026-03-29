-- Tabel rezervari Vibe Caffè
CREATE TABLE rezervari (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nume        TEXT NOT NULL,
  email       TEXT NOT NULL,
  telefon     TEXT NOT NULL,
  persoane    INT NOT NULL DEFAULT 2,
  data_ora    TIMESTAMPTZ NOT NULL,
  status      TEXT NOT NULL DEFAULT 'in asteptare',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: oricine poate adauga, citi, modifica, sterge
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert" ON rezervari FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "public_select" ON rezervari FOR SELECT TO anon USING (true);
CREATE POLICY "public_update" ON rezervari FOR UPDATE TO anon USING (true);
CREATE POLICY "public_delete" ON rezervari FOR DELETE TO anon USING (true);