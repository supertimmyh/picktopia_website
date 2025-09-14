
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
- **Memberships**: Membership tiers and pricing (`public/content/memberships/`)
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

### Supported Collections (Auto-Manifest Generation)
- ✅ **Events** - Fully automated
- ✅ **Locations** - Fully automated
- ✅ **Announcements** - Fully automated
- ✅ **Memberships** - Fully automated

### CMS Workflow
1. Content creator publishes via Decap CMS at `/admin/`
2. GitHub Action detects changes in `public/content/collection-name/**`
3. Runs `npm run generate-manifests` automatically
4. Commits updated manifest files with "[skip ci]" tag
5. Navigation and pages reflect new content automatically

### Manual Manifest Generation
```bash
npm run generate-manifests
```
This script processes all collections in `public/content/` and generates corresponding `manifest.json` files.

## CMS Page Implementation Pattern

### Step-by-Step Checklist for New CMS Collections

**1. CMS Configuration (`public/admin/config.yml`)**
```yaml
- name: "collection-name"
  label: "Collection Label"
  folder: "public/content/collection-name"
  create: true
  slug: "{{slug}}"
  fields:
    - { label: "Title", name: "title", widget: "string" }
    # Add other fields as needed
```

**2. Required Imports in Page Component**
```javascript
import { loadContent } from '../utils/contentLoader'; // NOT contentLoader.js - this is wrong
import { getAssetPath } from '../utils/assetPath';     // NOT from contentLoader
```

**3. Content Loading Pattern (Manifest-Based)**
```javascript
useEffect(() => {
  const loadCollection = async () => {
    try {
      // Load collection slugs from manifest file
      const manifestResponse = await fetch(getAssetPath('/content/collection-name/manifest.json'));
      let slugs = [];

      if (manifestResponse.ok) {
        slugs = await manifestResponse.json();
      } else {
        console.log('Manifest not found');
        setLoading(false);
        return;
      }

      const items = [];
      for (const slug of slugs) {
        const content = await loadContent(`/content/collection-name/${slug}.md`);
        if (content && content.frontmatter) {
          items.push({ slug, ...content.frontmatter });
        }
      }

      setItems(items);
      setLoading(false);
    } catch (error) {
      console.error('Error loading collection:', error);
      setLoading(false);
    }
  };

  loadCollection();
}, []);
```

**4. Required Automation Updates**

**GitHub Action** (`.github/workflows/update-manifests.yml`):
```yaml
paths:
  - 'public/content/collection-name/**'  # Add this line
```

**Manifest Script** (`scripts/generate-manifests.js`):
```javascript
// Generate collection-name manifest
const collectionDir = path.join(__dirname, '../public/content/collection-name');
const collectionManifestPath = path.join(collectionDir, 'manifest.json');

try {
  if (fs.existsSync(collectionDir)) {
    const files = fs.readdirSync(collectionDir);
    const slugs = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));

    fs.writeFileSync(collectionManifestPath, JSON.stringify(slugs, null, 2));
    console.log(`Generated collection-name manifest with ${slugs.length} items:`, slugs);
  }
} catch (error) {
  console.error('Error generating collection-name manifest:', error);
}
```

**5. Navigation Integration**
- Add route to `src/App.jsx` switch statement
- Add navigation link to `src/data/data.js` navLinks array

**6. Asset Management**
- Store assets in `public/images/collection-name/`
- Use `getAssetPath('/images/collection-name/filename.ext')`

### Common Pitfalls to Avoid
- ❌ Wrong imports: `loadContentFromFolder` (doesn't exist)
- ❌ Wrong imports: `getAssetPath` from `contentLoader` (wrong file)
- ❌ Forgetting to update GitHub Action workflow
- ❌ Forgetting to update manifest generation script
- ❌ Using `src/assets/` instead of `public/images/`

## Content Management Rules

### CMS-Only Content (Never edit files directly)
- Events: Use CMS for all event creation/editing
- Locations: Use CMS for location management
- Announcements: Use CMS for banner announcements
- Memberships: Use CMS for membership tier management

### Static Content (Developer-managed)
- Page data in `src/data/` for stable content
- Component-based sections accepting content props
- Direct imports for better performance

## Deployment
- GitHub Pages: `supertimmyh.github.io/picktopia_website`
- Asset paths automatically adjust for subdirectory vs custom domain
- Vite config handles base path: `/picktopia_website/` in production

## Error Handling & Fallbacks

### Current Implementation
- Lorem Ipsum fallback content in `src/data/data.js` provides visual indication when CMS fails
- Console logging for debugging CMS content loading issues
- Graceful degradation - site remains functional when CMS is down

### CMS Content Loading Error Patterns
```javascript
// Proper error handling in CMS pages
try {
  const manifestResponse = await fetch(getAssetPath('/content/collection/manifest.json'));
  if (!manifestResponse.ok) {
    console.log('Manifest not found - showing fallback content');
    setLoading(false);
    return; // Show "Coming Soon" or fallback content
  }
  // Process content...
} catch (error) {
  console.error('Error loading collection:', error);
  setLoading(false);
}
```

## Future Improvements - Error Handling

**Note: This section is for future reference and not related to any code changes unless indicate otherwise**

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
