/**
 * Utility for mapping page names to URL slugs and vice versa.
 */

const ROUTE_MAP = {
    'home': '/',
    'join': '/join',
    'academy-training-programs': '/academy/training-programs',
    'academy-free-pickleball-intro': '/academy/free-pickleball-intro',
    'play-booking': '/play/booking',
    'play-program-schedule': '/play/program-schedule',
    'play-group-bookings': '/play/group-bookings',
    'events': '/events',
    'clubs': '/clubs',
    'about-about-us': '/about/about-us',
    'about-partnerships': '/about/partnerships',
    // Legacy/Alternative routes
    'about-us': '/about/about-us',
    'group-bookings': '/play/group-bookings',
    'partnerships': '/about/partnerships',
    'membership': '/join',
    'locations': '/clubs',
};

/**
 * Gets the URL path for a given page name.
 * @param {string} pageName - The internal page name (e.g., 'academy-training-programs')
 * @returns {string} The URL path (e.g., '/academy/training-programs')
 */
export const getUrlFromPage = (pageName) => {
    // Handle dynamic event routes
    if (pageName.startsWith('events-')) {
        const slug = pageName.replace('events-', '');
        return `/events/${slug}`;
    }

    return ROUTE_MAP[pageName] || '/';
};

/**
 * Gets the page name for a given URL path.
 * @param {string} path - The URL path (e.g., '/academy/training-programs')
 * @returns {string} The internal page name (e.g., 'academy-training-programs')
 */
export const getPageFromUrl = (path) => {
    // Remove query params and hash
    const cleanPath = path.split('?')[0].split('#')[0];
    
    // Remove trailing slash except for root
    const normalizedPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '');

    // Handle dynamic event routes
    if (normalizedPath.startsWith('/events/')) {
        const slug = normalizedPath.replace('/events/', '');
        return slug ? `events-${slug}` : 'events';
    }

    // Exact match search
    for (const [pageName, routePath] of Object.entries(ROUTE_MAP)) {
        if (routePath === normalizedPath) {
            return pageName;
        }
    }

    return 'home';
};

/**
 * Updates the browser URL without reloading the page.
 * @param {string} pageName - The internal page name
 */
export const updateUrl = (pageName) => {
    const url = getUrlFromPage(pageName);
    // Only push if different from current state to avoid duplicate history entries
    if (window.location.pathname !== url) {
        window.history.pushState({ page: pageName }, '', url);
    }
};
