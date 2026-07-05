-- Run this in Supabase: SQL Editor → New query → Run

create table if not exists public.invitation_responses (
  id uuid primary key default gen_random_uuid(),
  response_type text not null check (response_type in ('yes', 'official')),
  language text not null default 'en',
  selected_options jsonb,
  selected_labels jsonb,
  selected_time text,
  created_at timestamptz not null default now()
);

create index if not exists invitation_responses_created_at_idx
  on public.invitation_responses (created_at desc);

alter table public.invitation_responses enable row level security;

create policy "Allow anonymous insert"
  on public.invitation_responses
  for insert
  to anon
  with check (true);
