# Picktopia Pickleball Club Website

A modern, responsive website for Picktopia Pickleball Club built with React, Vite, Tailwind CSS, and Shadcn/ui. Features a professional design system with CMS integration, booking functionality, and a comprehensive content management architecture.

## 🏓 Features

### **Core Features**
- **Modern Design**: Professional UI components with Shadcn/ui design system
- **Responsive**: Fully responsive design that works on desktop, tablet, and mobile devices
- **CMS Integration**: Content managed through YAML frontmatter with markdown support
- **Booking System**: Integrated Court Reserve booking with external URL handling

### **Interactive Components**
- **Professional UI**: Shadcn/ui components (buttons, inputs, cards, forms)
- **Hybrid Content Management**: Direct data imports for performance + CMS for dynamic content
- **Booking Functionality**: Section-specific booking buttons with custom URLs
- **Form Components**: Intro signup form with validation and success states
- **Data Display**: Professional table component for program schedules
- **Navigation**: Mobile-friendly navigation with announcement bar

### **Page Architecture**
- **Component-Based**: Reusable section components for different content types
- **CMS-Driven**: Content loaded from markdown files with YAML frontmatter
- **Fallback System**: Graceful degradation to static content when CMS unavailable

## 🚀 Tech Stack

### **Core Technologies**
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom configuration
- **UI Components**: Shadcn/ui design system
- **Language**: JavaScript (ES6+)

### **UI & Styling**
- **Design System**: Shadcn/ui components with custom Picktopia theming
- **Utility Library**: clsx and tailwind-merge for dynamic styling
- **Icons**: Lucide React icon library
- **Animations**: tailwindcss-animate plugin
- **Typography**: Custom font system (Orbitron, Ubuntu)

### **Content Management**
- **Hybrid Approach**: Direct JS imports for customized pages + Decap CMS for dynamic content
- **Customized Pages**: Direct data imports from `src/data/` for immediate loading
- **CMS Pages**: YAML frontmatter + Markdown for content creator management
- **Custom Parser**: Browser-compatible YAML frontmatter parser
- **Fallback**: Static content loader for development/fallback

## 📁 Project Structure

```
picktopia-website/
├── public/
│   ├── assets/                 # Public assets
│   ├── content/               # CMS content files
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── hero-image.jpeg     # Hero section background
│   │   └── logo_simplified.svg # Navigation logo
│   ├── data/                   # Direct data imports for customized pages
│   │   ├── play/              # Play subpage data files
│   │   │   ├── bookingData.js
│   │   │   ├── programScheduleData.js
│   │   │   ├── trainingProgramsData.js
│   │   │   └── freePickleballIntroData.js
│   │   ├── aboutUsData.js     # About Us page data
│   │   ├── groupBookingData.js # Group bookings data
│   │   ├── homePageData.js    # Homepage data
│   │   └── partnershipData.js # Partnerships data
│   ├── components/
│   │   ├── sections/          # Page-specific section components
│   │   │   ├── BookingSection.jsx      # Court booking section
│   │   │   ├── FreeIntroSection.jsx    # Free intro signup section
│   │   │   ├── ProgramScheduleSection.jsx # Schedule table section
│   │   │   └── TrainingProgramsSection.jsx # Training programs section
│   │   ├── ui/                # Shadcn/ui components
│   │   │   ├── button.jsx     # Button component with variants
│   │   │   ├── card.jsx       # Card component system
│   │   │   ├── input.jsx      # Form input component
│   │   │   └── label.jsx      # Form label component
│   │   ├── AccordionItem.jsx   # FAQ accordion component
│   │   ├── AnnouncementBar.jsx # Top announcement banner
│   │   ├── BookingButton.jsx   # Specialized booking button
│   │   ├── ContentTile.jsx     # Reusable content container
│   │   ├── FaqSection.jsx      # FAQ section with accordions
│   │   ├── Footer.jsx          # Site footer
│   │   ├── GetNotified.jsx     # Newsletter component
│   │   ├── Header.jsx          # Navigation header
│   │   ├── HeroSection.jsx     # Main hero section
│   │   ├── Icons.jsx           # SVG icon components
│   │   ├── IntroSignupForm.jsx # Free intro signup form
│   │   ├── LatestBlogPosts.jsx # Blog posts grid
│   │   ├── Newsletter.jsx      # Email subscription
│   │   └── WhatIsPicktopia.jsx # Features section
│   ├── content/
│   │   └── pages/             # CMS content files
│   │       └── play.md        # Play page content (YAML + Markdown)
│   ├── lib/
│   │   └── utils.js           # Utility functions (cn, etc.)
│   ├── pages/
│   │   ├── play/              # Play subpages with direct data imports
│   │   │   ├── BookingPage.jsx
│   │   │   ├── FreePickleballIntroPage.jsx
│   │   │   ├── ProgramSchedulePage.jsx
│   │   │   └── TrainingProgramsPage.jsx
│   │   ├── AboutUsPage.jsx    # Uses aboutUsData.js
│   │   ├── CMSPage.jsx        # Generic template for CMS-managed pages
│   │   ├── GenericCMS.jsx     # Simple CMS content template
│   │   ├── GroupBookingsPage.jsx # Uses groupBookingData.js
│   │   ├── HomePage.jsx       # Uses homePageData.js
│   │   └── PartnershipsPage.jsx # Uses partnershipData.js
│   ├── utils/
│   │   └── contentLoader.js   # Content loading utilities
│   ├── App.jsx                # Main app component
│   ├── data.js                # Static content data
│   ├── index.css              # Global styles + Shadcn/ui variables
│   └── main.jsx               # App entry point
├── components.json             # Shadcn/ui configuration
├── index.html                  # Main HTML template
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Enhanced Tailwind + Shadcn/ui config
├── vite.config.js              # Vite configuration
└── postcss.config.cjs          # PostCSS configuration
```

## 🎨 Design System

### **Brand Colors**
- **Primary Orange**: `#e0672b` (picktopia-orange)
- **Dark Blue**: `#082946` (picktopia-blue-dark)
- **Mid Blue**: `#1C275F` (picktopia-blue-mid)
- **Light Gray**: `#f3f4f6` (background)

### **Shadcn/ui Theme Integration**
- **CSS Variables**: Dynamic theming with HSL color system
- **Dark Mode**: Built-in dark mode support (class-based)
- **Semantic Colors**: Background, foreground, muted, accent, destructive
- **Border Radius**: Consistent `--radius` variable system

### **Typography System**
- **Heading Font**: Orbitron (futuristic, monospace)
- **Body Font**: Ubuntu (clean, readable)
- **Brand Font**: Orbitron (sci-fi brand elements)
- **Default**: Orbitron fallback system

### **Component Variants**
- **Buttons**: Primary, secondary, outline, ghost, picktopia variants
- **Cards**: Header, content, footer structure
- **Inputs**: Focus states, validation, accessibility
- **Tables**: Responsive, hover states, branded headers

## 🏗️ Architecture

### **Component Architecture**
```
Component Hierarchy:
├── Page Components (PlayCMS, HomePage, etc.)
├── Section Components (BookingSection, etc.)
├── UI Components (Button, Card, Input)
└── Utility Components (ContentTile, etc.)
```

### **Content Management Flow**
```
CMS Content Flow:
play.md (YAML + Markdown)
    ↓ (YAML parser)
Content Objects
    ↓ (Props)
Section Components
    ↓ (Render)
UI Components
```

### **Data Flow**

**Customized Pages (Direct Import):**
1. **Direct Import**: `import { pageData } from '../data/pageData'`
2. **Immediate Availability**: No async loading, content available instantly
3. **Component Rendering**: Direct prop passing to section components
4. **Performance**: No HTTP requests, no loading states

