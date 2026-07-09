import React, { useEffect, useState } from 'react';
import { CalendarDays, Clock, CreditCard, Dumbbell, Mail, MapPin, Phone } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import FaqSection from '../components/FaqSection';
import { loadLocation, loadLocations } from '../utils/contentLoader';
import { getLocationPageName } from '../utils/navigation';
import { updateSeo } from '../utils/seo';

const LocationDetailPage = ({ locationId, navigateTo }) => {
    const [location, setLocation] = useState(null);
    const [featuredLocation, setFeaturedLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocation = async () => {
            setLoading(true);

            try {
                const [selectedLocation, allLocations] = await Promise.all([
                    loadLocation(locationId),
                    loadLocations()
                ]);

                setLocation(selectedLocation);
                setFeaturedLocation(allLocations.find((item) => item.id !== locationId) || null);
            } catch (error) {
                console.error('Error loading location detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [locationId]);

    useEffect(() => {
        if (location?.name) {
            updateSeo({
                title: `${location.name} | Picktopia Pickleball Club`,
                description: `Visit ${location.name} for indoor pickleball courts, programs, training, and club amenities.`
            });
        }
    }, [location]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    Loading location...
                </div>
            </div>
        );
    }

    if (!location) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 text-center">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-picktopia-blue-dark mb-4">
                        Location Not Found
                    </h1>
                    <button
                        onClick={() => navigateTo && navigateTo('clubs')}
                        className="bg-picktopia-orange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                    >
                        View All Clubs
                    </button>
                </div>
            </div>
        );
    }

    const quickSpecs = [
        `${location.courtCount || 0} courts`,
        location.hasLounge || location.amenities?.some((amenity) => amenity.toLowerCase().includes('lounge')) ? 'Lounge' : null,
        location.hasProShop || location.amenities?.some((amenity) => amenity.toLowerCase().includes('pro shop')) ? 'Pro shop' : null,
        location.amenities?.some((amenity) => amenity.toLowerCase().includes('parking')) ? 'Parking' : null
    ].filter(Boolean);
    const isOpen = (location.status || 'Now Open') === 'Now Open';

    const ctas = isOpen ? [
        { label: 'Book Courts', page: getLocationPageName(location.id, 'booking'), icon: CalendarDays, primary: true },
        { label: 'Program Schedule', page: getLocationPageName(location.id, 'schedule'), icon: Clock },
        { label: 'Training', page: getLocationPageName(location.id, 'training'), icon: Dumbbell }
    ] : [];

    const handleMembershipClick = () => {
        if (navigateTo) {
            navigateTo(getLocationPageName(location.id, 'membership'));
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <HeroSection
                title={location.name}
                subtitle={location.address}
                backgroundImage={location.image}
                size="large"
                overlayColor="blue"
            />

            <div className="container mx-auto px-6 py-12 space-y-12">
                <section className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-picktopia-orange text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                {location.status || 'Now Open'}
                            </span>
                            {location.city && (
                                <span className="bg-picktopia-blue-dark text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {location.city}
                                </span>
                            )}
                        </div>
                        <h2 className="font-heading text-3xl font-bold text-picktopia-blue-dark mb-4">
                            Club Details
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            {location.description}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {quickSpecs.map((spec) => (
                                <span key={spec} className="bg-picktopia-blue-dark text-white px-4 py-2 rounded-full text-sm font-bold">
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                        <h3 className="font-heading text-xl font-bold text-picktopia-blue-dark">
                            Plan Your Visit
                        </h3>
                        <div className="space-y-3 text-sm text-gray-700">
                            <p className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-picktopia-orange mt-0.5 flex-shrink-0" />
                                {location.address}
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-picktopia-orange flex-shrink-0" />
                                {location.phone}
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-picktopia-orange flex-shrink-0" />
                                {location.email}
                            </p>
                        </div>
                        <div className="grid gap-3">
                            {ctas.length > 0 ? (
                                ctas.map((cta) => {
                                    const Icon = cta.icon;
                                    return (
                                        <button
                                            key={cta.page}
                                            onClick={() => navigateTo && navigateTo(cta.page)}
                                            className={`w-full font-bold py-3 px-5 rounded-lg transition-colors inline-flex items-center justify-center gap-2 ${cta.primary ? 'bg-picktopia-orange text-white hover:bg-orange-600' : 'border border-picktopia-blue-dark text-picktopia-blue-dark hover:bg-picktopia-blue-dark hover:text-white'}`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {cta.label}
                                        </button>
                                    );
                                })
                            ) : (
                                <p className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
                                    Booking, schedules, training, and memberships will appear here when this club is ready.
                                </p>
                            )}
                            {location.hasMemberships && (
                                <button
                                    onClick={handleMembershipClick}
                                    className="w-full font-bold py-3 px-5 rounded-lg transition-colors inline-flex items-center justify-center gap-2 border border-picktopia-orange text-picktopia-orange hover:bg-picktopia-orange hover:text-white"
                                >
                                    <CreditCard className="w-4 h-4" />
                                    Memberships
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {location.layoutImage && (
                    <section className="max-w-6xl mx-auto">
                        <h2 className="font-heading text-2xl font-bold text-picktopia-blue-dark mb-4">
                            Facility Layout
                        </h2>
                        <img
                            src={location.layoutImage}
                            alt={`${location.name} facility layout`}
                            className="w-full rounded-lg border border-gray-200"
                        />
                    </section>
                )}

                {location.faqs.length > 0 && (
                    <section className="max-w-4xl mx-auto">
                        <FaqSection
                            data={{
                                title: `${location.name} FAQs`,
                                questions: location.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))
                            }}
                        />
                    </section>
                )}

                {featuredLocation && (
                    <section className="max-w-6xl mx-auto bg-picktopia-blue-dark text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <p className="font-heading text-xl font-bold">
                                Also Visit {featuredLocation.name}
                            </p>
                            <p className="text-blue-100 text-sm">
                                Compare facilities and find the best club for your next game.
                            </p>
                        </div>
                        <button
                            onClick={() => navigateTo && navigateTo(getLocationPageName(featuredLocation.id))}
                            className="bg-white text-picktopia-blue-dark px-5 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                        >
                            View Club
                        </button>
                    </section>
                )}
            </div>
        </div>
    );
};

export default LocationDetailPage;
