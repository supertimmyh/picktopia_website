import matter from 'gray-matter';

// Utility function to load and parse markdown content
export const loadContent = async (filePath) => {
  try {
    // In a real implementation, you'd use fetch or import
    // For now, we'll return mock data structure
    const response = await fetch(filePath);
    const fileContent = await response.text();
    const { data, content } = matter(fileContent);
    
    return {
      frontmatter: data,
      content: content
    };
  } catch (error) {
    console.error(`Error loading content from ${filePath}:`, error);
    return null;
  }
};

// Load page content
export const loadPageContent = async (pageName) => {
  return await loadContent(`/src/content/pages/${pageName}.md`);
};

// Load settings
export const loadSettings = async (settingName) => {
  return await loadContent(`/src/content/settings/${settingName}.md`);
};

// Load all content from a folder
export const loadCollectionContent = async (collectionName) => {
  try {
    // This would need to be implemented with a build-time process
    // or a custom webpack loader to bundle all markdown files
    console.log(`Loading collection: ${collectionName}`);
    return [];
  } catch (error) {
    console.error(`Error loading collection ${collectionName}:`, error);
    return [];
  }
};

// Alternative approach: Pre-built content imports
// This approach imports the content at build time
export const getStaticContent = () => {
  return {
    about: {
      title: "About Us",
      subtitle: "Picktopia – Your Utopia for Pickleball.",
      heroImage: "/assets/place-holder.jpg",
      intro: `At Picktopia Pickleball Club, we're more than just a place to play — we're a **vibrant, inclusive, and social community** built around the fastest-growing sport in North America.

Founded in Toronto, Picktopia was created with one goal in mind: to make pickleball **accessible**, exciting, and welcoming for players of all levels. Whether you're picking up a paddle for the first time or you're a seasoned competitor, you'll find your place at Picktopia.`,
      whatWeOffer: {
        title: "What We Offer",
        features: [
          "**Premium indoor courts** with extended hours so you can play year-round, rain or shine",
          "**Accessible court rentals and drop-in sessions** for casual players",
          "**Membership options** with exclusive perks and early access to bookings",
          "**Social events, leagues, and tournaments** that bring our growing community together",
          "**Training programs** for players looking to improve their game in a fun and supportive environment"
        ]
      },
      closing: `We believe pickleball should be **fun, friendly, and full of energy** — and that's exactly the spirit you'll find when you walk into Picktopia.

Whether you're here to rally, compete, or simply connect with others, you're always welcome in our community.

**Picktopia is where pickleball meets your perfect place to play.**  
**This is more than a club — it's your pickleball utopia.**`
    },
    
    play: {
      title: "Play",
      subtitle: "Experience World-Class Pickleball",
      heroImage: "/assets/place-holder.jpg",
      body: `## Court Rentals

Our premium indoor courts are available for hourly rentals, perfect for casual play or serious practice sessions.

## Drop-In Sessions

Join our scheduled drop-in sessions to meet new players and enjoy games at your skill level.

## Leagues & Tournaments

Compete in our organized leagues or participate in tournaments throughout the year.

## Training Programs

Improve your game with our professional coaching and training programs designed for all skill levels.`
    },

    "group-bookings": {
      title: "Group Bookings",
      subtitle: "Perfect for Teams, Events & Corporate Outings",
      heroImage: "/assets/place-holder.jpg",
      body: `## Corporate Events

Bring your team together with an exciting pickleball experience. Perfect for team building and corporate entertainment.

## Birthday Parties

Celebrate your special day with friends and family on our premium courts. We'll help make your party unforgettable.

## Tournament Hosting

Host your own tournament at our facility with professional-grade courts and amenities.

## Special Rates

Contact us for special group pricing and customized packages for your event.`
    },

    locations: {
      title: "Locations",
      subtitle: "Find Your Nearest Picktopia Club",
      heroImage: "/assets/place-holder.jpg",
      body: `## Toronto Location

Our flagship location in the heart of Toronto features state-of-the-art indoor courts and full amenities.

**Address:** Coming Soon  
**Hours:** 6:00 AM - 11:00 PM Daily  
**Courts:** 8 Premium Indoor Courts

## Future Locations

We're expanding across the GTA! Stay tuned for announcements about new locations in:

- Mississauga
- Vaughan
- Markham
- Brampton

**Get notified** when we open in your area by signing up for our newsletter.`
    },

    sponsorships: {
      title: "Sponsorships",
      subtitle: "Partner with Picktopia",
      heroImage: "/assets/place-holder.jpg",
      body: `## Partnership Opportunities

Join us in growing the pickleball community across the GTA. We offer various sponsorship packages to fit your business needs.

## Tournament Sponsorship

Sponsor our tournaments and leagues to get your brand in front of our active community members.

## Facility Sponsorship

Partner with us for naming rights and premium visibility at our locations.

## Community Events

Support our community events and social gatherings while building brand awareness.

## Contact Us

Ready to explore partnership opportunities? Contact our sponsorship team to discuss how we can work together.`
    }
  };
};

export default {
  loadContent,
  loadPageContent,
  loadSettings,
  loadCollectionContent,
  getStaticContent
};