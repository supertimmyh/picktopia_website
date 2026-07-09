# Picktopia Website

Responsive React/Vite website for Picktopia Pickleball Club. The site is structured for multiple club locations, with location-specific booking, schedules, training, and memberships managed through Decap CMS content.

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Shadcn/ui-style local UI components
- Lucide React icons
- Decap CMS for editable content
- Formspree for form submissions

## Development

```bash
npm install --legacy-peer-deps
npm run dev
npm run build
npm run deploy
```

Development server:

```text
http://localhost:5173
```

CMS admin:

```text
http://localhost:5173/admin/index.html
```

`--legacy-peer-deps` is used because of React and Decap CMS dependency conflicts.

## Current Navigation

The main nav is intentionally simple:

- Home
- Programs
- Play
- Events
- Clubs
- About

Important behavior:

- **Programs** is a cross-location program hub at `/programs`.
- **Play** is an informational page at `/play` that combines court booking guidance and group booking inquiry content.
- **Clubs** is the location hub at `/clubs`.
- Actual booking, schedules, training, and memberships are location-specific actions on club cards or club pages.

## Routing

This project does not use React Router. It uses state-based navigation in `src/App.jsx` with URL mapping helpers in `src/utils/navigation.js`.

Core routes:

| URL | Purpose |
| --- | --- |
| `/` | Home |
| `/programs` | Cross-location programs |
| `/play` | Court booking info + group booking info/form |
| `/events` | Events listing |
| `/events/:slug` | Event detail |
| `/clubs` | Location hub |
| `/clubs/:location` | Location detail |
| `/clubs/:location/booking` | Location-specific court booking |
| `/clubs/:location/schedule` | Location-specific program schedule |
| `/clubs/:location/training` | Location-specific training |
| `/clubs/:location/membership` | Location-specific memberships |

Legacy aliases such as `/join`, `/academy/training-programs`, `/play/booking`, and `/play/group-bookings` are routed to the newer location-first or combined pages.

## Multi-Location Model

Locations are CMS-managed markdown files in:

```text
public/content/locations/
```

Each location appears on `/clubs` and can expose its own subpages. Current location-aware behavior is driven by the location slug from the markdown filename.

Example:

```text
public/content/locations/scarborough.md
```

creates:

```text
/clubs/scarborough
/clubs/scarborough/booking
/clubs/scarborough/schedule
/clubs/scarborough/training
/clubs/scarborough/membership
```

Location cards are status-aware:

- `Now Open` locations can show booking, schedule, training, and membership actions.
- `Coming Soon` or `Under Development` locations show opening/details actions instead of unavailable booking CTAs.

## CMS Content

Decap CMS config lives in:

```text
public/admin/config.yml
```

CMS-managed collections include:

- Events
- Locations
- Announcements
- Memberships
- Promotions
- Generic Pages
- Settings

Content discovery uses manifest files:

```text
public/content/*/manifest.json
```

Generate manifests manually with:

```bash
npm run generate-manifests
```

`npm run build` also runs manifest generation before building.

## Adding a Location

Preferred workflow: use Decap CMS.

1. Open CMS.
2. Go to **Locations**.
3. Create a new location.
4. Fill in:
   - Name
   - City
   - Region
   - Status
   - Address
   - Phone
   - Email
   - Court count
   - Facility image
   - Booking URL / optional booking override
   - `hasMemberships` if the location has membership plans
   - Schedule embed fields if available
   - Lounge/pro shop flags
   - Training staff
   - Hours
   - Amenities
   - Description
   - Layout image
   - FAQs
5. Publish.
6. Manifest generation makes the location discoverable.

For local file edits, run:

```bash
npm run generate-manifests
```

Then commit the new markdown file and updated manifest.

## Location-Specific Memberships

Membership plans are CMS-managed in:

```text
public/content/memberships/
```

Membership pages are location-specific:

```text
/clubs/:location/membership
```

Each membership markdown file should include a `locationId` that matches a location slug.

Example:

```yaml
---
title: Community
locationId: scarborough
price: Free
duration: Lifetime
popular: false
features:
  - 5 Day Advanced Court Booking Privileges
signupLink: https://app.courtreserve.com/...
order: 3
---
```

Current membership content is Scarborough-specific and uses:

```yaml
locationId: scarborough
```

To show memberships for another location:

1. Set `hasMemberships: true` on that location.
2. Create membership markdown entries with that location slug in `locationId`.
3. Publish or regenerate manifests.

If one membership should appear at multiple locations, update the model before using blank fields. A future enhancement should add `locationIds` as a list, for example:

```yaml
locationIds:
  - scarborough
  - picktopia-richmond-hill
```

Do not leave `locationId` blank.

## Programs

The old **Academy** nav has been replaced by **Programs**.

Current Programs page:

```text
src/pages/FeaturedProgramsPage.jsx
src/data/featuredProgramsData.js
```

The page is a cross-location hub for offers such as:

- Pro-led clinics
- Free to play padel
- Seasonal or launch programs

Program cards route users into the relevant location context. Regular club schedules remain location-specific under:

```text
/clubs/:location/schedule
```

## Play Page

The old Play dropdown was removed.

The current Play page is:

```text
src/pages/PlayPage.jsx
```

It combines:

- court booking instructions
- a location-first booking path
- CourtReserve app link
- group booking packages
- group booking inclusions
- group booking inquiry form

Actual court booking happens from a selected location, not from the global Play page.

## Forms

Forms use Formspree via:

```text
src/config/formspree.js
```

Active forms:

| Component | Purpose |
| --- | --- |
| `IntroSignupForm` | Intro signup interest |
| `GroupBookingForm` | Group booking inquiries |
| `PartnershipInquiryForm` | Partnership inquiries |
| `GetNotified` | Updates/notifications |
| `Newsletter` | Newsletter subscription |

## Key Files

| File | Purpose |
| --- | --- |
| `src/App.jsx` | Main state-based routing |
| `src/utils/navigation.js` | URL/page-name mapping |
| `src/utils/contentLoader.js` | CMS content loading and frontmatter parsing |
| `src/utils/assetPath.js` | GitHub Pages/custom-domain asset paths |
| `src/pages/LocationsCMSPage.jsx` | `/clubs` location hub |
| `src/pages/LocationDetailPage.jsx` | `/clubs/:location` detail page |
| `src/pages/MembershipPage.jsx` | location-specific memberships |
| `src/pages/FeaturedProgramsPage.jsx` | `/programs` page |
| `src/pages/PlayPage.jsx` | combined Play info and group booking page |
| `public/admin/config.yml` | Decap CMS schema |
| `scripts/generate-manifests.js` | Manifest generation |

## Assets

Store public assets under:

```text
public/images/
```

Use category folders where practical:

```text
public/images/training/
public/images/group/
public/images/uploads/
```

Use `getAssetPath('/images/...')` or existing data asset processing helpers so paths work under GitHub Pages and custom domains.

## Build And Deployment

Production build:

```bash
npm run build
```

Deploy:

```bash
npm run deploy
```

Current deployment target:

```text
GitHub Pages
supertimmyh.github.io/picktopia_website
```

Vite production base path is configured for:

```text
/picktopia_website/
```

## Notes

- The codebase is still intentionally state-routed rather than React Router-based.
- Global CTAs should avoid hard-coding a single club.
- Booking, schedules, training, and memberships should be location-specific wherever possible.
- CMS-only content such as events, locations, announcements, memberships, and promotions should be edited through CMS unless a developer is intentionally changing local seed content.
