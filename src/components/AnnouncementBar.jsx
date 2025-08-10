import React, { useState, useEffect } from 'react';
import { loadActiveAnnouncements } from '../utils/contentLoader';
import { CMS_DATA } from '../data/data';

const AnnouncementBar = ({ navigateTo }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnnouncements = async () => {
            try {
                const cmsAnnouncements = await loadActiveAnnouncements();
                
                if (cmsAnnouncements.length > 0) {
                    setAnnouncements(cmsAnnouncements);
                } else {
                    // Fallback to static announcements
                    const fallbackAnnouncements = CMS_DATA.announcements?.map(text => ({
                        message: text,
                        linkType: 'none'
                    })) || [];
                    setAnnouncements(fallbackAnnouncements);
                }
            } catch (error) {
                console.error('Error loading announcements:', error);
                // Fallback to static announcements
                const fallbackAnnouncements = CMS_DATA.announcements?.map(text => ({
                    message: text,
                    linkType: 'none'
                })) || [];
                setAnnouncements(fallbackAnnouncements);
            } finally {
                setLoading(false);
            }
        };

        loadAnnouncements();
    }, []);

    useEffect(() => {
        if (announcements.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [announcements.length]);

    const handleAnnouncementClick = () => {
        const announcement = announcements[currentIndex];
        
        if (!announcement || announcement.linkType === 'none') {
            return;
        }

        switch (announcement.linkType) {
            case 'internal':
                if (navigateTo && announcement.link) {
                    navigateTo(announcement.link);
                }
                break;
            case 'external':
                if (announcement.link) {
                    window.open(announcement.link, '_blank', 'noopener,noreferrer');
                }
                break;
            case 'event':
                if (navigateTo && announcement.link) {
                    navigateTo(`events-${announcement.link}`);
                }
                break;
            default:
                break;
        }
    };

    if (loading || announcements.length === 0) {
        return null; // Hide announcement bar if no announcements
    }

    const currentAnnouncement = announcements[currentIndex];
    const isClickable = currentAnnouncement?.linkType !== 'none' && currentAnnouncement?.link;

    return (
        <div 
            className={`bg-gradient-to-r from-picktopia-orange/90 to-orange-500/90 backdrop-blur-sm text-white text-center py-3 text-sm font-bold shadow-lg border-b-2 border-orange-600/50 w-full ${
                isClickable ? 'cursor-pointer hover:from-picktopia-orange hover:to-orange-500 transition-all duration-300' : ''
            }`}
            onClick={handleAnnouncementClick}
        >
            <div className="px-6 flex items-center justify-between">
                {/* Center content */}
                <div className="flex-1 text-center">
                    <p className="uppercase tracking-wide">
                        {currentAnnouncement.message}
                    </p>
                </div>
                
                {/* Right side - Next arrow (only when multiple announcements) */}
                {announcements.length > 1 && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent announcement click
                            setCurrentIndex((prev) => (prev + 1) % announcements.length);
                        }}
                        className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 group ml-4"
                        aria-label={`Next announcement (${currentIndex + 1} of ${announcements.length})`}
                    >
                        <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
            
            {/* Simple indicator dots */}
            {announcements.length > 1 && (
                <div className="flex justify-center space-x-1 mt-2">
                    {announcements.map((_, index) => (
                        <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                index === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnnouncementBar;