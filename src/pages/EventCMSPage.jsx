import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { loadContent } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const EventCMSPage = ({ eventSlug }) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEventContent = async () => {
            try {
                const eventContent = await loadContent(`/content/events/${eventSlug}.md`);
                if (eventContent) {
                    setEvent(eventContent);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading event content:', error);
                setLoading(false);
            }
        };

        loadEventContent();
    }, [eventSlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    Loading event...
                </div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-red-600">
                    Event not found
                </div>
            </div>
        );
    }

    const { frontmatter } = event;
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title={frontmatter.title}
                subtitle="Event Details"
                backgroundImage={frontmatter.image || getAssetPath("/images/place-holder.jpg")}
                size="large"
                overlayColor="blue"
            />

            {/* Event Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Event Info Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Event Details */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                        📅 Date & Time
                                    </h3>
                                    <p className="text-gray-700 text-lg">
                                        {formatDate(frontmatter.date)}
                                    </p>
                                </div>

                                {frontmatter.location && (
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                            📍 Location
                                        </h3>
                                        <p className="text-gray-700 text-lg">
                                            {frontmatter.location}
                                        </p>
                                    </div>
                                )}

                                {frontmatter.price && (
                                    <div>
                                        <h3 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                            💰 Price
                                        </h3>
                                        <p className="text-gray-700 text-lg">
                                            {frontmatter.price}
                                        </p>
                                    </div>
                                )}

                                {frontmatter.registrationLink && (
                                    <div className="pt-4">
                                        <a
                                            href={frontmatter.registrationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block bg-picktopia-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors duration-300"
                                        >
                                            Register Now
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Event Image */}
                            {frontmatter.image && (
                                <div>
                                    <img
                                        src={frontmatter.image}
                                        alt={frontmatter.title}
                                        className="w-full h-64 object-cover rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Event Description */}
                    {frontmatter.description && (
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="font-heading text-2xl font-bold text-picktopia-blue-dark mb-6">
                                About This Event
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
                </div>
            </div>
        </div>
    );
};

export default EventCMSPage;