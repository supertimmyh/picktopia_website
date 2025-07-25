import React, { useState, useEffect } from 'react';
import { loadLatestEvents } from '../utils/contentLoader';

const LatestEvents = ({ navigateTo }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const latestEvents = await loadLatestEvents(3);
                setEvents(latestEvents);
            } catch (error) {
                console.error('Error loading events:', error);
                // Fallback to empty array
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    if (loading) {
        return (
            <div className="bg-picktopia-blue-dark text-white py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Latest Events</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-lg">
                                <div className="w-full h-48 bg-gray-300"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="bg-picktopia-blue-dark text-white py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Latest Events</h2>
                    <div className="text-center py-8">
                        <p className="text-lg text-gray-300">No events available at the moment. Check back soon!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-picktopia-blue-dark text-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Latest Events</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <div 
                            key={event.slug || index} 
                            className="bg-white rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                            onClick={() => navigateTo && navigateTo(`events-${event.slug}`)}
                        >
                            <img 
                                src={event.image} 
                                alt={event.title} 
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                            />
                            <div className="p-6">
                                <h3 className="font-bold text-xl mb-2 text-picktopia-blue-dark">{event.title}</h3>
                                {event.date && (
                                    <p className="text-picktopia-orange font-medium mb-2">
                                        {formatDate(event.date)}
                                    </p>
                                )}
                                {event.location && (
                                    <p className="text-gray-600 text-sm mb-3">{event.location}</p>
                                )}
                                {event.price && (
                                    <p className="text-picktopia-blue-dark font-medium mb-3">{event.price}</p>
                                )}
                                {event.registrationLink && (
                                    <a 
                                        href={event.registrationLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-block bg-picktopia-orange text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Register Now
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestEvents;