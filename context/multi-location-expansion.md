# Multi-Location Expansion Implementation Plan

This document outlines the technical strategy for restructuring the Picktopia website to support multiple club locations (Scarborough, Richmond Hill, and future sites) with dedicated sub-pages for bookings, schedules, and training.

## 1. URL Architecture & Routing
We will transition from "flat" global routes to "nested" location-aware routes.

### Route Mapping
| Feature | Legacy Route | New Multi-Location Route |
|---------|--------------|-------------------------|
| Club Details | `/clubs` | `/clubs/:location` |
| Court Booking | `/play/booking` | `/clubs/:location/booking` |
| Program Schedule | `/play/program-schedule` | `/clubs/:location/schedule` |
| Training Programs | `/academy/training-programs` | `/clubs/:location/training` |

### Implementation (Navigation Utility)
- Update `src/utils/navigation.js` to parse `:location` parameters from the URL.
- Implement a fallback where if no `:location` is provided, it defaults to Scarborough (for SEO and legacy support).

## 2. Page & Component Refactoring
Pages must become "context-aware" by accepting a `locationId`.

### State Management (`src/App.jsx`)
- The `App` component will extract the `locationId` from the URL.
- It will pass this ID as a prop to child pages:
  ```jsx
  <BookingPage locationId={currentLocation} />
  ```

### Location-Specific Content Fetching
- **BookingPage:** Loads the specific CourtReserve URL associated with the `locationId` from the CMS.
- **ProgramSchedulePage:** Fetches the schedule JSON/Markdown for the specific club.
- **TrainingProgramsPage:** Displays coaching staff and programs available at that specific site.

## 3. CMS Schema Enhancements
Modify `public/admin/config.yml` to allow the CMS to manage the relationship between locations and their sub-features.

### New Collection Structure
- **Locations Collection:**
  - `court_reserve_id`: String (The ID for CourtReserve integration)
  - `has_lounge`: Boolean
  - `booking_link`: String
  - `schedule_file`: Reference to schedule content
  - `training_staff`: List of references to coaches assigned to this location

## 4. User Experience (UX) Enhancements
- **Clubs Gateway:** The main `/clubs` page will act as a "Location Picker" with clear call-to-action buttons for each site.
- **Header Persistence:** If a user selects Richmond Hill, the "Play" and "Academy" dropdowns should ideally point to Richmond Hill routes while they are in that section.
- **Location Selector:** Add a small "Change Location" toggle in the header or footer when the user is on a location-specific page.

## 5. Strategic Additions ("What Else?")
Beyond the technical restructuring, we will implement these features to enhance the multi-location experience:

### Inter-Club Comparison
- Enhance the `LocationCard` component to display a "Quick Specs" list (e.g., Court count, Lounge availability, Pro Shop status).
- This allows users to compare locations directly on the `/clubs` page without clicking through each one.

### Location-Specific FAQs
- Richmond Hill may have different parking or access rules (e.g., "Where do I park for Richmond Hill?").
- Implement a location-aware FAQ section that pulls specific questions based on the selected `locationId`.

### Cross-Promotion System
- Add a "Featured Location" banner system. 
- Example: When viewing Scarborough pages, show a small promotional banner: *"Visit our brand new Richmond Hill location - Now Open!"*

### SEO Optimization
- Dynamically update page `<title>` and `meta` tags based on location.
- "Pickleball Court Booking in Scarborough" vs "Pickleball Court Booking in Richmond Hill".

## 6. Migration Steps
1. **Phase 1 (Routing):** Update `navigation.js` and `App.jsx` to support the new URL structure.
2. **Phase 2 (Content):** Migrate static data from `src/data/` to the CMS to allow independent management of Richmond Hill vs. Scarborough.
3. **Phase 3 (UI):** Update `LocationCard` and the "Clubs" page to include direct links to `/booking`, `/schedule`, and `/training`.
4. **Phase 4 (Strategy):** Implement the Comparison, FAQ, and SEO enhancements.
