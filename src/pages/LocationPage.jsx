import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { loadContent } from '../utils/contentLoader';

const LocationPage = ({ locationSlug }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocationContent = async () => {
            try {
                const locationContent = await loadContent(`/src/content/locations/${locationSlug}.md`);
                if (locationContent) {
                    setLocation(locationContent);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading location content:', error);
                setLoading(false);
            }
        };

        loadLocationContent();
    }, [locationSlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    Loading location...
                </div>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-red-600">
                    Location not found
                </div>
            </div>
        );
    }

    const { frontmatter } = location;

    const formatHours = (hours) => {
        if (!hours) return null;
        return Object.entries(hours).map(([day, time]) => (
            <div key={day} className="flex justify-between">
                <span className="font-semibold capitalize">{day}:</span>
                <span>{time}</span>
            </div>
        ));
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title={frontmatter.title}
                subtitle="Location Details"
                backgroundImage={frontmatter.image || "/assets/place-holder.jpg"}
                size="large"
                overlayColor="blue"
            />

            {/* Location Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Location Info */}
                        <div className="space-y-8">
                            {/* Contact Information */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <h2 className="font-heading text-2xl font-bold text-picktopia-blue-dark mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-4">
                                    {frontmatter.address && (
                                        <div>
                                            <h3 className="font-heading text-lg font-bold text-picktopia-blue-dark mb-2">
                                                📍 Address
                                            </h3>
                                            <p className="text-gray-700">
                                                {frontmatter.address}
                                            </p>
                                        </div>
                                    )}

                                    {frontmatter.phone && (
                                        <div>
                                            <h3 className="font-heading text-lg font-bold text-picktopia-blue-dark mb-2">
                                                📞 Phone
                                            </h3>
                                            <a 
                                                href={`tel:${frontmatter.phone}`}
                                                className="text-picktopia-orange hover:text-orange-600 transition-colors"
                                            >
                                                {frontmatter.phone}
                                            </a>
                                        </div>
                                    )}

                                    {frontmatter.email && (
                                        <div>
                                            <h3 className="font-heading text-lg font-bold text-picktopia-blue-dark mb-2">
                                                ✉️ Email
                                            </h3>
                                            <a 
                                                href={`mailto:${frontmatter.email}`}
                                                className="text-picktopia-orange hover:text-orange-600 transition-colors"
                                            >
                                                {frontmatter.email}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Hours */}
                            {frontmatter.hours && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <h2 className="font-heading text-2xl font-bold text-picktopia-blue-dark mb-6">
                                        Hours of Operation
                                    </h2>
                                    <div className="space-y-2 text-gray-700">
                                        {formatHours(frontmatter.hours)}
                                    </div>
                                </div>
                            )}

                            {/* Amenities */}
                            {frontmatter.amenities && frontmatter.amenities.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <h2 className="font-heading text-2xl font-bold text-picktopia-blue-dark mb-6">
                                        Amenities
                                    </h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {frontmatter.amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <span className="text-picktopia-orange">✓</span>
                                                <span className="text-gray-700">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Location Image and Description */}
                        <div className="space-y-8">
                            {/* Location Image */}
                            {frontmatter.image && (
                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                    <img
                                        src={frontmatter.image}
                                        alt={frontmatter.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            )}

                            {/* Description */}
                            {frontmatter.description && (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <h2 className="font-heading text-2xl font-bold text-picktopia-blue-dark mb-6">
                                        About This Location
                                    </h2>
                                    <div 
                                        className="prose prose-lg max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ 
                                            __html: frontmatter.description
                                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-picktopia-blue-dark">$1</strong>')
                                                .replace(/\n\n/g, '</p><p class="mb-4">')
                                                .replace(/^(?!<)/, '<p class="mb-4">')
                                                .replace(/$/, '</p>')
                                        }}
                                    />
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="bg-white rounded-2xl shadow-lg p-8">
                                <div className="space-y-4">
                                    <a
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                        className="block w-full bg-picktopia-orange text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors duration-300"
                                    >
                                        Book a Court
                                    </a>
                                    
                                    {frontmatter.address && (
                                        <a
                                            href={`https://maps.google.com/?q=${encodeURIComponent(frontmatter.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-picktopia-blue-dark text-white text-center px-6 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors duration-300"
                                        >
                                            Get Directions
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationPage;