import React, { useState } from 'react';
import { CalendarDays, CreditCard, Dumbbell, Info, MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { getLocationPageName } from '../utils/navigation';

const LocationCard = ({ location, navigateTo }) => {
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

    const handleNavClick = (section = null) => {
        if (navigateTo) {
            navigateTo(getLocationPageName(location.id, section));
        }
    };

    const handleMembershipClick = () => {
        if (navigateTo) {
            navigateTo(getLocationPageName(location.id, 'membership'));
        }
    };

    const quickSpecs = [
        `${location.courtCount || 0} courts`,
        location.hasLounge || location.amenities?.some((amenity) => amenity.toLowerCase().includes('lounge')) ? 'Lounge' : null,
        location.hasProShop || location.amenities?.some((amenity) => amenity.toLowerCase().includes('pro shop')) ? 'Pro shop' : null,
        location.amenities?.some((amenity) => amenity.toLowerCase().includes('parking')) ? 'Parking' : null
    ].filter(Boolean);

    const isOpen = (location.status || 'Now Open') === 'Now Open';

    return (
        <article className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-xl border border-gray-100">
            {/* Facility Image */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400/1C275F/e1672a?text=Pickleball+Facility';
                    }}
                />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${isOpen ? 'bg-green-600 text-white' : 'bg-picktopia-orange text-white'}`}>
                        {location.status || 'Now Open'}
                    </span>
                    {location.city && (
                        <span className="bg-white text-picktopia-blue-dark px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            {location.city}
                        </span>
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-5">
                {/* Location Name */}
                <div>
                    <h3 className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                        {location.name}
                    </h3>
                    {location.region && (
                        <p className="text-sm font-semibold text-picktopia-orange uppercase tracking-wide">
                            {location.region}
                        </p>
                    )}
                </div>

                {quickSpecs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {quickSpecs.map((spec) => (
                            <span
                                key={spec}
                                className="bg-picktopia-blue-dark/10 text-picktopia-blue-dark text-xs px-2 py-1 rounded-full font-bold"
                            >
                                {spec}
                            </span>
                        ))}
                    </div>
                )}

                {/* Contact Information */}
                <div className="grid gap-3 text-sm">
                    <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-picktopia-orange mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm leading-relaxed">
                            {location.address}
                        </p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-picktopia-orange flex-shrink-0" />
                        <a 
                            href={`tel:${location.phone}`}
                            className="text-picktopia-blue-dark hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                            {location.phone}
                        </a>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-picktopia-orange flex-shrink-0" />
                        <a 
                            href={`mailto:${location.email}`}
                            className="text-picktopia-blue-dark hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                            {location.email}
                        </a>
                    </div>
                </div>

                {/* Hours of Operation */}
                {location.hours && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <button
                            onClick={() => setHoursExpanded(!hoursExpanded)}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <span className="font-heading text-base font-bold text-picktopia-blue-dark flex items-center gap-2">
                                <Clock className="w-4 h-4 text-picktopia-orange" />
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
                )}

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
                    <div 
                        className="text-gray-600 text-sm leading-relaxed max-h-24 overflow-hidden"
                        dangerouslySetInnerHTML={{ 
                            __html: location.description
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-picktopia-blue-dark">$1</strong>')
                                .replace(/\n\n/g, '</p><p class="mb-4">')
                                .replace(/^(?!<)/, '<p class="mb-4">')
                                .replace(/$/, '</p>')
                        }}
                    />
                )}

                {/* Amenities (if available) */}
                {location.amenities && location.amenities.length > 0 && (
                    <div className="border-t border-gray-100 pt-4">
                        <h4 className="font-heading font-bold text-picktopia-blue-dark mb-2 text-sm">
                            Amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {location.amenities.slice(0, 6).map((amenity, index) => (
                                <span 
                                    key={index} 
                                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1"
                                >
                                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                                    {amenity}
                                </span>
                            ))}
                            {location.amenities.length > 6 && (
                                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                                    +{location.amenities.length - 6} more
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Location Actions */}
                <div className="pt-4 grid gap-3 sm:grid-cols-2">
                    <button
                        onClick={() => handleNavClick()}
                        className={`w-full bg-picktopia-blue-dark text-white font-bold py-3 px-4 rounded-lg hover:bg-picktopia-blue-mid transition-colors duration-300 inline-flex items-center justify-center gap-2 ${!isOpen ? 'sm:col-span-2' : ''}`}
                    >
                        <Info className="w-4 h-4" />
                        {isOpen ? 'Club Details' : 'Opening Details'}
                    </button>
                    {isOpen && (
                        <>
                            <button
                                onClick={() => handleNavClick('booking')}
                                className="w-full bg-picktopia-orange text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                            >
                                <CalendarDays className="w-4 h-4" />
                                Book Courts
                            </button>
                            <button
                                onClick={() => handleNavClick('schedule')}
                                className="w-full border border-picktopia-blue-dark text-picktopia-blue-dark font-bold py-3 px-4 rounded-lg hover:bg-picktopia-blue-dark hover:text-white transition-colors duration-300 inline-flex items-center justify-center gap-2"
                            >
                                <Clock className="w-4 h-4" />
                                Schedule
                            </button>
                            <button
                                onClick={() => handleNavClick('training')}
                                className="w-full border border-picktopia-blue-dark text-picktopia-blue-dark font-bold py-3 px-4 rounded-lg hover:bg-picktopia-blue-dark hover:text-white transition-colors duration-300 inline-flex items-center justify-center gap-2"
                            >
                                <Dumbbell className="w-4 h-4" />
                                Training
                            </button>
                        </>
                    )}
                    {location.hasMemberships && (
                        <button
                            onClick={handleMembershipClick}
                            className="w-full border border-picktopia-orange text-picktopia-orange font-bold py-3 px-4 rounded-lg hover:bg-picktopia-orange hover:text-white transition-colors duration-300 inline-flex items-center justify-center gap-2 sm:col-span-2"
                        >
                            <CreditCard className="w-4 h-4" />
                            Memberships
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
};

export default LocationCard;
