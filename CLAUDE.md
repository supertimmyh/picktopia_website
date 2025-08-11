# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
npm install --legacy-peer-deps  # Install dependencies (required due to React version conflicts with Decap CMS)
npm run dev                     # Start development server (localhost:5173)
npm run build                   # Build for production
npm run preview                 # Preview production build
npm run deploy                  # Deploy to GitHub Pages
```

### Dependencies Note
Always use `--legacy-peer-deps` when installing new packages due to React version conflicts with Decap CMS.

## Project Architecture

### Navigation System
The app uses a custom state-based navigation system in `src/App.jsx:14-18` with `useState('home')` rather than React Router. Navigation includes dropdown submenus for the Play section, with subpages for Booking, Program Schedule, Training Programs, and Free Pickleball Intro. Navigation is handled through a `navigateTo` function that updates state and scrolls to top.

### Content Management Architecture
The project implements a hybrid content approach with clear separation between customized and CMS-managed content:

1. **Customized Pages**: Use direct JavaScript data imports for immediate loading and better performance
   - **Static data files**: `src/data/` for main pages, `src/data/play/` for play subpages
   - **Direct imports**: Pages import data directly, no async loading required
   - **Examples**: HomePage, AboutUs, GroupBookings, Partnerships, all Play subpages

2. **CMS-Managed Pages**: Use Decap CMS with markdown files for dynamic content management
   - **Events**: `src/content/events/` (CMS-managed only, individual event pages)
   - **Locations**: `src/content/locations/` (CMS-managed, all locations shown as cards)
   - **Announcements**: `src/content/announcements/` (CMS-managed only, rotating banner)
   - **Generic pages**: `src/content/pages/` for pages managed via CMS interface

3. **Content Loading Patterns**:
   - **Customized pages**: `import { pageData } from '../data/pageData'` - immediate availability
   - **CMS pages**: `loadPageContent()` and `loadSubpageContent()` - async markdown loading
   - **Fallback system**: `getStaticContent()` only used by legacy CMS pages

### CMS Automation System

#### Manifest Files Purpose
**What are manifest.json files?**
Manifest files are **content indexes** that enable automatic content discovery in static sites:

```json
// src/content/locations/manifest.json
["scarborough", "richmond-hill"]

// src/content/events/manifest.json  
["late-summer-bbq", "inauguration-tournament"]
```

**Why are manifests needed?**
- **Static Site Limitation**: Browsers can't scan server directories like `src/content/events/`
- **Content Discovery**: Pages need to know which content files exist without server access
- **Navigation Generation**: Dynamic navigation requires a list of available content
- **Performance**: Pre-built indexes avoid runtime directory scanning

**How they're used in code:**
```javascript
// LocationsCMSPage loads all locations:
const manifestResponse = await fetch('/src/content/locations/manifest.json');
const locationSlugs = await manifestResponse.json(); // ['scarborough', 'richmond-hill']
locationSlugs.forEach(slug => loadContent(`/src/content/locations/${slug}.md`));

