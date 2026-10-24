-- Run this script in Supabase Dashboard > SQL Editor.
-- Public visitors can INSERT completed registrations only. They cannot SELECT, UPDATE or DELETE records.
create table if not exists public.quiz_participants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mobile text not null,
  email text,
  address text,
  result_type text not null,
  coupon_code text not null default 'SOH-BUYNOW10',
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.quiz_participants enable row level security;
revoke all on table public.quiz_participants from anon, authenticated;
grant usage on schema public to anon;
grant insert on table public.quiz_participants to anon;

drop policy if exists "Allow completed quiz registration" on public.quiz_participants;
create policy "Allow completed quiz registration"
on public.quiz_participants
for insert
to anon
with check (
  consent = true
  and length(trim(name)) between 2 and 100
  and length(trim(mobile)) between 8 and 20
  and result_type in ('The Zing', 'The Mellow', 'The Sunny')
  and coupon_code = 'SOH-BUYNOW10'
);
