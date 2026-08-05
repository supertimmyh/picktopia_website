# Future Tasks

This file tracks deferred work that future agents should remember when returning to the Picktopia website project.

## Pending

### 1. Migrate hosting to Cloudflare Pages or another cloud static host

- Current production hosting is GitHub Pages with custom domain `www.rallypicktopia.com`.
- The app now includes static-host SPA fallbacks:
  - `public/404.html` for GitHub Pages direct nested URLs.
  - `public/_redirects` for Cloudflare Pages/Netlify direct nested URLs.
- When migrating:
  - Configure build command: `npm install --legacy-peer-deps && npm run build`.
  - Configure publish directory: `dist`.
  - Move DNS/custom domain from GitHub Pages to the new host.
  - Disable or replace GitHub Pages deployment workflows after the new host is verified.
  - Recheck Decap CMS authentication for the production `/admin/` URL.

### 2. Replace temporary Richmond Hill membership signup flow with CourtReserve

- Current Richmond Hill paid membership signup uses a temporary Formspree deposit form:
  - `src/pages/MembershipSignupPage.jsx`
  - `src/config/membershipSignup.js`
  - `membershipSignup: 'mljrrzbv'` in `src/config/formspree.js`
- This temporary flow exists because Richmond Hill CourtReserve membership signup is not ready yet.
- When CourtReserve is ready:
  - Add the CourtReserve public membership signup URLs to the Richmond Hill membership markdown files in `public/content/memberships/`.
  - Remove or bypass the temporary internal signup route from membership cards.
  - Remove unused temporary signup page/config/Formspree entry if no longer needed.
  - Confirm all Richmond Hill `Sign Up Now` buttons open the correct CourtReserve public URLs.

### 3. Add CMS-managed tournaments page

- Existing detailed plan also exists in `context/tournament_context.txt`; keep this item updated if that file is removed or superseded.
- Goal: create a CMS-managed Tournaments page to display tournament details and prize pool information.
- CMS/content work:
  - Add a `tournaments` collection to `public/admin/config.yml`.
  - Store tournament markdown in `public/content/tournaments/`.
  - Suggested fields: `title`, `enabled`, `tournament_date`, `prize_pool`, `annual_pool_contribution`, `admin_fee`, `description`, `image`.
  - Add initial placeholder content such as `public/content/tournaments/inaugural-cash-tournament.md`.
- Automation work:
  - Add `public/content/tournaments/**` to `.github/workflows/update-manifests.yml`.
  - Add tournaments manifest generation to `scripts/generate-manifests.js`.
- Frontend work:
  - Add `src/pages/TournamentsPage.jsx`.
  - Add `src/components/TournamentCard.jsx`.
  - Load `/content/tournaments/manifest.json`, then load each tournament markdown with `loadContent`.
  - Filter or visually distinguish disabled tournaments based on the CMS `enabled` field.
- Navigation/routing work:
  - Add a `tournaments` route in `src/App.jsx`.
  - Add a navigation link in `src/data/data.js` or the current navigation source.
- Asset work:
  - Use `public/images/tournaments/` for tournament-specific assets.
