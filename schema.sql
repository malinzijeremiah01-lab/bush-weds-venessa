-- Run this once in Supabase: Dashboard > SQL Editor > New query.
create table if not exists public.wedding_rsvps (
  id bigint generated always as identity primary key,
  full_name text not null,
  email text not null unique,
  phone text,
  attendance text not null check (attendance in ('Attending', 'Not attending', 'Not sure yet')),
  created_at timestamptz not null default now()
);

alter table public.wedding_rsvps enable row level security;

-- Guests can submit an RSVP. Public visitors cannot read the guest list.
create policy "Anyone can submit an RSVP"
on public.wedding_rsvps
for insert
to anon
with check (
  char_length(trim(full_name)) between 1 and 120
  and char_length(trim(email)) between 3 and 254
  and attendance in ('Attending', 'Not attending', 'Not sure yet')
);
