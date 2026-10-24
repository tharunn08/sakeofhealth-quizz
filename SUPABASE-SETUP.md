# Supabase setup (no custom backend)

The game is still a static HTML/CSS/JavaScript website. Supabase stores the registration and final result directly from the browser. No server or API of your own is required.

## 1. Create the table
1. Open https://supabase.com/dashboard and create/open your project.
2. Open **SQL Editor** and run the contents of `supabase-setup.sql`.
3. Keep Row Level Security enabled. The policy permits anonymous INSERTs for completed game registrations only; it does not allow public reads, edits, or deletes.

## 2. Add the public project settings
1. In Supabase, open **Project Settings → API** (the exact menu may be called API Keys in the current dashboard).
2. Copy the **Project URL** and the public **publishable key** (or legacy `anon` key).
3. Open `supabase-config.js` and replace `https://YOUR_PROJECT_ID.supabase.co` and `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with those values.
4. Never use a `service_role` key or secret key in this frontend file.

## 3. Test
1. Open `index.html` through a local static server or deploy to HTTPS (Vercel/GitHub Pages).
2. Enter a name and mobile number, optionally enter email/address, and tick the consent checkbox.
3. Finish all five questions. The result screen displays `SOH-BUYNOW10`; the page will show whether Supabase saved the details.
4. In Supabase, open **Table Editor → quiz_participants** to see saved rows. Public visitors cannot read the table through the frontend.

## Important data behaviour
- Details stay in the current browser session until the visitor finishes all questions. A completed registration and result are saved together, so abandoned games are not saved.
- This is a registration form, not a verified login. Mobile ownership is not confirmed by OTP.
- Because the browser sends inserts directly to Supabase, a public static site cannot fully prevent spam submissions. The database policy limits columns/values and prevents public reads, but for stronger abuse prevention you would need a server-side function or CAPTCHA/rate limiting.
- Publish a privacy notice appropriate for your business and only collect details you have permission to store.
