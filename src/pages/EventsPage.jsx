import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import EventTile from '../components/EventTile';
import { loadAllEvents } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const EventsPage = ({ navigateTo }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('date'); // 'date', 'title'
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const allEvents = await loadAllEvents();
                setEvents(allEvents);
            } catch (error) {
                console.error('Error loading events:', error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (eventSlug) => {
        if (navigateTo) {
            navigateTo(`events-${eventSlug}`);
        }
    };

    const sortEvents = (events, sortBy, sortOrder) => {
        return [...events].sort((a, b) => {
            let comparison = 0;
            
            if (sortBy === 'date') {
                const dateA = new Date(a.date || 0);
                const dateB = new Date(b.date || 0);
                comparison = dateA - dateB;
            } else if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            }
            
            return sortOrder === 'desc' ? -comparison : comparison;
        });
    };

    const sortedEvents = sortEvents(events, sortBy, sortOrder);

    const handleSortChange = (newSortBy) => {
        if (newSortBy === sortBy) {
            // Toggle sort order if clicking the same sort option
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder(newSortBy === 'date' ? 'desc' : 'asc'); // Default: newest first for date, A-Z for title
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <HeroSection
                    title="Events"
                    subtitle="Discover upcoming pickleball events and tournaments"
                    backgroundImage={getAssetPath("/images/uploads/place-holder.jpg")}
                    size="large"
                    overlayColor="blue"
                />
                
                <div className="container mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-lg">
                                <div className="w-full h-48 bg-gray-300"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-300 rounded mb-3"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                                    <div className="h-8 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title="Events"
                subtitle="Discover upcoming pickleball events and tournaments in our community"
                backgroundImage={getAssetPath("/images/uploads/place-holder.jpg")}
                size="large"
                overlayColor="blue"
            />

            {/* Events Content */}
            <div className="container mx-auto px-6 py-16">
                {/* Sort Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                            All Events ({events.length})
                        </h2>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm font-medium">Sort by:</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSortChange('date')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                                    sortBy === 'date'
                                        ? 'bg-picktopia-blue-dark text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
                            </button>
                            <button
                                onClick={() => handleSortChange('title')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                                    sortBy === 'title'
                                        ? 'bg-picktopia-blue-dark text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Title {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                {sortedEvents.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="font-heading text-6xl mb-4">🏓</div>
                        <h3 className="font-heading text-2xl font-bold text-picktopia-blue-dark mb-2">
                            No Events Yet
                        </h3>
                        <p className="text-gray-600 text-lg max-w-md mx-auto">
                            We're working on some exciting events for our community. Check back soon!
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedEvents.map((event, index) => (
                            <EventTile
                                key={event.slug || index}
                                event={event}
                                onClick={handleEventClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;