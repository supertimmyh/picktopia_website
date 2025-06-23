import React, { useState, useEffect } from 'react';
import { CMS_DATA } from '../data';

const AnnouncementBar = () => {
    const { announcements } = CMS_DATA;
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [announcements.length]);

    return (
        <div className="bg-gradient-to-r from-picktopia-orange to-orange-500 text-white text-center py-3 text-sm font-bold shadow-lg border-b-2 border-orange-600">
            <div className="container mx-auto px-6 flex items-center justify-center space-x-2">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                <p className="uppercase tracking-wide">{announcements[currentIndex]}</p>
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
            </div>
        </div>
    );
};

export default AnnouncementBar;