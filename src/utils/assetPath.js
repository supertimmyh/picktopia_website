// Utility to handle asset paths with base path for GitHub Pages deployment
const getBasePath = () => {
  return import.meta.env.PROD ? '/picktopia_website' : '';
};

export const getAssetPath = (path) => {
  // If path already has base path or is external, return as-is
  if (path.startsWith('http') || path.startsWith('/picktopia_website/')) {
    return path;
  }
  
  // Prepend base path for production
  return `${getBasePath()}${path}`;
};

export default getAssetPath;