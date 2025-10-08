import React, { useState } from 'react';

const LocationCard = ({ location }) => {
    const [hoursExpanded, setHoursExpanded] = useState(false);
    const [layoutExpanded, setLayoutExpanded] = useState(false);

    const formatHours = (hours) => {
        return Object.entries(hours).map(([day, time]) => (
            <div key={day} className="flex justify-between items-center py-1">
                <span className="font-medium capitalize text-gray-700">{day}:</span>
                <span className="text-gray-600">{time}</span>
            </div>
        ));
    };

    const handleBookingClick = () => {
        window.open(location.bookingUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-lg">
            {/* Facility Image */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400/1C275F/e1672a?text=Pickleball+Facility';
                    }}
                />
                <div className="absolute top-4 right-4 bg-picktopia-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                    {location.courtCount} Courts
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
                {/* Location Name */}
                <h3 className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    {location.name}
                </h3>

                {/* Contact Information */}
                <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                        <span className="text-picktopia-orange mt-1">📍</span>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {location.address}
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-picktopia-orange">📞</span>
                        <a 
                            href={`tel:${location.phone}`}
                            className="text-picktopia-blue-dark hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                            {location.phone}
                        </a>
                    </div>

                    <div className="flex items-center space-x-2">
                        <span className="text-picktopia-orange">✉️</span>
                        <a 
                            href={`mailto:${location.email}`}
                            className="text-picktopia-blue-dark hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                            {location.email}
                        </a>
                    </div>
                </div>

                {/* Hours of Operation */}
                <div className="border border-gray-200 rounded-lg p-4">
                    <button
                        onClick={() => setHoursExpanded(!hoursExpanded)}
                        className="w-full flex items-center justify-between text-left"
                    >
                        <span className="font-heading text-lg font-bold text-picktopia-blue-dark">
                            Hours of Operation
                        </span>
                        <span className={`text-picktopia-orange transition-transform duration-200 ${hoursExpanded ? 'rotate-180' : ''}`}>
                            ▼
                        </span>
                    </button>

                    {hoursExpanded && (
                        <div className="mt-4 space-y-1 text-sm border-t border-gray-100 pt-4">
                            {formatHours(location.hours)}
                        </div>
                    )}
                </div>

                {/* Facility Layout */}
                {location.layoutImage && (
                    <div className="border border-gray-200 rounded-lg p-4">
                        <button
                            onClick={() => setLayoutExpanded(!layoutExpanded)}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <span className="font-heading text-lg font-bold text-picktopia-blue-dark">
                                Facility Layout
                            </span>
                            <span className={`text-picktopia-orange transition-transform duration-200 ${layoutExpanded ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </button>

                        {layoutExpanded && (
                            <div className="mt-4 border-t border-gray-100 pt-4">
                                <img
                                    src={location.layoutImage}
                                    alt={`${location.name} facility layout`}
                                    className="w-full h-auto rounded-lg"
                                    onError={(e) => {
                                        e.target.src = 'https://placehold.co/600x400/1C275F/e1672a?text=Layout+Image';
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Description */}
                {location.description && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {location.description}
                    </p>
                )}

                {/* Amenities (if available) */}
                {location.amenities && location.amenities.length > 0 && (
                    <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-heading font-bold text-picktopia-blue-dark mb-2 text-sm">
                            Amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {location.amenities.slice(0, 4).map((amenity, index) => (
                                <span 
                                    key={index} 
                                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                >
                                    {amenity}
                                </span>
                            ))}
                            {location.amenities.length > 4 && (
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                    +{location.amenities.length - 4} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Booking Button */}
                <div className="pt-4">
                    <button
                        onClick={handleBookingClick}
                        className="w-full bg-picktopia-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105"
                    >
                        Learn More & Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationCard;