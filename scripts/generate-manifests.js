#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate events manifest
const eventsDir = path.join(__dirname, '../public/content/events');
const eventsManifestPath = path.join(eventsDir, 'manifest.json');

try {
  const files = fs.readdirSync(eventsDir);
  const eventSlugs = files
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', ''));
  
  fs.writeFileSync(eventsManifestPath, JSON.stringify(eventSlugs, null, 2));
  console.log(`Generated events manifest with ${eventSlugs.length} events:`, eventSlugs);
} catch (error) {
  console.error('Error generating events manifest:', error);
}

// Generate locations manifest (for future use)
const locationsDir = path.join(__dirname, '../public/content/locations');
const locationsManifestPath = path.join(locationsDir, 'manifest.json');

try {
  if (fs.existsSync(locationsDir)) {
    const files = fs.readdirSync(locationsDir);
    const locationSlugs = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    
    fs.writeFileSync(locationsManifestPath, JSON.stringify(locationSlugs, null, 2));
    console.log(`Generated locations manifest with ${locationSlugs.length} locations:`, locationSlugs);
  }
} catch (error) {
  console.error('Error generating locations manifest:', error);
}

// Generate announcements manifest
const announcementsDir = path.join(__dirname, '../public/content/announcements');
const announcementsManifestPath = path.join(announcementsDir, 'manifest.json');

try {
  if (fs.existsSync(announcementsDir)) {
    const files = fs.readdirSync(announcementsDir);
    const announcementSlugs = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    
    fs.writeFileSync(announcementsManifestPath, JSON.stringify(announcementSlugs, null, 2));
    console.log(`Generated announcements manifest with ${announcementSlugs.length} announcements:`, announcementSlugs);
  }
} catch (error) {
  console.error('Error generating announcements manifest:', error);
}