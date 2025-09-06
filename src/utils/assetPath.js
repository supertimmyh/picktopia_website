// Utility to handle asset paths with flexible deployment support
const getBasePath = () => {
  if (!import.meta.env.PROD) {
    return ''; // Development mode - no base path needed
  }
  
  // Smart domain detection for production
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // GitHub Pages subdirectory deployment
    if (hostname.includes('github.io') && !hostname.includes('picktopia')) {
      return '/picktopia_website';
    }
    
    // Custom domain or GitHub Pages with custom domain - use root
    return '';
  }
  
  // Fallback for server-side rendering or when window is unavailable
  return import.meta.env.BASE_URL || '';
};

export const getAssetPath = (path) => {
  // If path already has base path or is external, return as-is
  if (path.startsWith('http') || path.startsWith('/picktopia_website/')) {
    return path;
  }
  
  // Prepend base path for production
  const basePath = getBasePath();
  return `${basePath}${path}`;
};

export default getAssetPath;