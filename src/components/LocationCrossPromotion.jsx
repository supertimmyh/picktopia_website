import React, { useEffect, useState } from 'react';
import { loadLocations } from '../utils/contentLoader';
import { getLocationPageName } from '../utils/navigation';

const LocationCrossPromotion = ({ currentLocationId, navigateTo }) => {
    const [featuredLocation, setFeaturedLocation] = useState(null);

    useEffect(() => {
        const fetchFeaturedLocation = async () => {
            if (!currentLocationId) return;

            const locations = await loadLocations();
            setFeaturedLocation(locations.find((location) => location.id !== currentLocationId) || null);
        };

        fetchFeaturedLocation();
    }, [currentLocationId]);

    if (!featuredLocation) return null;

    const handleClick = () => {
        if (navigateTo) {
            navigateTo(getLocationPageName(featuredLocation.id));
        }
    };

    return (
        <section className="max-w-6xl mx-auto bg-picktopia-blue-dark text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <p className="font-heading text-xl font-bold">
                    Visit {featuredLocation.name}
                </p>
                <p className="text-blue-100 text-sm">
                    Explore another Picktopia club for more courts, programs, and training options.
                </p>
            </div>
            <button
                onClick={handleClick}
                className="bg-white text-picktopia-blue-dark px-5 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
                View Club
            </button>
        </section>
    );
};

export default LocationCrossPromotion;
