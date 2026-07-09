import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import { featuredProgramsData } from '../data/featuredProgramsData';
import { loadLocations } from '../utils/contentLoader';
import { getLocationPageName } from '../utils/navigation';
import { updateSeo } from '../utils/seo';

const FeaturedProgramsPage = ({ navigateTo }) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const loadedLocations = await loadLocations();
            setLocations(loadedLocations);
        };

        fetchLocations();
        updateSeo({
            title: 'Programs | Picktopia',
            description: 'Explore Picktopia featured programs across club locations.'
        });
    }, []);

    const getLocationNames = (locationIds) => {
        return locationIds
            .map((locationId) => locations.find((location) => location.id === locationId)?.name || locationId)
            .map((name) => name.replace(/^Picktopia\s+/i, ''));
    };

    const handleProgramClick = (program) => {
        if (program.locations.length === 1) {
            navigateTo(getLocationPageName(program.locations[0], program.routeType));
            return;
        }

        navigateTo('clubs');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <HeroSection
                title={featuredProgramsData.title}
                subtitle={featuredProgramsData.subtitle}
                backgroundImage="/images/training/training-hero.jpg"
                size="large"
                overlayColor="blue"
            />

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-7xl mx-auto space-y-10">
                    <section className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
                        <div>
                            <p className="text-picktopia-orange font-bold uppercase tracking-wide mb-2">
                                Cross-Location Programs
                            </p>
                            <h2 className="font-heading text-3xl font-bold text-picktopia-blue-dark mb-4">
                                Featured offers by club availability.
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Programs can run at one club, several clubs, or future clubs as they launch. Each card routes you to the relevant location context.
                            </p>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-5">
                            <p className="font-heading text-xl font-bold text-picktopia-blue-dark mb-2">
                                Looking for regular court schedules?
                            </p>
                            <button
                                onClick={() => navigateTo('clubs')}
                                className="text-picktopia-orange font-bold hover:text-orange-700 inline-flex items-center gap-2"
                            >
                                Choose a club
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        {featuredProgramsData.programs.map((program) => {
                            const locationNames = getLocationNames(program.locations);

                            return (
                                <article key={program.title} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                                    <div className="p-6 space-y-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <span className="inline-flex items-center gap-2 bg-picktopia-blue-dark text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3">
                                                    <Sparkles className="w-3 h-3" />
                                                    {program.category}
                                                </span>
                                                <h3 className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                                                    {program.title}
                                                </h3>
                                            </div>
                                            <span className="bg-picktopia-orange/10 text-picktopia-orange px-3 py-1 rounded-full text-xs font-bold">
                                                {program.status}
                                            </span>
                                        </div>

                                        <p className="text-gray-700 leading-relaxed">
                                            {program.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {locationNames.map((locationName) => (
                                                <span key={locationName} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-semibold">
                                                    <MapPin className="w-3 h-3 text-picktopia-orange" />
                                                    {locationName}
                                                </span>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => handleProgramClick(program)}
                                            className="w-full bg-picktopia-orange text-white font-bold py-3 px-5 rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center justify-center gap-2"
                                        >
                                            {program.primaryAction}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProgramsPage;
