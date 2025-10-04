import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import LocationCard from '../components/LocationCard';
import { loadContent } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const LocationsCMSPage = ({ navigateTo }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                // Load manifest to get location slugs
                const manifestResponse = await fetch(getAssetPath('/content/locations/manifest.json'));
                let locationSlugs = [];
                
                if (manifestResponse.ok) {
                    locationSlugs = await manifestResponse.json();
                } else {
                    locationSlugs = ['scarborough', 'richmond-hill']; // fallback
                }

                // Load each location
                const locationPromises = locationSlugs.map(async (slug) => {
                    try {
                        const content = await loadContent(`/content/locations/${slug}.md`);
                        if (content) {
                            return {
                                id: slug,
                                name: content.frontmatter.title,
                                address: content.frontmatter.address,
                                phone: content.frontmatter.phone,
                                email: content.frontmatter.email,
                                courtCount: content.frontmatter.courtCount,
                                image: content.frontmatter.image,
                                bookingUrl: content.frontmatter.bookingUrl,
                                hours: content.frontmatter.hours,
                                amenities: content.frontmatter.amenities,
                                description: content.content.trim()
                            };
                        }
                        return null;
                    } catch (error) {
                        console.error(`Error loading location ${slug}:`, error);
                        return null;
                    }
                });

                const loadedLocations = await Promise.all(locationPromises);
                const validLocations = loadedLocations.filter(loc => loc !== null);
                
                setLocations(validLocations);
                setLoading(false);
            } catch (error) {
                console.error('Error loading locations:', error);
                setLoading(false);
            }
        };

        loadLocations();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    Loading locations...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title="Our Locations"
                subtitle="Find the Picktopia facility nearest to you"
                backgroundImage="https://placehold.co/1920x600/1C275F/e1672a?text=Our+Locations"
                size="large"
                overlayColor="blue"
            />

            {/* Locations Grid */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Introduction */}
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl font-bold text-picktopia-blue-dark mb-4">
                            Visit Our Premier Pickleball Facilities
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                            Experience top-tier pickleball at either of our state-of-the-art locations. 
                            Each facility offers professional courts, modern amenities, and a welcoming 
                            community atmosphere for players of all skill levels.
                        </p>
                    </div>

                    {/* Location Cards */}
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                        {locations.map((location) => (
                            <LocationCard
                                key={location.id}
                                location={location}
                            />
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 text-center">
                        <div className="bg-gradient-to-r from-picktopia-blue-dark to-picktopia-blue-mid text-white rounded-2xl p-8 max-w-4xl mx-auto">
                            <h3 className="font-heading text-2xl font-bold mb-4">
                                Ready to Play?
                            </h3>
                            <p className="text-blue-100 mb-6 text-lg">
                                New to pickleball? Start with our free intro sessions and discover why pickleball is the fastest-growing sport!
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => navigateTo && navigateTo('play-free-pickleball-intro')}
                                    className="bg-picktopia-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105"
                                >
                                    Try Free Pickleball Intro
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-picktopia-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                🏟️
                            </div>
                            <h4 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                Professional Courts
                            </h4>
                            <p className="text-gray-600">
                                All courts meet professional standards with proper lighting, 
                                surfaces, and net systems.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-picktopia-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                🚗
                            </div>
                            <h4 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                Easy Access
                            </h4>
                            <p className="text-gray-600">
                                Both locations offer convenient parking and are easily 
                                accessible by public transportation.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-picktopia-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                🏪
                            </div>
                            <h4 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                Full Amenities
                            </h4>
                            <p className="text-gray-600">
                                Pro shops, lounge areas, equipment rental, and refreshments 
                                available at both locations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationsCMSPage;