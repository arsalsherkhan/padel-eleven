# Padel Eleven Landing Page

Pakistan's first padel matchmaking and court booking app.

## Technology Stack
- Next.js 14 (App Router)
- Tailwind CSS (raw CSS variables for the color system)
- Supabase (Backend, Postgres Database)

## Setup Steps
1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (see below).
4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables
Create a file named `.env.local` in the root of your project by copying the example file:
```bash
cp .env.local.example .env.local
```

You need two keys from your Supabase project (Project Settings > API):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Supabase Schema
Before running the application, make sure your Supabase project has the required tables.

1. Go to your Supabase project dashboard.
2. Navigate to the **SQL Editor**.
3. Copy the contents of `supabase/schema.sql` and paste it into a new query.
4. Click **Run** to generate the `player_signups` and `court_signups` tables.
