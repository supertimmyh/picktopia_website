/**
 * Utility for mapping page names to URL slugs and vice versa.
 */

const ROUTE_MAP = {
    'home': '/',
    'featured-programs': '/programs',
    'programs': '/programs',
    'play': '/play',
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
    'locations': '/clubs',
};

const LOCATION_ROUTE_SECTIONS = ['booking', 'schedule', 'training', 'membership'];
const MEMBERSHIP_SIGNUP_ROUTE_SECTION = 'membership-signup';
export const DEFAULT_LOCATION_ID = 'scarborough';

export const getLocationPageName = (locationId = DEFAULT_LOCATION_ID, section = null) => {
    return section ? `clubs-${locationId}-${section}` : `clubs-${locationId}`;
};

export const parseLocationPage = (pageName) => {
    if (!pageName || !pageName.startsWith('clubs-')) {
        return null;
    }

    const clubPath = pageName.replace('clubs-', '');
    const section = LOCATION_ROUTE_SECTIONS.find((routeSection) => clubPath.endsWith(`-${routeSection}`));

    if (!section) {
        return {
            locationId: clubPath || DEFAULT_LOCATION_ID,
            section: null
        };
    }

    return {
        locationId: clubPath.replace(new RegExp(`-${section}$`), '') || DEFAULT_LOCATION_ID,
        section
    };
};

export const getMembershipSignupPageName = (locationId = DEFAULT_LOCATION_ID, membershipSlug = '') => {
    return `clubs-${locationId}-${MEMBERSHIP_SIGNUP_ROUTE_SECTION}-${membershipSlug}`;
};

export const parseMembershipSignupPage = (pageName) => {
    if (!pageName || !pageName.startsWith('clubs-')) {
        return null;
    }

    const marker = `-${MEMBERSHIP_SIGNUP_ROUTE_SECTION}-`;
    const clubPath = pageName.replace('clubs-', '');
    const markerIndex = clubPath.indexOf(marker);

    if (markerIndex === -1) {
        return null;
    }

    return {
        locationId: clubPath.slice(0, markerIndex) || DEFAULT_LOCATION_ID,
        membershipSlug: clubPath.slice(markerIndex + marker.length)
    };
};

export const getLocationFromPage = (pageName) => {
    const membershipSignupRoute = parseMembershipSignupPage(pageName);

    if (membershipSignupRoute?.locationId) {
        return membershipSignupRoute.locationId;
    }

    const parsedLocation = parseLocationPage(pageName);

    if (parsedLocation?.locationId) {
        return parsedLocation.locationId;
    }

    return null;
};

/**
 * Gets the URL path for a given page name.
 * @param {string} pageName - The internal page name (e.g., 'academy-training-programs')
 * @returns {string} The URL path (e.g., '/academy/training-programs')
 */
export const getUrlFromPage = (pageName) => {
    if (pageName === 'join' || pageName === 'membership') {
        return '/clubs';
    }

    if (pageName === 'academy' || pageName === 'academy-training-programs' || pageName === 'play-training-programs') {
        return '/programs';
    }

    // Handle dynamic event routes
    if (pageName.startsWith('events-')) {
        const slug = pageName.replace('events-', '');
        return `/events/${slug}`;
    }

    const membershipSignupRoute = parseMembershipSignupPage(pageName);
    if (membershipSignupRoute) {
        return `/clubs/${membershipSignupRoute.locationId}/${MEMBERSHIP_SIGNUP_ROUTE_SECTION}/${membershipSignupRoute.membershipSlug}`;
    }

    const locationRoute = parseLocationPage(pageName);
    if (locationRoute) {
        const suffix = locationRoute.section ? `/${locationRoute.section}` : '';
        return `/clubs/${locationRoute.locationId}${suffix}`;
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

    if (normalizedPath.startsWith('/clubs/')) {
        const [, , locationId, section, membershipSlug] = normalizedPath.split('/');

        if (section === MEMBERSHIP_SIGNUP_ROUTE_SECTION) {
            return getMembershipSignupPageName(locationId || DEFAULT_LOCATION_ID, membershipSlug || '');
        }

        if (LOCATION_ROUTE_SECTIONS.includes(section)) {
            return getLocationPageName(locationId || DEFAULT_LOCATION_ID, section);
        }

        return getLocationPageName(locationId || DEFAULT_LOCATION_ID);
    }

    if (normalizedPath === '/join') {
        return 'clubs';
    }

    if (normalizedPath === '/academy' || normalizedPath === '/academy/training-programs') {
        return 'featured-programs';
    }

    if (normalizedPath === '/featured-programs') {
        return 'featured-programs';
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
