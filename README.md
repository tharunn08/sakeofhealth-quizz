# Sake of Health — Wellness Quest

A standalone, QR-friendly wellness quiz for Sake of Health. This is a **front-end-only static website** built with HTML, CSS and vanilla JavaScript. It does not use Python, a backend, a database, analytics, accounts, or personal-data collection.

## Features

- Official Sake of Health logo asset and website favicon.
- Four short wellness questions with plain-language explanations.
- One-question-at-a-time flow with progress indicator.
- Answer selection, answer locking and duplicate-scoring prevention.
- Correct-answer celebration overlay with a 3D flip-in effect and confetti.
- Encouraging incorrect-answer feedback and explanations.
- Results dashboard with score, correct/incorrect count, accuracy, time taken and best streak.
- Review of every answer and explanation.
- Replay and share-result controls.
- Responsive design, keyboard focus indicators and reduced-motion support.
- No backend, database, API key, or installation required for the game itself.

## Preview locally

You can open `index.html` directly in a modern browser.

For a local HTTP preview, install Node.js and run this command from the project folder:

```bash
npx --yes serve .
```

Open the local URL printed in the terminal. No Python is used by this project.

## Deploy to Vercel

1. Push the contents of this project folder to a **new GitHub repository**. Keep it separate from the live Sake of Health repository until approved.
2. In Vercel, import that new repository.
3. Choose **Other** / no framework preset if prompted.
4. Leave the build command empty and the output directory as the project root (`.`).
5. Deploy and open the generated HTTPS URL on a phone.
6. Test the complete quiz before creating the QR code.
7. Generate a QR code that points to the exact final HTTPS URL.

The QR code must not point to `localhost`. Customers need a public URL that can be reached from their phones.

## Deploy to GitHub Pages

1. Push this folder's contents to a new repository.
2. In GitHub, open **Settings → Pages**.
3. Choose deployment from the `main` branch and the root folder.
4. Save and wait for the public URL.
5. Test that URL on a phone before generating the QR code.

## Brand assets

- `assets/logo-mark.png` — logo mark copied from the supplied Sake of Health project.
- `assets/logo-mark.svg` — vector logo mark copied from the supplied project.
- `assets/favicon.png` — favicon copied from the supplied site's favicon asset.

The header combines the official logo mark with the brand name and the “Premium Gummy Supplements” tagline, following the main website's existing logo lockup.

## Production / integration notes

- The main-site link points to `https://sakeofhealth.in/`.
- A suggested route such as `/wellness-quest/` is not automatically created by this project. Configure it on a test deployment only after approval.
- For standalone hosting, deploy this folder to a separate Vercel project, subdirectory, or subdomain. Do not overwrite the main website.
- For integration into the existing Node.js/Express storefront, review route handling and static asset paths first. Keep CSS and JavaScript isolated and do not paste these styles into global stylesheets without review.
- The quiz is client-side only. Do not use it for prize competitions or high-stakes scoring without server-side validation and appropriate rules.
- Quiz content is general education, not medical advice. Verify future product-specific claims against approved brand content.

## Edit the questions

Open `app.js` and update the `QUESTIONS` array near the top. Each question contains `category`, `icon`, `question`, `hint`, `answers` (four strings), `correct` (zero-based answer index), and `explanation`.

If changing the question count, also review the achievement categories and the visible question-count labels in `index.html` and `app.js`.

## Test checklist

- [ ] Start from the welcome screen.
- [ ] Verify the official logo and favicon appear.
- [ ] Choose each answer and verify correct/incorrect feedback.
- [ ] Confirm correct answers trigger the flip-in celebration and confetti.
- [ ] Confirm incorrect answers show the correct answer and explanation.
- [ ] Finish with 0, 1, 2, 3, and 4 correct answers and verify dashboard counts.
- [ ] Verify answer review cards.
- [ ] Replay and ensure the score resets.
- [ ] Test narrow mobile, tablet, and desktop widths.
- [ ] Test keyboard focus and reduced-motion settings.
- [ ] Test the deployed URL and QR code on a phone.

## Files

- `index.html` — screens, metadata, logo and favicon references.
- `styles.css` — visual design, responsive layout and animations.
- `app.js` — question data, game state, scoring, feedback and dashboard.
- `assets/` — actual Sake of Health logo and favicon assets.
- `README.md` — setup and deployment guidance.
