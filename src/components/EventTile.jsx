import React from 'react';

const EventTile = ({ event, onClick }) => {
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div 
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
            onClick={() => onClick && onClick(event.slug)}
        >
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={event.image || '/images/uploads/place-holder.jpg'} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                {/* Date Badge */}
                {event.date && (
                    <div className="absolute top-4 left-4 bg-picktopia-orange text-white px-3 py-1 rounded-lg font-bold text-sm">
                        {formatDate(event.date)}
                    </div>
                )}
            </div>

            {/* Event Content */}
            <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2 line-clamp-2">
                    {event.title}
                </h3>
                
                {/* Event Details */}
                <div className="space-y-2 mb-4">
                    {event.date && (
                        <div className="flex items-center text-gray-600 text-sm">
                            <span className="mr-2">🕒</span>
                            <span>{formatTime(event.date)}</span>
                        </div>
                    )}
                    
                    {event.location && (
                        <div className="flex items-center text-gray-600 text-sm">
                            <span className="mr-2">📍</span>
                            <span className="line-clamp-1">{event.location}</span>
                        </div>
                    )}
                    
                    {event.price && (
                        <div className="flex items-center text-picktopia-blue-dark font-medium text-sm">
                            <span className="mr-2">💰</span>
                            <span>{event.price}</span>
                        </div>
                    )}
                </div>

                {/* Event Description Preview */}
                {event.description && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                        {event.description.replace(/\*\*.*?\*\*/g, '').substring(0, 120)}...
                    </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                    <button 
                        className="flex-1 bg-picktopia-blue-dark text-white px-4 py-2 rounded-lg font-medium hover:bg-picktopia-blue-mid transition-colors duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick && onClick(event.slug);
                        }}
                    >
                        View Details
                    </button>
                    
                    {event.registrationLink && (
                        <a 
                            href={event.registrationLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-picktopia-orange text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Register
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventTile;