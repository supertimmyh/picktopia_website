import React, { useMemo, useState, useEffect } from 'react';
import { Filter, MapPin, Store, Trophy } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import LocationCard from '../components/LocationCard';
import { loadLocations } from '../utils/contentLoader';

const LocationsCMSPage = ({ navigateTo }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCity, setActiveCity] = useState('All');
    const [activeStatus, setActiveStatus] = useState('All');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const loadedLocations = await loadLocations();
                setLocations(loadedLocations);
                setLoading(false);
            } catch (error) {
                console.error('Error in LocationsCMSPage:', error);
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    const cities = useMemo(() => {
        const cityNames = locations
            .map((location) => location.city)
            .filter(Boolean);
        return ['All', ...Array.from(new Set(cityNames))];
    }, [locations]);

    const statuses = useMemo(() => {
        const statusNames = locations
            .map((location) => location.status || 'Now Open')
            .filter(Boolean);
        return ['All', ...Array.from(new Set(statusNames))];
    }, [locations]);

    const filteredLocations = useMemo(() => {
        return locations.filter((location) => {
            const cityMatches = activeCity === 'All' || location.city === activeCity;
            const statusMatches = activeStatus === 'All' || (location.status || 'Now Open') === activeStatus;
            return cityMatches && statusMatches;
        });
    }, [locations, activeCity, activeStatus]);

    const primaryLocation = locations.find((location) => (location.status || 'Now Open') === 'Now Open') || locations[0];
    const totalCourts = locations.reduce((sum, location) => sum + (Number(location.courtCount) || 0), 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    Loading locations...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title="Our Locations"
                subtitle="Choose your club, compare amenities, and use the actions available for that specific location."
                backgroundImage={primaryLocation?.image || "https://placehold.co/1920x600/1C275F/e1672a?text=Our+Locations"}
                size="large"
                overlayColor="blue"
            />

            {/* Locations Grid */}
            <div className="container mx-auto px-6 py-10">
                <div className="max-w-7xl mx-auto space-y-12">
                    {/* Introduction */}
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <p className="text-picktopia-orange font-bold uppercase tracking-wide mb-2">
                                Location Hub
                            </p>
                            <h2 className="font-heading text-3xl font-bold text-picktopia-blue-dark mb-4">
                                Find the right Picktopia club for today.
                            </h2>
                            <p className="text-gray-600 text-lg max-w-3xl leading-relaxed">
                                Compare courts, amenities, opening status, and location-specific actions in one place.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[360px]">
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <p className="font-heading text-2xl font-bold text-picktopia-blue-dark">{locations.length}</p>
                                <p className="text-xs font-semibold text-gray-600 uppercase">Clubs</p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <p className="font-heading text-2xl font-bold text-picktopia-blue-dark">{totalCourts}</p>
                                <p className="text-xs font-semibold text-gray-600 uppercase">Courts</p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-4 col-span-2 sm:col-span-1">
                                <p className="font-heading text-2xl font-bold text-picktopia-blue-dark">{cities.length - 1}</p>
                                <p className="text-xs font-semibold text-gray-600 uppercase">Cities</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-picktopia-blue-dark text-white rounded-lg p-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="font-heading text-xl font-bold">Ready to play now?</p>
                            <p className="text-blue-100 text-sm">Choose a club below. Open clubs show booking and program actions; future clubs show launch details.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setActiveStatus('Now Open')}
                                className="bg-picktopia-orange text-white px-5 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors inline-flex items-center justify-center gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                Show Open Clubs
                            </button>
                        </div>
                    </div>

                    <section className="space-y-5">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h3 className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                                    Browse Clubs
                                </h3>
                                <p className="text-gray-600">
                                    Showing {filteredLocations.length} of {locations.length} locations.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setActiveCity('All');
                                    setActiveStatus('All');
                                }}
                                className="self-start lg:self-auto text-sm font-bold text-picktopia-orange hover:text-orange-700"
                            >
                                Clear filters
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                                {cities.map((city) => (
                                    <button
                                        key={city}
                                        onClick={() => setActiveCity(city)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${activeCity === city ? 'bg-picktopia-blue-dark text-white border-picktopia-blue-dark' : 'bg-white text-picktopia-blue-dark border-gray-200 hover:border-picktopia-orange'}`}
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setActiveStatus(status)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${activeStatus === status ? 'bg-picktopia-orange text-white border-picktopia-orange' : 'bg-white text-picktopia-blue-dark border-gray-200 hover:border-picktopia-orange'}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Location Cards */}
                    <div className="grid gap-8 lg:grid-cols-2">
                        {filteredLocations.map((location) => (
                            <LocationCard
                                key={location.id}
                                location={location}
                                navigateTo={navigateTo}
                            />
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-picktopia-blue-dark to-picktopia-blue-mid text-white rounded-lg p-8 max-w-4xl mx-auto">
                            <h3 className="font-heading text-2xl font-bold mb-4">
                                Ready to Play?
                            </h3>
                            <p className="text-blue-100 mb-6 text-lg">
                                Looking for clinics, padel offers, or special programming? Explore current programs by location.
                            </p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => navigateTo && navigateTo('programs')}
                                    className="bg-picktopia-orange text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105"
                                >
                                    View Programs
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-picktopia-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trophy className="w-7 h-7" />
                            </div>
                            <h4 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                Professional Courts
                            </h4>
                            <p className="text-gray-600">
                                All courts meet professional standards with proper lighting, 
                                surfaces, and net systems.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-picktopia-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <h4 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                Easy Access
                            </h4>
                            <p className="text-gray-600">
                                Both locations offer convenient parking and are easily 
                                accessible by public transportation.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-picktopia-orange text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Store className="w-7 h-7" />
                            </div>
                            <h4 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                Full Amenities
                            </h4>
                            <p className="text-gray-600">
                                Pro shops, lounge areas, equipment rental, and refreshments 
                                available at both locations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationsCMSPage;