// Header creates dynamic navigation:
const events = await loadEventsForNav(); // Uses events manifest for dropdown
```

#### GitHub Action Workflow
**Automated Manifest Generation** (`.github/workflows/update-manifests.yml`):
- **Trigger**: Commits to `src/content/events/`, `src/content/locations/`, or `src/content/announcements/`
- **Action**: Automatically runs `npm run generate-manifests` script
- **Script Function**: Scans content directories, generates updated manifest.json files  
- **Result**: Updated manifests committed back to repository
- **Benefit**: Content creators never manually update navigation - fully automated

**Workflow Steps:**
1. CMS publishes new content → Creates new `.md` file in content directory
2. GitHub detects file changes → Triggers workflow based on directory path
3. Workflow runs `scripts/generate-manifests.js` → Scans directories, updates manifests
4. Workflow commits updated manifests → Auto-commits back to repository  
5. Site rebuilds → New content automatically appears in navigation and pages

### Component Hierarchy
```
App.jsx (navigation state)
├── Page Components (HomePage, PlayCMS, etc.)
├── Section Components (BookingSection, etc.) 
├── UI Components (Button, Card, Input)
└── Utility Components (ContentTile, etc.)
```

### Design System Integration
- **Shadcn/ui**: Configured in `components.json` with components in `src/components/ui/`
- **Tailwind**: Extended config with Picktopia brand colors and Orbitron/Ubuntu fonts
- **CSS Variables**: Design tokens in `src/index.css` for Shadcn/ui theming

## Key Files & Patterns

### Page Layout Options
The project supports two different hero section layouts for pages:

1. **Traditional Full-Width Hero** (`HeroSection`):
   - Background image covers full width with overlay
   - Centered title and subtitle over image
   - Used for most pages (Homepage, About, etc.)
   - Props: `title`, `subtitle`, `backgroundImage`, `size`, `overlayColor`, `children`

2. **Image Content Layout** (`ImageContentSection`):
   - Flexible image and content side-by-side layout
   - Image position configurable (left or right) via `imagePosition` prop
   - No overlay on image for clear visibility
   - Can be used anywhere on pages, not just hero sections
   - Props: `title`, `subtitle`, `backgroundImage`, `size`, `imagePosition`, `padding`, `imageAspectRatio`, `children`
   - Responsive: stacks vertically on mobile

**When to use each layout:**
- **HeroSection**: Use for pages where text readability over image is priority
- **ImageContentSection**: Use anywhere you need image and content side-by-side with flexible positioning

### Page Structure

**Customized Pages (Direct Data Import):**
- `src/pages/HomePage.jsx`: Uses `src/data/homePageData.js`
- `src/pages/AboutUsPage.jsx`: Uses `src/data/aboutUsData.js`
- `src/pages/GroupBookingsPage.jsx`: Uses `src/data/groupBookingData.js`
- `src/pages/PartnershipsPage.jsx`: Uses `src/data/partnershipData.js`
- `src/pages/play/BookingPage.jsx`: Uses `src/data/play/bookingData.js`
- `src/pages/play/ProgramSchedulePage.jsx`: Uses `src/data/play/programScheduleData.js` (uses ImageContentSection)
- `src/pages/play/TrainingProgramsPage.jsx`: Uses `src/data/play/trainingProgramsData.js`
- `src/pages/play/FreePickleballIntroPage.jsx`: Uses `src/data/play/freePickleballIntroData.js`

**CMS-Managed Pages (Markdown Loading):**
- `src/pages/LocationsCMSPage.jsx`: Locations listing page (loads from `src/content/locations/`)
- `src/pages/EventCMSPage.jsx`: Individual event pages from `src/content/events/`
- `src/pages/EventsPage.jsx`: Events listing page
- `src/pages/CMSPage.jsx`: Generic template for CMS-managed pages
- `src/pages/GenericCMS.jsx`: Simple CMS content template

### Content Loading Patterns

**Customized Pages (Direct Import - Recommended for stable content):**
```javascript
// Direct import for immediate availability
import { homePageData } from '../data/homePageData';
import { bookingData } from '../data/play/bookingData';

