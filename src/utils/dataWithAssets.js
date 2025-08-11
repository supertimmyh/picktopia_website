import { getAssetPath } from './assetPath';

// Recursively process an object/array to apply getAssetPath to any string that looks like an asset path
const processAssetPaths = (obj) => {
  if (typeof obj === 'string') {
    // If it's a string that starts with /images/ or /content/, apply the asset path
    if (obj.startsWith('/images/') || obj.startsWith('/content/')) {
      return getAssetPath(obj);
    }
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(processAssetPaths);
  }
  
  if (obj && typeof obj === 'object') {
    const processed = {};
    for (const [key, value] of Object.entries(obj)) {
      processed[key] = processAssetPaths(value);
    }
    return processed;
  }
  
  return obj;
};

// Export function to process any data object
export const withAssetPaths = (data) => {
  return processAssetPaths(data);
};

export default withAssetPaths;