# Picktopia Website - Claude Code Instructions

## Typography

### Fonts
- **Headlines/Brand**: Orbitron (futuristic, sci-fi aesthetic)
- **Body Content**: Inter (clean, highly legible sans-serif)
- **Implementation**: Google Fonts loaded in `index.html`, configured in `tailwind.config.js`
- **Tailwind Classes**:
  - `font-heading` or `font-brand` for Orbitron
  - `font-body` or default text for Inter

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
- Dropdown menus for Academy, Play, and About sections
- Dynamic navigation from CMS content via manifest files
- Current structure: Home, Join, Academy (Training Programs, Free Pickleball Intro), Play (Booking, Program Schedule, Group Bookings), Events, Clubs, About (About Us, Partnerships)

### CMS Collections
- **Events**: Individual event pages (`public/content/events/`)
- **Locations**: Location cards page (`public/content/locations/`)
- **Announcements**: Rotating banner (`public/content/announcements/`)
- **Memberships**: Membership tiers and pricing (`public/content/memberships/`)
- **Promotions**: Modal window for special promotions and events (`public/content/promotions/`)
- **Generic Pages**: CMS-managed pages (`public/content/pages/`)

### Form Handling System
All forms are integrated with Formspree for professional email delivery and
submission management.

#### Formspree Configuration
- **Config File**: `src/config/formspree.js`
- **Implementation**: AJAX submissions using `fetch()` API
- **User Experience**: No page redirects, smooth success/error states

#### Active Forms
| Form Component | Formspree ID | Location | Purpose |
|----------------|--------------|----------|---------|
| IntroSignupForm | `mrbyzklv` | Free Intro section | Free pickleball intro signups |
| GroupBookingForm | `xdkwnzwo` | Group Bookings page | Event inquiry submissions |
| PartnershipInquiryForm | `mldprnpj` | Partnerships page | Partnership request submissions |
| GetNotified | `myzngjnw` | About Us page | Notification signups for updates |
| Newsletter | `xblzryzb` | Home page | Email newsletter subscriptions |

#### Form Implementation Pattern
All forms follow consistent implementation:
- Import `getFormspreeAjaxUrl` from config
- State management: `isSubmitting`, `submitted`, `submitError`
- AJAX submission with proper error handling
- Success states with auto-reset (3-5 seconds)
- Loading states with disabled form controls
- Branded success/error messages matching component themes

#### Adding New Forms
1. Add Formspree ID to `FORMSPREE_IDS` in config file
2. Follow existing form component patterns
3. Use `getFormspreeAjaxUrl('formType')` for submissions
4. Include proper state management and error handling

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
- Smart domain detection handles GitHub Pages  custom domain migration
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
- ✅ **Promotions** - Fully automated

### CMS Workflow
1. Content creator accesses Decap CMS at `http://localhost:5173/admin/index.html` (development)
2. CMS authenticates with GitHub and edits content directly in repository
3. GitHub Action detects changes in `public/content/collection-name/**`
4. Runs `npm run generate-manifests` automatically
5. Commits updated manifest files with "[skip ci]" tag
6. Navigation and pages reflect new content automatically

### CMS Content Source & Editing
  - **CMS Access**: `http://localhost:5173/admin/index.html` during development
  - **Content Source**: Decap CMS reads/writes content directly from/to GitHub repository
  (`supertimmyh/picktopia_website` on `main` branch)
  - **Backend**: GitHub OAuth authentication (content stored on GitHub, not locally)
  - **Editing Process**: CMS changes commit directly to GitHub repository
  - **Important**: Local file changes must be pushed to GitHub before they appear in CMS editor
  - **Field Updates**: When adding new CMS fields, existing content needs to be pushed to GitHub for
   fields to appear in CMS interface

### CMS Content Sync Requirements
```bash
# After making local content changes, sync with CMS:
git add .
git commit -m "Update content"
git push origin main
# Now CMS can see and edit the changes
```

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
- Promotions: Use CMS for promotional modal content

### Static Content (Developer-managed)
- Page data in `src/data/` for stable content
- Component-based sections accepting content props
- Direct imports for better performance

## Promotional Modal System

### Overview
A CMS-driven modal window designed to display special announcements, events, or promotions. It is configured to be impactful but not intrusive.

### Implementation Details
- **Component**: `src/components/PromotionModal.jsx`
- **Logic & Control**: Primary logic for fetching content and managing modal visibility is in `src/App.jsx`
- **Behavior**: Appears only once per user browser session using sessionStorage to track if viewed
- **Content Source**: Dedicated CMS collection named "promotions"

### CMS Collection Structure (Promotions)
- **Folder**: `public/content/promotions/`
- **Fields**:
  - `enabled` (boolean): Toggle to activate/deactivate promotion without deleting
  - `title` (string): Main headline for the modal
  - `image` (image): Prominent poster image
  - `body` (markdown): Descriptive text content
  - `cta_link` (string): Optional destination URL for CTA button
- **Automation**: Fully integrated into manifest generation and GitHub Actions workflow

## Deployment
- GitHub Pages: `supertimmyh.github.io/picktopia_website`
- Asset paths automatically adjust for subdirectory vs custom domain
- Vite config handles base path: `/picktopia_website/` in production

## Agent Interaction & Context
- **Purpose**: The `context/` folder is used by the Gemini CLI agent to store task-specific information, detailed implementation plans, and logs during ongoing development tasks.
- **Contents**:
  - `context.txt`: Contains the detailed plan for the current task.
  - `errors-log.txt`: Stores logs of errors encountered during agent operations.
  - `reference.txt`: May contain additional reference material relevant to the current task.
- **Usage**: This folder is primarily for the agent's internal use to maintain context and provide detailed information to the user. It should not be directly modified by developers unless specifically instructed.


**Note: This section is for future reference and not related to any code changes unless indicate otherwise**

## Future Improvements - Error Handling

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


## Future Improvements - Firebase Form Integration

#### Current Formspree vs Future Firebase
- **Current**: Formspree AJAX submissions with email notifications
- **Future**: Firebase Firestore database + Cloud Functions for advanced
workflows

#### Firebase Implementation Benefits
- **Data Persistence**: Store all form submissions in Firestore database
- **Real-time Admin Dashboard**: View, filter, and manage submissions
- **Advanced Notifications**: Custom email templates and automated workflows
- **Analytics Integration**: Track conversion rates and form performance
- **Offline Support**: Queue submissions when users are offline
- **Scalability**: Handle unlimited submissions without third-party limits

#### Migration Strategy
```javascript
// Future Firebase service structure
const FIREBASE_COLLECTIONS = {
intro: 'intro-signups',
groupBooking: 'group-bookings',
partnership: 'partnership-inquiries',
getNotified: 'notification-signups',
newsletter: 'newsletter-subscriptions'
};

// Parallel implementation approach
const submitToFirebase = async (formType, data) => {
// Store in Firestore + trigger Cloud Function for emails
};

Implementation Priority

1. Phase 1: Set up Firebase project and Firestore collections
2. Phase 2: Create admin dashboard for viewing submissions
3. Phase 3: Migrate forms one-by-one (keeping Formspree as backup)
4. Phase 4: Add advanced features (analytics, automated workflows)
5. Phase 5: Remove Formspree dependency

Configuration Considerations

- Maintain existing form UX during migration
- Keep src/config/formspree.js pattern for src/config/firebase.js
- Environment variables for Firebase config keys
- Fallback to Formspree if Firebase fails during transition