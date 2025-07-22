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
The project implements a hybrid CMS approach:

1. **CMS Content**: YAML frontmatter + Markdown files organized hierarchically in `src/content/pages/`
2. **Content Structure**: 
   - Main pages: `src/content/pages/[pagename].md`
   - Subpages: `src/content/pages/[parent]/[subpage].md` (e.g., `play/booking.md`)
3. **Content Loading**: `src/utils/contentLoader.js` handles dynamic loading with `loadPageContent()` and `loadSubpageContent()`
4. **Fallback System**: Static content in `getStaticContent()` for when markdown files are unavailable
5. **Page Components**: All pages load content from markdown files with static fallbacks

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
- `src/pages/HomePage.jsx`: Static homepage with sections
- `src/pages/play/BookingPage.jsx`: Court booking subpage
- `src/pages/play/ProgramSchedulePage.jsx`: Program schedule subpage (uses ImageContentSection)
- `src/pages/play/TrainingProgramsPage.jsx`: Training programs subpage
- `src/pages/play/FreePickleballIntroPage.jsx`: Free intro class subpage
- `src/pages/CMSPage.jsx`: Generic template for simple CMS pages

### Content Loading Pattern
```javascript
// Main pages load from markdown files
const content = await loadPageContent('about');

// Subpages load from hierarchical structure
const content = await loadSubpageContent('play', 'booking');
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
1. **Main pages**: 
   - Create markdown file: `src/content/pages/[pagename].md`
   - Create page component: `src/pages/[PageName].jsx`
   - Add route in `App.jsx`
2. **Subpages**: 
   - Create markdown file: `src/content/pages/[parent]/[subpage].md`
   - Create page component: `src/pages/[parent]/[SubpageName].jsx`
   - Update navigation structure in `src/data.js`
   - Add route in `App.jsx`
3. Use `loadPageContent()` or `loadSubpageContent()` to load content dynamically

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

## Development Notes

### Known Limitations
- No React Router (uses state-based navigation with dropdown submenus)
- No TypeScript (JavaScript only)
- No test framework configured
- Manual navigation state management with dropdown support

### When Adding Features
- Create markdown files in the appropriate content hierarchy
- Use Shadcn/ui components for consistency
- Implement content loading with `loadPageContent()` or `loadSubpageContent()`
- Maintain responsive design with Tailwind utilities
- Always include static fallback content for reliability

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
The build process automatically generates manifests by scanning collection directories. When you create new items through Decap CMS, run:

```bash
npm run generate-manifests
```

Or the manifest will be updated automatically during:
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