**CMS Pages (Async Loading):**
1. **CMS Loading**: Load content from markdown files via contentLoader
2. **Parsing**: YAML frontmatter parsed into structured objects
3. **Prop Passing**: Content passed as props to section components
4. **Component Rendering**: Sections render with CMS data
5. **Fallback**: Static content used when CMS unavailable

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd picktopia-website
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```
   *Note: `--legacy-peer-deps` is required due to React version conflicts with Decap CMS*

3. **Start development server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### **Dependencies**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "decap-cms-app": "^3.7.1",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.525.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## 📱 Pages & Navigation

### **Customized Pages (Direct Data Import)**
- **Home** (`HomePage.jsx`): Uses `homePageData.js` - Landing page with hero, features, FAQ, newsletter
- **About Us** (`AboutUsPage.jsx`): Uses `aboutUsData.js` - Club information with intro, features, closing
- **Group Bookings** (`GroupBookingsPage.jsx`): Uses `groupBookingData.js` - Event packages and booking
- **Partnerships** (`PartnershipsPage.jsx`): Uses `partnershipData.js` - Partnership packages and contact
- **Play Subpages**: Direct data imports for immediate loading
  - **Booking** (`BookingPage.jsx`): Uses `bookingData.js` - 3-step Court Reserve process  
  - **Program Schedule** (`ProgramSchedulePage.jsx`): Uses `programScheduleData.js` - Weekly schedule table
  - **Training Programs** (`TrainingProgramsPage.jsx`): Uses `trainingProgramsData.js` - Coaches, programs, testimonials
  - **Free Intro** (`FreePickleballIntroPage.jsx`): Uses `freePickleballIntroData.js` - Signup details

### **CMS Pages**
- **Locations** (`LocationsCMSPage.jsx`): Uses CMS content - All locations displayed as cards with full details
- **Events** (`EventCMSPage.jsx`): Individual event pages from CMS content
- **Events Listing** (`EventsPage.jsx`): All events listing page
- **Generic CMS** (`GenericCMS.jsx`): Template for simple CMS content
- **CMS Page Template** (`CMSPage.jsx`): Generic template for CMS-managed pages

### **Navigation Structure**
- Responsive header with mobile menu
- Announcement bar integration
- Page-specific routing system
- **Locations**: Single navigation link (no subpages) - all locations shown as cards on main page
- **Events**: Dynamic navigation with individual event pages

## 🔧 Content Management

### **CMS Integration**
Content is managed through Decap CMS and multiple systems:

#### **Decap CMS - Events, Locations & Announcements**
Events, locations, and announcements are **managed via Decap CMS**:

1. **Access CMS**: Navigate to `http://localhost:5173/admin/index.html` during development (authenticates with GitHub to edit repository content)
2. **Authentication**: GitHub OAuth integration
3. **Content Creation**: 
   - **Events**: Create individual events with date, location, image, description
   - **Locations**: Manage facility details, hours, amenities, booking URLs  
   - **Announcements**: Create announcements with different link types (none, internal, external, event)

#### **Announcement Link Types**
```yaml
# Announcement configuration in CMS
linkType: "event"           # Links to individual event page
link: "event-slug"          # Event slug for navigation

linkType: "internal"        # Links to internal page
link: "events"              # Page name (events, about-us, etc.)

linkType: "external"        # Links to external URL
link: "https://example.com" # Full URL

linkType: "none"            # No link (display only)
```

#### **Automated Manifest Generation**
When events or announcements are published via CMS, a **GitHub Action automatically**:
1. Detects changes in `src/content/events/` or `src/content/announcements/`
2. Runs `npm run generate-manifests` to update manifest files
3. Commits the updated manifests back to the repository
4. Updates navigation dynamically without manual intervention

**Workflow File**: `.github/workflows/update-manifests.yml`

#### **YAML Frontmatter + Markdown (Other Content)**
```yaml
# src/content/pages/play.md
---
title: "Play"
subtitle: "Your subtitle here"
heroImage: "/assets/image.jpg"
sections:
  - title: "Section Title"
    subtitle: "Section subtitle"
    bookingUrl: "https://booking-url.com"
    bookingText: "Custom Button Text"
    backgroundColor: "bg-custom-color"
    content: |
      ### Subsection
      Your markdown content here
---
```

#### **Static Content Fallback**
```javascript
// src/utils/contentLoader.js
export const getStaticContent = () => ({
  play: {
    title: "Play",
    sections: [...]
  }
});
```

