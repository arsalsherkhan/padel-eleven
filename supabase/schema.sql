create table player_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  full_name text not null,
  whatsapp text not null,
  city text not null,
  play_frequency text not null,
  booking_methods text[] not null,
  used_playtomic boolean not null,
  finding_players text not null,
  matchmaking_interest int not null check (matchmaking_interest between 1 and 5),
  premium_willingness text not null,
  open_feedback text
);

create table court_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  court_name text not null,
  contact_name text not null,
  whatsapp text not null,
  city text not null,
  court_count text not null,
  booking_methods text[] not null,
  unfilled_rate text not null,
  commission_acceptance text not null,
  featured_interest text not null,
  open_feedback text
);
