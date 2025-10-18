import { getAssetPath } from './assetPath';

// Enhanced frontmatter parser that works in browsers and supports arrays/objects
const parseFrontmatter = (fileContent) => {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  
  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }
  
  const yamlContent = match[1];
  const markdownContent = match[2];
  
  // Enhanced YAML parser for arrays and objects
  const frontmatter = {};
  const lines = yamlContent.split('\n');
  
  const parseValue = (value) => {
    const trimmed = value.trim();
    
    // Handle quoted strings
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
        (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
    
    // Handle booleans
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    
    // Handle numbers
    if (!isNaN(trimmed) && trimmed !== '') {
      return parseFloat(trimmed);
    }
    
    return trimmed;
  };
  
  const parseArray = (startIndex, indentLevel) => {
    const array = [];
    let i = startIndex;
    
    while (i < lines.length) {
      const line = lines[i];
      const currentIndent = line.length - line.trimStart().length;
      
      if (currentIndent < indentLevel) {
        break;
      }
      
      const trimmed = line.trim();
      if (trimmed.startsWith('- ')) {
        const value = trimmed.substring(2);
        if (value.includes(':')) {
          // This is an object in the array
          const obj = {};
          const objIndent = currentIndent + 2;
          
          // Parse the first key-value pair
          const colonIndex = value.indexOf(':');
          const key = value.substring(0, colonIndex).trim();
          const val = value.substring(colonIndex + 1).trim();
          
          if (val) {
            obj[key] = parseValue(val);
          }
          
          // Parse remaining object properties
          i++;
          while (i < lines.length) {
            const objLine = lines[i];
            const objLineIndent = objLine.length - objLine.trimStart().length;
            
            if (objLineIndent < objIndent || (objLineIndent === currentIndent && objLine.trim().startsWith('- '))) {
              i--;
              break;
            }
            
            const objTrimmed = objLine.trim();
            if (objTrimmed && objTrimmed.includes(':')) {
              const objColonIndex = objTrimmed.indexOf(':');
              const objKey = objTrimmed.substring(0, objColonIndex).trim();
              const objVal = objTrimmed.substring(objColonIndex + 1).trim();
              
              if (objVal.startsWith('[') && objVal.endsWith(']')) {
                // Handle inline arrays like ["item1", "item2"]
                const arrayContent = objVal.slice(1, -1);
                obj[objKey] = arrayContent.split(',').map(item => 
                  parseValue(item.trim())
                );
              } else if (!objVal) {
                // This might be a nested array
                const nextObjIndex = i + 1;
                if (nextObjIndex < lines.length) {
                  const nextObjLine = lines[nextObjIndex];
                  const nextObjTrimmed = nextObjLine.trim();
                  
                  if (nextObjTrimmed.startsWith('- ')) {
                    // This is a nested array
                    const nestedIndentLevel = nextObjLine.length - nextObjLine.trimStart().length;
                    const nestedResult = parseArray(nextObjIndex, nestedIndentLevel);
                    obj[objKey] = nestedResult.array;
                    i = nestedResult.nextIndex - 1;
                  }
                }
              } else {
                obj[objKey] = parseValue(objVal);
              }
            }
            
            i++;
          }
          
          array.push(obj);
        } else {
          // This is a simple string value in the array
          array.push(parseValue(value));
        }
      } else if (currentIndent === indentLevel && trimmed && !trimmed.startsWith('#')) {
        // Handle array items that might not start with '- ' but are at the same indent level
        // This shouldn't happen in proper YAML but let's be defensive
        break;
      }
      
      i++;
    }
    
    return { array, nextIndex: i };
  };
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed && !trimmed.startsWith('#') && !line.startsWith(' ') && !line.startsWith('\t')) {
      const colonIndex = trimmed.indexOf(':');

      if (colonIndex > 0) {
        const key = trimmed.substring(0, colonIndex).trim();
        const value = trimmed.substring(colonIndex + 1).trim();

        // Handle multi-line strings with >- or > or |- or |
        if (value === '>-' || value === '>' || value === '|-' || value === '|') {
          const multilineContent = [];
          let j = i + 1;

          // Get the base indentation level from the first content line
          let baseIndent = -1;

          while (j < lines.length) {
            const contentLine = lines[j];
            const contentIndent = contentLine.length - contentLine.trimStart().length;

            // First non-empty line sets the base indentation
            if (baseIndent === -1 && contentLine.trim()) {
              baseIndent = contentIndent;
            }

            // Stop when we reach a line with less indentation than base (new key)
            if (contentLine.trim() && contentIndent < baseIndent) {
              break;
            }

            // Stop if we reach a non-indented line with a colon (new top-level key)
            if (contentIndent === 0 && contentLine.trim() && contentLine.includes(':')) {
              break;
            }

            // Add the line content (preserving relative indentation)
            if (contentLine.trim() || multilineContent.length > 0) {
              multilineContent.push(contentLine.substring(baseIndent) || '');
            }

            j++;
          }

          // Join lines based on the fold style
          if (value.startsWith('>')) {
            // Folded style: newlines become spaces, blank lines separate paragraphs
            let result = multilineContent.join('\n').trim();
            frontmatter[key] = result;
          } else {
            // Literal style (|): preserve all newlines
            frontmatter[key] = multilineContent.join('\n').trim();
          }

          i = j - 1;
        } else if (!value) {
          // This might be an array or object
          const nextLineIndex = i + 1;
          if (nextLineIndex < lines.length) {
            const nextLine = lines[nextLineIndex];
            const nextTrimmed = nextLine.trim();

            if (nextTrimmed.startsWith('- ')) {
              // This is an array
              const indentLevel = nextLine.length - nextLine.trimStart().length;
              const result = parseArray(nextLineIndex, indentLevel);
              frontmatter[key] = result.array;
              i = result.nextIndex - 1;
            } else if (nextLine.startsWith('  ') && nextTrimmed.includes(':')) {
              // This is a nested object
              const nestedObject = {};
              let j = nextLineIndex;
              const expectedIndent = nextLine.length - nextLine.trimStart().length;

              while (j < lines.length) {
                const nestedLine = lines[j];
                const nestedTrimmed = nestedLine.trim();
                const currentIndent = nestedLine.length - nestedLine.trimStart().length;

                // Stop if we reach a line that's not indented at the expected level
                if (currentIndent < expectedIndent || (currentIndent === 0 && nestedTrimmed)) {
                  break;
                }

                if (currentIndent === expectedIndent && nestedTrimmed.includes(':')) {
                  const nestedColonIndex = nestedTrimmed.indexOf(':');
                  const nestedKey = nestedTrimmed.substring(0, nestedColonIndex).trim();
                  const nestedValue = nestedTrimmed.substring(nestedColonIndex + 1).trim();
                  nestedObject[nestedKey] = parseValue(nestedValue);
                }

                j++;
              }

              frontmatter[key] = nestedObject;
              i = j - 1;
            }
          }
        } else {
          frontmatter[key] = parseValue(value);
        }
      }
    }

    i++;
  }
  
  return { frontmatter, content: markdownContent };
};

// Utility function to load and parse markdown content
// Process asset paths in content
const processAssetPaths = (obj) => {
  if (typeof obj === 'string') {
    // If it's a string that looks like an asset path, process it
    if (obj.startsWith('/images/') || obj.startsWith('/assets/') || obj.startsWith('/content/')) {
      return getAssetPath(obj);
    }
    // Also process markdown content with image paths
    return obj.replace(/!\[([^\]]*)\]\(\/images\/([^)]+)\)/g, (match, alt, path) => {
      return `![${alt}](${getAssetPath(`/images/${path}`)})`;
    });
  } else if (Array.isArray(obj)) {
    return obj.map(processAssetPaths);
  } else if (obj && typeof obj === 'object') {
    const processed = {};
    for (const key in obj) {
      processed[key] = processAssetPaths(obj[key]);
    }
    return processed;
  }
  return obj;
};

export const loadContent = async (filePath) => {
  try {
    const response = await fetch(getAssetPath(filePath));
    
    if (!response.ok) {
      return null;
    }
    
    const fileContent = await response.text();
    const { frontmatter, content } = parseFrontmatter(fileContent);
    
    // Process asset paths in both frontmatter and content
    const processedFrontmatter = processAssetPaths(frontmatter);
    const processedContent = processAssetPaths(content);
    
    return {
      frontmatter: processedFrontmatter,
      content: processedContent
    };
  } catch (error) {
    console.error(`Error loading content from ${filePath}:`, error);
    return null;
  }
};

// Load page content
export const loadPageContent = async (pageName) => {
  return await loadContent(`/content/pages/${pageName}.md`);
};

// Load subpage content
export const loadSubpageContent = async (parentPage, subpageName) => {
  return await loadContent(`/content/pages/${parentPage}/${subpageName}.md`);
};

// Load settings
export const loadSettings = async (settingName) => {
  return await loadContent(`/content/settings/${settingName}.md`);
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
    const manifestResponse = await fetch(getAssetPath('/content/locations/manifest.json'));
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
        const locationContent = await loadContent(`/content/locations/${slug}.md`);
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
    const manifestResponse = await fetch(getAssetPath('/content/events/manifest.json'));
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
        const eventContent = await loadContent(`/content/events/${slug}.md`);
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

// Load Events with optional limit and sorting
export const loadEvents = async ({ limit = null, sortByDate = false } = {}) => {
  try {
    // Load event slugs from manifest file
    const manifestResponse = await fetch(getAssetPath('/content/events/manifest.json'));
    let eventSlugs = [];
    
    if (manifestResponse.ok) {
      eventSlugs = await manifestResponse.json();
    } else {
      // Fallback to known events if manifest doesn't exist
      eventSlugs = ['inauguration-tournament', 'late-summer-bbq'];
    }
    
    const events = [];
    
    for (const slug of eventSlugs) {
      try {
        const eventContent = await loadContent(`/content/events/${slug}.md`);
        if (eventContent && eventContent.frontmatter) {
          events.push({
            slug: slug,
            title: eventContent.frontmatter.title,
            date: eventContent.frontmatter.date,
            location: eventContent.frontmatter.location,
            image: eventContent.frontmatter.image || getAssetPath('/images/uploads/place-holder.jpg'),
            description: eventContent.frontmatter.description,
            registrationLink: eventContent.frontmatter.registrationLink,
            price: eventContent.frontmatter.price
          });
        }
      } catch (error) {
        // Event file doesn't exist, skip
        console.log(`Event ${slug} not found, skipping`);
      }
    }
    
    let processedEvents = events;
    
    // Sort by date if requested (newest first)
    if (sortByDate) {
      processedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Apply limit if specified
    if (limit && limit > 0) {
      processedEvents = processedEvents.slice(0, limit);
    }
    
    return processedEvents;
  } catch (error) {
    console.error('Error loading events:', error);
    return [];
  }
};

// Convenience functions for backward compatibility
export const loadAllEvents = async () => loadEvents();
export const loadLatestEvents = async (limit = 3) => loadEvents({ limit, sortByDate: true });

// Load Active Announcements
export const loadActiveAnnouncements = async () => {
  try {
    // Load announcement slugs from manifest file
    const manifestResponse = await fetch(getAssetPath('/content/announcements/manifest.json'));
    let announcementSlugs = [];
    
    if (manifestResponse.ok) {
      announcementSlugs = await manifestResponse.json();
    } else {
      // Return empty array if no announcements
      return [];
    }
    
    const announcements = [];
    const now = new Date();
    
    for (const slug of announcementSlugs) {
      try {
        const announcementContent = await loadContent(`/content/announcements/${slug}.md`);
        if (announcementContent && announcementContent.frontmatter) {
          const announcement = announcementContent.frontmatter;
          
          // Check if announcement is active
          if (!announcement.active) continue;
          
          // Check date range
          const startDate = announcement.startDate ? new Date(announcement.startDate) : null;
          const endDate = announcement.endDate ? new Date(announcement.endDate) : null;
          
          if (startDate && now < startDate) continue;
          if (endDate && now > endDate) continue;
          
          announcements.push({
            slug: slug,
            title: announcement.title,
            message: announcement.message,
            linkType: announcement.linkType || 'none',
            link: announcement.link,
            priority: announcement.priority || 1,
            active: announcement.active
          });
        }
      } catch (error) {
        // Announcement file doesn't exist, skip
        console.log(`Announcement ${slug} not found, skipping`);
      }
    }
    
    // Sort by priority (highest first)
    return announcements.sort((a, b) => (b.priority || 1) - (a.priority || 1));
  } catch (error) {
    console.error('Error loading announcements:', error);
    return [];
  }
};

// Alternative approach: Pre-built content imports
// This approach imports the content at build time
export const getStaticContent = () => {
  return {

    locations: {
      title: "Locations",
      subtitle: "Find Your Nearest Picktopia Club",
      heroImage: "/assets/place-holder.jpg",
      body: `## Toronto Location

Our flagship location in the heart of Toronto features state-of-the-art indoor courts and full amenities.

**Address:** Coming Soon  
**Hours:** 6:00 AM - 11:00 PM Daily  
**Courts:** Premium Indoor Courts with Professional Hard Surface

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