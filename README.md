# Bush Weds Venessa — Simple Wedding RSVP

A small, mobile-friendly wedding attendance form. Guests enter their name, email, optional phone number, and attendance response. Submissions are saved in a free Supabase database.

## What you need
- A free Supabase account: https://supabase.com/
- A free Vercel account (optional, for publishing): https://vercel.com/
- Node.js installed on your computer: https://nodejs.org/

## 1. Create the free database
1. Sign in to Supabase and create a new project.
2. Open **SQL Editor** in the Supabase dashboard.
3. Open `supabase/schema.sql` from this project, copy all its contents into the SQL Editor, and click **Run**.
4. Open **Project Settings → API** (or **Data API** depending on the dashboard).
5. Copy the Project URL and the public `anon` key. Do not use or share the `service_role` key.

## 2. Connect the website
1. In this project folder, make a copy of `.env.example` and name the copy `.env`.
2. Put your Supabase Project URL after `VITE_SUPABASE_URL=`.
3. Put your public anon key after `VITE_SUPABASE_ANON_KEY=`.
4. Save the file.

## 3. Run it on your computer
Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

Open the local address Vite prints (usually http://localhost:5173).

## 4. Publish it free with Vercel
1. Upload this project to a GitHub repository.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. In Vercel project settings, add these Environment Variables:
   - `VITE_SUPABASE_URL` = your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Deploy. Vercel will detect Vite automatically. Your live RSVP link can then be shared with guests.

## View registrations
In Supabase, open **Table Editor → wedding_rsvps**. You can see and export the registered guests from there.

## Important
- Supabase is the database; Vercel is the website hosting service. Both have free plans, subject to their current usage limits and terms.
- The public form can add registrations but cannot read the guest list. Keep the guest list private in Supabase.
- This starter version does not include an admin dashboard, Google Drive sync, QR codes, or Excel automation because you asked for a simple registration form.
- The form uses email as a unique value, so one email address can register only once.
- Before sharing widely, test a submission and confirm it appears in the Supabase table.