### **Section Components**
Each section component accepts content props:
```javascript
<BookingSection content={bookingSection} />
<ProgramScheduleSection content={programSection} />
<TrainingProgramsSection content={trainingSection} />
<FreeIntroSection content={introSection} />
```

### **CMS Content Creation Workflow**

#### **For Events:**
1. **Access CMS** → Collections → Events → New Event
2. **Fill Required Fields:**
   - Event Name (title)
   - Date & Time
   - Location
   - Image upload
   - Description (markdown)
   - Registration Link (optional)
   - Price (optional)
3. **Publish** → Triggers automatic manifest generation
4. **Result**: Event appears in navigation and individual event page is accessible

#### **For Locations:**
1. **Access CMS** → Collections → Locations → Edit or Create Location
2. **Fill Location Details:**
   - Location Name
   - Address, phone, email
   - Court count
   - Facility image
   - Booking URL
   - Hours of operation (for each day)
   - Amenities list
   - Description (markdown)
3. **Publish** → Triggers automatic manifest generation
4. **Result**: Location appears as a card on the main locations page

#### **For Announcements:**
1. **Access CMS** → Collections → Announcements → New Announcement
2. **Configure Announcement:**
   - Title (internal reference)
   - Message (displayed text)
   - Link Type: Choose appropriate type
   - Link: Event slug, page name, or URL
   - Priority (higher numbers show first)
   - Active status
   - Start/End dates (optional)
3. **Publish** → Triggers automatic manifest generation
4. **Result**: Announcement appears in top bar with correct linking behavior

#### **Navigation Integration:**
- **Dynamic Loading**: Navigation system automatically loads events and announcements from manifests
- **No Manual Updates**: Content creators never need to manually update navigation
- **Real-time Updates**: New content appears after CMS publish + GitHub Action completion (~2-3 minutes)

## 🎛️ Configuration

### **Shadcn/ui Setup**
- `components.json`: Component configuration
- Custom variants for Picktopia branding
- CSS variables in `src/index.css`

### **Tailwind Configuration**
Enhanced `tailwind.config.js` includes:
- Shadcn/ui theme system
- Custom Picktopia colors
- Typography system (Orbitron, Ubuntu)
- Dark mode support
- Animation plugins

## ⚙️ Development Workflow

### **Adding New Sections**
1. Create section component in `src/components/sections/`
2. Add content structure to markdown file
3. Import and use in page component
4. Pass content as props

### **CMS Content Updates**
1. Edit `src/content/pages/*.md` files
2. Update YAML frontmatter structure
3. Content automatically loaded on page refresh
4. Fallback content available in `contentLoader.js`

### **UI Component Development**
```bash
# Add new Shadcn/ui components
npx shadcn@latest add [component-name]

# Custom components go in src/components/ui/
# Section-specific components in src/components/sections/
```

## 🔗 Booking System Integration

### **Court Reserve Integration**
- **Provider**: Court Reserve booking system
- **URLs**: Configurable per section via CMS
- **Sections**: 
  - Booking: Court reservations
  - Programs: Group activities
  - Training: Private lessons and clinics

### **Booking Button Configuration**
```yaml
bookingUrl: "https://app.courtreserve.com/picktopia/[type]"
bookingText: "Custom Button Text"
```

## 🚀 Deployment

The project builds to static files in the `dist/` directory and can be deployed to any static hosting service:

- **GitHub Pages**: Current deployment target with automated builds
- **Decap CMS**: Content management interface
- **Cloudflare Pages**: Alternative hosting option
- **Traditional Hosting**: Upload `dist/` folder contents

### **Build Process**
```bash
npm run build          # Production build
npm run preview        # Preview production build locally
npm run deploy         # Deploy to GitHub Pages
```

## 📄 Browser Support

- Chrome (latest) ✅
- Firefox (latest) ✅ 
- Safari (latest) ✅
- Edge (latest) ✅
- Mobile browsers ✅

## ✨ Recent Improvements

