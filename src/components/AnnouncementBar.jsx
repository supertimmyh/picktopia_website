import React, { useState, useEffect } from 'react';
import { loadActiveAnnouncements } from '../utils/contentLoader';
import { CMS_DATA } from '../data';

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
            <div className="px-6 flex items-center justify-center space-x-2">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <p className="uppercase tracking-wide">
                    {currentAnnouncement.message}
                    {isClickable && (
                        <span className="ml-2 inline-block transition-transform duration-300 hover:translate-x-1">
                            →
                        </span>
                    )}
                </p>
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </div>
            
            {/* Multiple announcements indicator */}
            {announcements.length > 1 && (
                <div className="flex justify-center space-x-1 mt-1">
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