const HomePage = () => {
  const content = homePageData; // No async loading, immediately available
  return <HeroSection title={content.hero.title} />;
};
```

**CMS Pages (Async Loading - For dynamic content):**
```javascript
// Async loading for CMS-managed content
const content = await loadPageContent('generic-page');
const subpageContent = await loadSubpageContent('parent', 'subpage');
<BookingSection content={content.section} />
```

### Section Components
Located in `src/components/sections/`, these accept content props and render Shadcn/ui components. Each section handles its own content structure and booking URLs.

### Styling Approach
- Use Shadcn/ui components for UI elements
- Tailwind classes for layout and spacing
- CSS variables for theme consistency
- Custom Picktopia colors: `picktopia-orange`, `picktopia-blue-dark`, `picktopia-blue-mid`

## Content Management

### Markdown Loading System
The project uses a custom browser-compatible frontmatter parser in `src/utils/contentLoader.js` that replaces the Node.js `gray-matter` library. This was necessary because `gray-matter` requires `Buffer` which doesn't exist in browsers.

**Key Implementation Details:**
- Custom `parseFrontmatter()` function handles YAML frontmatter parsing
- Supports quoted strings, basic key-value pairs, and comments
- Files must be in `src/content/pages/` to be accessible via HTTP fetch
- Returns `{ frontmatter, content }` structure for compatibility

### Adding New Pages

**For Customized Pages (Stable, Developer-Managed Content):**
1. **Create data file**: `src/data/pageName Data.js` (or `src/data/category/pageNameData.js` for subpages)
2. **Create page component**: `src/pages/PageName.jsx` with direct data import
3. **Add route in App.jsx**
4. **Pattern**: `import { pageData } from '../data/pageData'; const content = pageData;`

**For CMS-Managed Pages (Dynamic, Content Creator-Managed):**
1. **Create markdown file**: `src/content/pages/[pagename].md`
2. **Create page component**: `src/pages/[PageName].jsx` using async loading
3. **Add route in App.jsx**
4. **Pattern**: Use `loadPageContent()` or `loadSubpageContent()` with loading states

**Important:** Markdown files must be in `src/content/pages/` directory structure to be fetchable by the browser. The custom parser handles frontmatter without requiring Node.js dependencies.

### Section Component Pattern
```javascript
// Each section component accepts content props
function SectionComponent({ content }) {
  return (
    <div className={content.backgroundColor || 'bg-white'}>
      <h2>{content.title}</h2>
      {content.bookingUrl && (
        <BookingButton url={content.bookingUrl} text={content.bookingText} />
      )}
    </div>
  );
}
```

### Booking Integration
Booking URLs are configured per section in content files and handled by `BookingButton.jsx` component for Court Reserve integration.

## Deployment Configuration

- **GitHub Pages**: Deployed to `supertimmyh.github.io/picktopia_website`
- **Base Path**: Configured in `vite.config.js` for production GitHub Pages deployment
- **CMS**: Decap CMS configured in `public/admin/` for content management

### Asset Path Management

The project uses a centralized asset path system to handle deployment across different domains and base paths.

#### Key Files:
- **`src/utils/assetPath.js`**: Core utility for asset path resolution
- **`src/utils/dataWithAssets.js`**: Processes data objects to apply correct asset paths
- **`src/utils/contentLoader.js`**: Handles CMS content loading with proper base paths

#### Usage Patterns:

**For Individual Assets (in components):**
```javascript
import { getAssetPath } from '../utils/assetPath';

// Use for any public folder asset
<img src={getAssetPath("/images/hero/photo.jpg")} />
<video src={getAssetPath("/images/hero/video.MP4")} />
```

**For Data-Driven Assets (in pages):**
```javascript
import { withAssetPaths } from '../utils/dataWithAssets';
import { pageData } from '../data/pageData';

const MyPage = () => {
  const content = withAssetPaths(pageData); // Processes all asset paths
  return <HeroSection backgroundImage={content.heroImage} />;
};
```

**For CMS Content:**
All CMS content loading automatically handles base paths via `contentLoader.js`. No additional code needed.

#### Domain Configuration:

**Current Setup (GitHub Pages subdirectory):**
```javascript
// src/utils/assetPath.js
const getBasePath = () => {
  return import.meta.env.PROD ? '/picktopia_website/' : '/';
};
```

**For Custom Domain (update when switching domains):**
```javascript
// For custom domain deployment at root
const getBasePath = () => {
  return '/'; // Always use root path
};

// Or smart detection (recommended)
const getBasePath = () => {
  if (import.meta.env.PROD && window.location.hostname.includes('github.io')) {
    return '/picktopia_website/';
  }
  return '/'; // Custom domain or development
};
```

#### Asset Organization:
```
public/images/
├── coaches/        # Coach photos
├── facilities/     # Facility images  
├── hero/           # Hero images/videos
├── uploads/        # CMS uploads
└── place-holder.jpg # Default placeholder
```

**Important**: All customized page assets must be in `public/images/` (not `src/assets/`) to ensure proper deployment and path resolution.

## Development Notes

### Known Limitations
- No React Router (uses state-based navigation with dropdown submenus)
- No TypeScript (JavaScript only)
- No test framework configured
- Manual navigation state management with dropdown support

### When Adding Features

**For Customized Pages:**
- Create data files in `src/data/` with clear naming conventions
- Use direct imports for immediate content availability
- Use Shadcn/ui components for consistency
- Maintain responsive design with Tailwind utilities
- **Benefits**: Better performance, no loading states, immediate availability

**For CMS-Managed Pages:**
- Create markdown files in the appropriate content hierarchy
- Implement content loading with `loadPageContent()` or `loadSubpageContent()`
- Always include static fallback content for reliability
- **Benefits**: Content creators can edit without developer involvement

**Decision Guide:**
- **Use customized pages** for stable content that changes infrequently (HomePage, AboutUs, service pages)
- **Use CMS pages** for dynamic content that needs regular updates (events, blog posts, announcements)

### CMS Page Naming Convention
**IMPORTANT**: Follow consistent naming patterns for CMS-managed pages vs. customized pages:

**CMS-Managed Page Components:**
- `LocationsCMSPage.jsx` - Loads locations from CMS, displays all as cards
- `EventCMSPage.jsx` - Individual event pages from CMS content  
- `EventsPage.jsx` - Events listing page
- `CMSPage.jsx` - Generic template for CMS-managed pages
- `GenericCMS.jsx` - Simple CMS content template

**Customized Page Components:**
- `HomePage.jsx` - Uses direct data import from `homePageData.js`
- `AboutUsPage.jsx` - Uses direct data import from `aboutUsData.js`  
- `GroupBookingsPage.jsx` - Uses direct data import from `groupBookingData.js`
- `PartnershipsPage.jsx` - Uses direct data import from `partnershipData.js`
- All Play subpages (BookingPage.jsx, etc.) - Use direct data imports

**Naming Rule:**
- **CMS pages**: Include "CMS" or "CMSPage" in filename when content is loaded from markdown
- **Customized pages**: Standard "Page" suffix when using direct JavaScript data imports
- This makes it immediately clear which pages depend on CMS vs. static data

## Adding New CMS-Managed Page Types

The project supports both hardcoded pages and CMS-managed collections. For collections that need dynamic navigation and individual page views (like Events and Locations), follow this implementation pattern:

### 1. Decap CMS Configuration
Add your collection to `public/admin/config.yml`:

```yaml
collections:
  - name: "your-collection"
    label: "Your Collection"
    folder: "src/content/your-collection"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Field Name", name: "fieldName", widget: "string" }
      # Add more fields as needed
```

### 2. Create Page Component
Create a dedicated page component (`src/pages/YourCollectionPage.jsx`):

```javascript
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { loadContent } from '../utils/contentLoader';

const YourCollectionPage = ({ itemSlug }) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadItemContent = async () => {
            try {
                const content = await loadContent(`/src/content/your-collection/${itemSlug}.md`);
                if (content) setItem(content);
                setLoading(false);
            } catch (error) {
                console.error('Error loading content:', error);
                setLoading(false);
            }
        };
        loadItemContent();
    }, [itemSlug]);

    // Render your custom layout using frontmatter fields
    const { frontmatter } = item || {};
    
    return (
        <div className="min-h-screen">
            <HeroSection
                title={frontmatter?.title}
                subtitle="Item Details"
                backgroundImage={frontmatter?.image}
                size="large"
                overlayColor="blue"
            />
            {/* Custom content layout */}
        </div>
    );
};

export default YourCollectionPage;
```

### 3. Add Navigation Loading
Create a navigation loader in `src/utils/contentLoader.js`:

```javascript
export const loadYourCollectionForNav = async () => {
  try {
    const manifestResponse = await fetch('/src/content/your-collection/manifest.json');
    let slugs = [];
    
    if (manifestResponse.ok) {
      slugs = await manifestResponse.json();
    } else {
      return [];
    }
    
    const items = [];
    for (const slug of slugs) {
      try {
        const content = await loadContent(`/src/content/your-collection/${slug}.md`);
        if (content && content.frontmatter.title) {
          items.push({
            slug: slug,
            title: content.frontmatter.title
          });
        }
      } catch (error) {
        console.log(`Item ${slug} not found, skipping`);
      }
    }
    
    return items;
  } catch (error) {
    console.error('Error loading items for navigation:', error);
    return [];
  }
};
```

### 4. Update Navigation Data
Add dynamic placeholder to `src/data.js`:

```javascript
navLinks: [
    // ... existing items
    { type: "dynamic", source: "your-collection", title: "Your Collection" }
]
```

### 5. Import Navigation Loader
Update `src/components/Header.jsx`:

```javascript
import { loadYourCollectionForNav } from '../utils/contentLoader';

// In useEffect:
const yourCollection = await loadYourCollectionForNav();
setDynamicNavData({ ...existing, yourCollection });
```

### 6. Add Routing
Update `src/App.jsx`:

```javascript
import YourCollectionPage from './pages/YourCollectionPage';

// In renderPage():
if (page.startsWith('your-collection-')) {
    const slug = page.replace('your-collection-', '');
    return <YourCollectionPage itemSlug={slug} />;
}

// In switch statement:
case 'your-collection':
    return <CMSPage pageSlug="your-collection" />;
```

### 7. Create Directory Structure
```bash
mkdir -p src/content/your-collection
echo "[]" > src/content/your-collection/manifest.json
```

### 8. Automatic Manifest Generation
The build process automatically generates manifests by scanning collection directories. **For events and announcements, manifests are automatically updated via GitHub Actions** - no manual action required.

**Automatic Updates via GitHub Actions:**
- Events and announcements published via CMS trigger automatic manifest generation
- Workflow file: `.github/workflows/update-manifests.yml`
- Takes 2-3 minutes to complete after CMS publish

**Manual Generation (if needed):**
```bash
npm run generate-manifests
```

**Other Automatic Generation:**
- `npm run build` (build-time generation)
- `git commit` (pre-commit hook)

### Examples
- **Events**: Individual event pages with date, location, description
- **Locations**: Location pages with address, hours, amenities
- **Blog Posts**: Blog entries with author, date, content
- **Team Members**: Staff pages with bio, photo, role

This pattern provides:
- ✅ Dynamic navigation dropdowns
- ✅ Individual page routes  
- ✅ CMS content management
- ✅ Automatic manifest updates
- ✅ Consistent page templates

## CMS Content Creation Workflow

### Accessing Decap CMS
- **Local**: `http://localhost:5173/admin/index.html#/`
- **Production**: `https://yoursite.com/admin/index.html#/`
- **Authentication**: GitHub OAuth (requires repository access)

### Events Management (CMS Only)
**IMPORTANT**: Events are strictly managed via Decap CMS - never edit files directly in `src/content/events/`

#### Creating Events:
1. **Access CMS** → Collections → Events → New Event
2. **Required Fields:**
   - Event Name (becomes page title)
   - Date & Time
   - Location
   - Image (uploaded to `/public/images/uploads/`)
   - Description (markdown supported)
3. **Optional Fields:**
   - Registration Link (external booking URL)
   - Price
4. **Publish** → Triggers GitHub Action for manifest update
5. **Result**: 
   - Individual event page available at `/events-{slug}`
   - Event appears in navigation dropdown
   - Searchable and linkable from announcements

### Locations Management (CMS Only)
**IMPORTANT**: Locations are managed via Decap CMS - never edit files directly in `src/content/locations/`

#### Creating/Editing Locations:
1. **Access CMS** → Collections → Locations → New Location (or edit existing)
2. **Required Fields:**
   - Location Name (e.g., "Picktopia Scarborough")
   - Address (full address for maps integration)
   - Phone number
   - Email address  
   - Court Count (number of courts at facility)
   - Facility Image (uploaded to `/public/images/uploads/`)
   - Booking URL (Court Reserve or booking system URL)
3. **Hours Configuration:**
   - Set hours for each day of the week
   - Format: "6:00 AM - 11:00 PM" 
4. **Amenities List:**
   - Add facility amenities (Pro Shop, Parking, etc.)
   - Each amenity as separate list item
5. **Description:**
   - Markdown supported description of the facility
6. **Publish** → Triggers GitHub Action for manifest update
7. **Result**: 
   - Location appears as a card on the main `/locations` page
   - No individual location subpages - all locations on one page
   - Cards include expandable hours, contact info, and booking buttons

#### Location Card Features:
- **Facility image** at top of card
- **Contact details**: address, phone, email  
- **Court count** badge on image
- **Expandable hours** (click to show/hide full weekly schedule)
- **Amenities** display (first 4 shown, "+X more" for additional)
- **Direct booking button** linking to location's booking URL
- **Mobile responsive** design

### Announcements Management (CMS Only)
**IMPORTANT**: Announcements are strictly managed via Decap CMS - never edit files directly in `src/content/announcements/`

#### Creating Announcements:
1. **Access CMS** → Collections → Announcements → New Announcement
2. **Configure Fields:**
   - **Title**: Internal reference (not displayed)
   - **Message**: Text displayed in announcement bar
   - **Link Type**: Choose behavior when clicked
     - `none`: Display only, no link
     - `internal`: Link to internal page (e.g., "events", "about-us")
     - `external`: Link to external URL (full URL required)
     - `event`: Link to specific event page (use event slug)
   - **Link**: Depends on Link Type
   - **Priority**: Higher numbers show first (1-10)
   - **Active**: Toggle visibility
   - **Start/End Date**: Optional scheduling
3. **Publish** → Triggers GitHub Action for manifest update
4. **Result**: Announcement appears in rotating banner with correct link behavior

#### Announcement Link Examples:
```yaml
# Link to specific event
linkType: "event"
link: "inauguration-tournament"  # Event slug

# Link to events listing page  
linkType: "internal"
link: "events"

# Link to external registration
linkType: "external" 
link: "https://app.courtreserve.com/Online/Portal/Index/16040"

# Display only
linkType: "none"
link: ""  # Leave empty
```

### Automated Workflow
1. **Content Creation**: Use CMS interface to create/edit content
2. **CMS Publish**: Commits changes to GitHub repository
3. **GitHub Action Trigger**: Detects changes in events/locations/announcements directories
4. **Manifest Generation**: Runs `npm run generate-manifests` automatically
5. **Auto-Commit**: Updates manifest files and commits back to repo
6. **Navigation Update**: Site navigation reflects new content (2-3 minute delay)
7. **Live Site**: Content appears on production site after deployment

### Important Notes
- **Never edit event/location/announcement files directly** - always use CMS
- **GitHub Action handles manifests** - no manual generation needed
- **Content appears after ~2-3 minutes** - time for GitHub Action to complete
- **Individual event pages** - each event gets its own URL and page
- **Single locations page** - all locations displayed as cards on `/locations` page
- **Announcement rotation** - multiple announcements rotate every 4 seconds
- **Link validation** - ensure event slugs match exactly for announcement links