### **Version 2.0 - Professional UI & CMS Integration**
- ✅ **Shadcn/ui Integration**: Professional component library
- ✅ **CMS Architecture**: YAML frontmatter + Markdown content management
- ✅ **Section Components**: Reusable, prop-driven architecture
- ✅ **Booking Integration**: Court Reserve booking system
- ✅ **Form Components**: Intro signup with validation
- ✅ **Table Components**: Professional schedule display
- ✅ **Enhanced Styling**: Consistent design system

### **Technical Improvements**
- ✅ **Better Performance**: Optimized component structure
- ✅ **Accessibility**: Enhanced with Shadcn/ui standards
- ✅ **Maintainability**: Clean separation of content and code
- ✅ **Scalability**: Reusable components for future pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Use Shadcn/ui components for UI elements
- Follow the existing CMS content structure
- Create reusable section components
- Maintain accessibility standards
- Test responsive design

## 📝 License

This project is built for Picktopia Pickleball Club. All rights reserved.

## 📞 Contact

For questions about the website or club information:
- **Email**: info@picktopia.com
- **Phone**: (647) 478-9866
- **Address**: 3595 St Clair Ave E Toronto, ON M1K 1L8

### **Development Support**
For technical questions about the website development:
- Check the component documentation in `/src/components/`
- Review CMS content structure in `/src/content/pages/`
- See Shadcn/ui documentation for UI components

## 🔧 Development Improvement Suggestions

Based on the current project structure analysis, here are recommended improvements for better scalability and maintainability:

### **Priority 1: Core Architecture**

#### **1. Implement React Router**
- **Current Issue**: Manual state-based navigation in `App.jsx:10` using `useState('home')`
- **Solution**: Replace with React Router for proper URL routing and browser history
- **Benefits**: Better SEO, bookmarkable URLs, browser back/forward support
```bash
npm install react-router-dom
```

#### **2. Add TypeScript Support**
- **Current Issue**: JavaScript-only codebase lacks type safety
- **Solution**: Migrate to TypeScript, especially important with Shadcn/UI components
- **Benefits**: Better IDE support, compile-time error catching, improved maintainability

### **Priority 2: Performance & User Experience**

#### **3. Implement Code Splitting**
- **Current Issue**: All pages bundle together, increasing initial load time
- **Solution**: Use `React.lazy()` and `Suspense` for page components
- **Benefits**: Faster initial page load, better performance
```javascript
const HomePage = React.lazy(() => import('./pages/HomePage'));
```

#### **4. Add Error Boundaries**
- **Current Issue**: No error handling for component failures
- **Solution**: Implement React Error Boundaries
- **Benefits**: Better user experience when components fail

### **Priority 3: Development Experience**

#### **5. Set Up Testing Framework**
- **Current Issue**: No visible test setup
- **Solution**: Add Jest + React Testing Library
- **Benefits**: Prevent regressions, improve code quality
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

#### **6. Consider State Management**
- **Current Issue**: No centralized state management for growing app complexity
- **Solution**: Implement Context API or lightweight library like Zustand
- **Benefits**: Better state organization, easier debugging

### **Priority 4: Code Quality**

#### **7. Add Linting & Formatting**
- **Solution**: Set up ESLint, Prettier, and Husky pre-commit hooks
- **Benefits**: Consistent code style, catch common errors

#### **8. Environment Configuration**
- **Solution**: Add proper environment variable handling for different deployment targets
- **Benefits**: Better deployment flexibility, secure configuration management

### **Implementation Timeline**
1. **Week 1**: React Router migration
2. **Week 2**: TypeScript setup and basic types
3. **Week 3**: Code splitting and error boundaries
4. **Week 4**: Testing framework setup
5. **Week 5**: State management evaluation and implementation

### **Current Strengths to Maintain**
- ✅ Good component organization
- ✅ Proper Shadcn/UI integration
- ✅ CMS architecture with Decap CMS
- ✅ Responsive design system
- ✅ Modern build tools (Vite)

These improvements will enhance the project's scalability, maintainability, and developer experience while preserving the current well-structured foundation.

---

**Built with ❤️ for the Picktopia Pickleball Club community**