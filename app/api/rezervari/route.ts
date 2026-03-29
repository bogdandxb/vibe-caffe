import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rezervari: data }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nume, email, telefon, persoane, data_ora } = body;

  // Validare campuri obligatorii
  if (!nume || !email || !telefon || !data_ora) {
    return NextResponse.json(
      { error: 'Toate campurile sunt obligatorii.' },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('rezervari')
    .insert([{ nume, email, telefon, persoane: persoane ?? 2, data_ora }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, rezervare: data }, { status: 201 });
}
