// Simple frontmatter parser that works in browsers
const parseFrontmatter = (fileContent) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }
  
  const yamlContent = match[1];
  const markdownContent = match[2];
  
  // Simple YAML parser for our specific needs
  const frontmatter = {};
  const lines = yamlContent.split('\n');
  let currentKey = null;
  let currentValue = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    if (trimmed && !trimmed.startsWith('#')) {
      const colonIndex = trimmed.indexOf(':');
      
      if (colonIndex > 0 && !line.startsWith(' ') && !line.startsWith('\t')) {
        // Save previous key-value pair if exists
        if (currentKey) {
          frontmatter[currentKey] = currentValue.trim();
        }
        
        // Start new key-value pair
        currentKey = trimmed.substring(0, colonIndex).trim();
        currentValue = trimmed.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        if ((currentValue.startsWith('"') && currentValue.endsWith('"')) || 
            (currentValue.startsWith("'") && currentValue.endsWith("'"))) {
          currentValue = currentValue.slice(1, -1);
        }
      } else if (currentKey && (line.startsWith(' ') || line.startsWith('\t'))) {
        // This is a continuation of the previous value (multi-line)
        currentValue += ' ' + trimmed;
      }
    }
  }
  
  // Save the last key-value pair
  if (currentKey) {
    frontmatter[currentKey] = currentValue.trim();
  }
  
  return { frontmatter, content: markdownContent };
};

// Utility function to load and parse markdown content
export const loadContent = async (filePath) => {
  try {
    const response = await fetch(filePath);
    
    if (!response.ok) {
      return null;
    }
    
    const fileContent = await response.text();
    const { frontmatter, content } = parseFrontmatter(fileContent);
    
    return {
      frontmatter,
      content
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

// Load subpage content
export const loadSubpageContent = async (parentPage, subpageName) => {
  return await loadContent(`/src/content/pages/${parentPage}/${subpageName}.md`);
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

// Load Locations for navigation
export const loadLocationsForNav = async () => {
  try {
    // Load location slugs from manifest file
    const manifestResponse = await fetch('/src/content/locations/manifest.json');
    let locationSlugs = [];
    
    if (manifestResponse.ok) {
      locationSlugs = await manifestResponse.json();
    } else {
      // Fallback to empty array if manifest doesn't exist
      console.log('Locations manifest not found, showing main page only');
      return [];
    }
    
    const locations = [];
    
    for (const slug of locationSlugs) {
      try {
        const locationContent = await loadContent(`/src/content/locations/${slug}.md`);
        if (locationContent && locationContent.frontmatter.title) {
          locations.push({
            slug: slug,
            title: locationContent.frontmatter.title
          });
        }
      } catch (error) {
        // Location file doesn't exist, skip
        console.log(`Location ${slug} not found, skipping`);
      }
    }
    
    return locations;
  } catch (error) {
    console.error('Error loading locations for navigation:', error);
    return [];
  }
};

// Load Events for navigation
export const loadEventsForNav = async () => {
  try {
    // Load event slugs from manifest file
    const manifestResponse = await fetch('/src/content/events/manifest.json');
    let eventSlugs = [];
    
    if (manifestResponse.ok) {
      eventSlugs = await manifestResponse.json();
    } else {
      // Fallback to known events if manifest doesn't exist
      eventSlugs = ['late-summer-bbq'];
    }
    
    const events = [];
    
    for (const slug of eventSlugs) {
      try {
        const eventContent = await loadContent(`/src/content/events/${slug}.md`);
        if (eventContent && eventContent.frontmatter.title) {
          events.push({
            slug: slug,
            title: eventContent.frontmatter.title
          });
        }
      } catch (error) {
        // Event file doesn't exist, skip
        console.log(`Event ${slug} not found, skipping`);
      }
    }
    
    return events;
  } catch (error) {
    console.error('Error loading events for navigation:', error);
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
    

    "group-bookings": {
      title: "Host Your Next Event at Picktopia!",
      subtitle: "Looking for a unique and active venue for your next party or corporate gathering? Look no further! Picktopia offers a fun and engaging environment perfect for any occasion.",
      heroImage: "/assets/place-holder.jpg",
      whyBookWithUs: {
        title: "Why Book Your Event With Us?",
        benefits: [
          {
            title: "A Unique & Memorable Experience",
            description: "Move beyond the standard event venues. A pickleball party is an interactive and memorable way to celebrate, encouraging connection and friendly competition."
          },
          {
            title: "Excellent for Team Building",
            description: "Foster communication, teamwork, and camaraderie. Pickleball is a fantastic way to bring colleagues, friends, or family together in a dynamic and social setting."
          },
          {
            title: "Inclusive Fun for Everyone",
            description: "Pickleball's easy learning curve makes it perfect for all ages and skill levels. From complete beginners to seasoned players, everyone can join in on the fun."
          },
          {
            title: "Promote an Active Lifestyle",
            description: "Host an event that's not only enjoyable but also promotes health and wellness. It's a great way to get everyone moving and having a good time."
          }
        ]
      },
      eventPackages: {
        title: "Our Event Packages",
        subtitle: "We offer flexible options to suit your group's needs, from casual get-togethers to full-facility buyouts.",
        packages: [
          {
            title: "Corporate Events",
            description: "Energize your team with a corporate outing at Picktopia! Perfect for team-building, holiday parties, or client appreciation events. We provide a refreshing alternative to the typical corporate function, with options for organized play, lessons, and catering to make your event both productive and fun.",
            image: "/assets/place-holder.jpg",
            features: [
              "Team-building activities",
              "Holiday parties",
              "Client appreciation events",
              "Organized play sessions",
              "Professional coaching available",
              "Catering coordination"
            ]
          },
          {
            title: "Social Parties & Celebrations",
            description: "Birthdays, anniversaries, bachelor/bachelorette parties, or just a fun weekend activity with friends! Our facility provides the perfect backdrop for any celebration. You can bring your own food and decorations to personalize your event.",
            image: "/assets/place-holder.jpg",
            features: [
              "Birthday parties",
              "Anniversary celebrations",
              "Bachelor/bachelorette parties",
              "Weekend group activities",
              "Custom decorations allowed",
              "Bring your own food & drinks"
            ]
          }
        ]
      },
      facilities: {
        title: "Our Facilities & Add-Ons",
        subtitle: "Everything you need to make your event memorable and successful.",
        items: [
          {
            title: "Premium Courts",
            description: "Multiple, well-maintained pickleball courts.",
            icon: "🏓"
          },
          {
            title: "Lounge & Party Area",
            description: "Dedicated space for your group to relax, socialize, and celebrate between games.",
            icon: "🛋️"
          },
          {
            title: "Flexible Catering",
            description: "Bring your own food and drinks, or let us help you coordinate with local catering services.",
            icon: "🍽️"
          },
          {
            title: "Equipment Rentals",
            description: "We provide paddles and balls for all your guests.",
            icon: "🏓"
          },
          {
            title: "Professional Coaching",
            description: "Add a \"Learn to Play\" session with one of our certified instructors to get everyone started.",
            icon: "👨‍🏫"
          }
        ],
        facilitiesImage: "/assets/place-holder.jpg"
      },
      bookingProcess: {
        title: "How to Book Your Event",
        subtitle: "Ready to get the ball rolling? Here's how easy it is to book your group event with us.",
        callToAction: "Ready to get the ball rolling? Fill out our inquiry form below to start planning your event!",
        steps: [
          {
            step: "1",
            title: "Submit an Inquiry",
            description: "Fill out our group booking form below with your event details. The more information you provide, the better we can tailor a package for you."
          },
          {
            step: "2",
            title: "Receive a Custom Quote",
            description: "Our events team will review your request and get back to you within 48 hours with a customized quote and availability."
          },
          {
            step: "3",
            title: "Confirm Your Booking",
            description: "To finalize your event, a signed agreement and a 50% non-refundable deposit are required. The remaining balance is due 14 days prior to your event date."
          }
        ]
      },
      faq: {
        title: "Frequently Asked Questions",
        questions: [
          {
            question: "How far in advance should I book my event?",
            answer: "We recommend booking at least 4-6 weeks in advance, especially for larger groups or weekend dates, to ensure court availability."
          },
          {
            question: "Can we bring our own decorations?",
            answer: "Absolutely! You are welcome to arrive 20-30 minutes before your scheduled start time to set up decorations in your designated party area."
          },
          {
            question: "What is your cancellation policy?",
            answer: "The 50% deposit is non-refundable. If you need to reschedule, please contact us at least 14 days before your event, and we will do our best to accommodate a new date based on availability."
          },
          {
            question: "Do you serve alcohol?",
            answer: "While we are not a licensed venue, we can assist in securing a Special Occasion Permit for full-facility buyouts. Please mention this in your inquiry form for more details."
          }
        ]
      },
      contact: {
        title: "Still Have Questions?",
        subtitle: "Our events team is here to help you plan the perfect group experience.",
        email: "events@picktopia.com",
        phone: "(555) 123-PICK"
      }
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
  loadSubpageContent,
  loadSettings,
  loadCollectionContent,
  getStaticContent
};