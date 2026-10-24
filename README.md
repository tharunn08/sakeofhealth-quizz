# Sake of Health — How Much Do You Know About You?

A QR-friendly, frontend-only self-discovery game for Sake of Health, built with HTML, CSS and vanilla JavaScript. Supabase is used as a hosted database; there is no custom backend.

## Updated flow
1. Visitors enter their name and mobile number; email and address are optional. They must agree to the data storage notice to continue.
2. They answer five personality questions. There is no per-question “Check answer” step—choose an option and click Next question.
3. The existing gummy personality result interface appears, with coupon code **SOH-BUYNOW10** and a copy button.
4. Once all questions are completed, the registration details and result are saved to Supabase.

## Supabase setup
Follow `SUPABASE-SETUP.md` and run `supabase-setup.sql` in Supabase SQL Editor. Then replace the placeholders in `supabase-config.js` with your Supabase Project URL and public publishable/anon key. Never put a service-role or secret key in frontend code.

The public database policy permits inserts only and blocks public reads, updates, and deletes. The game holds details in browser memory until completion; abandoned sessions are not saved. This is not OTP-verified mobile login.

## Preview and deployment
- Open `index.html` directly for a quick local preview (Supabase saving works best when served over HTTP/HTTPS).
- For local HTTP preview, run `npx --yes serve .` from this folder.
- For Vercel or GitHub Pages, deploy the project root as a static site; no build command is required.
- Test the live HTTPS URL on a phone before generating a QR code. Keep this project separate from the main Sake of Health storefront unless integration is explicitly approved.

## Files
- `index.html` — screens, registration form, result and coupon UI.
- `styles.css` — styling and responsive layout.
- `app.js` — questions, game flow, personality results and Supabase insert.
- `supabase-config.js` — public Supabase URL/key placeholders.
- `supabase-setup.sql` — database table and row-level security policy.
- `SUPABASE-SETUP.md` — step-by-step setup instructions.
- `assets/` — Sake of Health logo and favicon assets.
