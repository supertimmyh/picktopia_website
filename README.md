# Picktopia Pickleball Club Website

A modern, responsive website for Picktopia Pickleball Club built with React, Vite, and Tailwind CSS. Features a clean design with an orange and dark blue color scheme that matches the club's branding.

## 🏓 Features

- **Modern Design**: Clean, professional layout with custom orange (#e1672a) and dark blue theme
- **Responsive**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Interactive Components**: 
  - Rotating announcement bar with eye-catching animations
  - Collapsible FAQ accordion sections
  - Mobile-friendly navigation menu
  - Newsletter subscription form
- **Hero Section**: Stunning background image with proper masking for optimal text readability
- **Blog Grid**: Display latest posts with placeholder images
- **Contact Information**: Footer with contact details and social media links

## 🚀 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: JavaScript (ES6+)
- **Font**: Inter (Google Fonts)

## 📁 Project Structure

```
picktopia-website/
├── public/
│   ├── index.html
│   └── logo_simplified.svg     # Favicon
├── src/
│   ├── assets/
│   │   ├── hero-image.jpeg     # Hero section background
│   │   └── logo_simplified.svg # Navigation logo
│   ├── components/
│   │   ├── AccordionItem.jsx   # FAQ accordion component
│   │   ├── AnnouncementBar.jsx # Top announcement banner
│   │   ├── FaqSection.jsx      # FAQ section with accordions
│   │   ├── Footer.jsx          # Site footer
│   │   ├── Header.jsx          # Navigation header
│   │   ├── HeroSection.jsx     # Main hero section
│   │   ├── Icons.jsx           # SVG icon components
│   │   ├── LatestBlogPosts.jsx # Blog posts grid
│   │   ├── Newsletter.jsx      # Email subscription
│   │   └── WhatIsPicktopia.jsx # Features section
│   ├── pages/
│   │   ├── GenericPage.jsx     # Template for other pages
│   │   └── HomePage.jsx        # Main homepage
│   ├── App.jsx                 # Main app component
│   ├── data.js                 # CMS data simulation
│   ├── index.css               # Global styles
│   └── main.jsx                # App entry point
├── index.html                  # Main HTML template
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Vite configuration
└── postcss.config.cjs          # PostCSS configuration
```

## 🎨 Design System

### Colors
- **Primary Orange**: `#e1672a` (from logo)
- **Dark Blue**: `#0F1744` (backgrounds)
- **Mid Blue**: `#1C275F` (secondary elements)
- **White**: Text and accents

### Typography
- **Font Family**: Inter (sans-serif)
- **Headings**: Bold, high-contrast
- **Body Text**: Clean, readable sizing

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd picktopia-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

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

## 📱 Pages & Navigation

- **Home**: Main landing page with all sections
- **About Us**: Club information (placeholder)
- **Play**: Court booking and play information (placeholder)
- **Group Bookings**: Group event bookings (placeholder)
- **Locations**: Club locations (placeholder)
- **Sponsorships**: Partnership opportunities (placeholder)

## 🔧 Configuration

### Content Management
All content is managed through `src/data.js` which simulates a headless CMS structure:
- Announcements
- Navigation links
- Hero section content
- Feature descriptions
- FAQ questions and answers
- Blog posts
- Newsletter content
- Footer information

### Styling
Custom Tailwind configuration in `tailwind.config.js` includes:
- Custom color palette
- Inter font family
- Extended theme options

## 🚀 Deployment

The project builds to static files in the `dist/` directory and can be deployed to any static hosting service:

- **Decap**: Connect your GitHub repo for automatic deployments
- **Cloudflare Pages**: Import project for seamless deployment
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Traditional Hosting**: Upload `dist/` folder contents

## 📄 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is built for Picktopia Pickleball Club. All rights reserved.

## 📞 Contact

For questions about the website or club information:
- **Email**: info@picktopia.com
- **Phone**: (647) 478-9866
- **Address**: 3595 St Clair Ave E Toronto, ON M1K 1L8

---

**Built with ❤️ for the Picktopia Pickleball Club community**