# Picktopia Website - Claude Code Instructions

## Development Commands

```bash
npm install --legacy-peer-deps  # Install dependencies (React/Decap CMS conflicts)
npm run dev                     # Development server (localhost:5173)
npm run build                   # Production build
npm run deploy                  # Deploy to GitHub Pages
```

## Architecture Overview

### Hybrid Content System
- **Static Pages**: Direct JavaScript imports from `src/data/` (HomePage, AboutUs, Play pages)
- **Dynamic Content**: Decap CMS managing markdown in `public/content/` (Events, Locations, Announcements)

### Navigation
- State-based navigation in `src/App.jsx` (no React Router)
- Dropdown menus for Play section
- Dynamic navigation from CMS content via manifest files

### CMS Collections
- **Events**: Individual event pages (`public/content/events/`)
- **Locations**: Location cards page (`public/content/locations/`)  
- **Announcements**: Rotating banner (`public/content/announcements/`)
- **Generic Pages**: CMS-managed pages (`public/content/pages/`)

## Key Files

### Content Loading
- `src/utils/contentLoader.js` - Custom frontmatter parser for CMS content
- `src/utils/assetPath.js` - Smart path handling for GitHub Pages/custom domains
- `src/utils/dataWithAssets.js` - Asset path processing for static data

### Page Types
**Static Pages** (Direct imports):
```javascript
import { pageData } from '../data/pageData';
const content = pageData; // Immediate availability
```

**CMS Pages** (Async loading):
```javascript
const content = await loadPageContent('page-slug');
```

### Asset Management
- All assets in `public/images/` (not `src/assets/`)
- Use `getAssetPath('/images/photo.jpg')` for proper deployment paths
- Smart domain detection handles GitHub Pages � custom domain migration
- For each customized page, storing assets in public/images/ using category folders that match content purpose. For instant, a `category` page stores its assets under `/images/category/filename.ext`

## Automation

### Manifest Generation
- `public/content/*/manifest.json` files enable content discovery
- Auto-generated via GitHub Actions when CMS publishes content
- Manual generation: `npm run generate-manifests`

### CMS Workflow
1. Content creator publishes via Decap CMS at `/admin/`
2. GitHub Action auto-updates manifest files
3. Navigation and pages reflect new content automatically

## Content Management Rules

### CMS-Only Content (Never edit files directly)
- Events: Use CMS for all event creation/editing
- Locations: Use CMS for location management  
- Announcements: Use CMS for banner announcements

### Static Content (Developer-managed)
- Page data in `src/data/` for stable content
- Component-based sections accepting content props
- Direct imports for better performance

## Deployment
- GitHub Pages: `supertimmyh.github.io/picktopia_website`
- Asset paths automatically adjust for subdirectory vs custom domain
- Vite config handles base path: `/picktopia_website/` in production

## Future Improvements - Error Handling

### Current State
Lorem Ipsum fallback content in `src/data/data.js` provides clear visual indication when CMS content fails to load.

### Enhanced Error Handling Strategy
Keep the Lorem Ipsum approach but make it environment-aware:

```javascript
const CONTENT_STATE = {
  development: {
    announcements: ["⚠️ DEV: CMS Failed - Lorem Ipsum Fallback Active"],
    prefix: "🔄 FALLBACK: "
  },
  production: {
    announcements: ["Stay updated with Picktopia news"],
    prefix: ""
  }
};
```

### Implementation Benefits
- ✅ **Clear development feedback** - Visual confirmation when CMS fails
- ✅ **Professional production experience** - Real fallback content for users
- ✅ **Debugging information** - Console logging for troubleshooting
- ✅ **Graceful degradation** - Site remains functional when CMS is down

### Priority Tasks
1. Environment-aware fallback content (keep Lorem Ipsum for dev, real content for production)
2. Enhanced console logging with component context and timestamps
3. Optional: Development-only visual error indicators for immediate feedback
