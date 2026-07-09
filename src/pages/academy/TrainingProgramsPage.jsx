import React, { useEffect, useState } from 'react';
import HeroSection from '../../components/HeroSection';
import PricingTable from '../../components/PricingTable';
import LocationCrossPromotion from '../../components/LocationCrossPromotion';
import { trainingProgramsData } from '../../data/academy/trainingProgramsData';
import { withAssetPaths } from '../../utils/dataWithAssets';
import { loadLocation } from '../../utils/contentLoader';
import { updateSeo } from '../../utils/seo';

const TrainingProgramsPage = ({ locationId, navigateTo }) => {
    const [location, setLocation] = useState(null);
    const baseContent = withAssetPaths(trainingProgramsData);
    const locationName = location?.name?.replace(/^Picktopia\s+/i, '') || '';
    const locationLabel = locationName ? ` in ${locationName}` : '';
    const content = {
        ...baseContent,
        title: `${baseContent.title}${locationLabel}`,
        subtitle: location
            ? `Build your game with coaching and clinics at ${location.name}.`
            : baseContent.subtitle,
        heroImage: location?.image || baseContent.heroImage,
        bookingUrl: location?.bookingLink || location?.bookingUrl || baseContent.bookingUrl,
        bookingText: locationName ? `Book Training at ${locationName}` : baseContent.bookingText
    };

    useEffect(() => {
        const fetchLocation = async () => {
            if (!locationId) return;
            const selectedLocation = await loadLocation(locationId);
            setLocation(selectedLocation);
        };

        fetchLocation();
    }, [locationId]);

    useEffect(() => {
        updateSeo({
            title: `${content.title} | Picktopia`,
            description: location
                ? `Explore pickleball training programs, clinics, and coaching at ${location.name}.`
                : 'Explore Picktopia pickleball training programs, clinics, and coaching.'
        });
    }, [content.title, location]);

    return (
        <div className="min-h-screen">
            <HeroSection
                title={content.title}
                subtitle={content.subtitle}
                backgroundImage={content.heroImage}
                size="large"
                overlayColor="blue"
            />

            <div className="container mx-auto px-6 py-12 space-y-16">
                {/* Introduction Content */}
                {content.content && (
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none text-center">
                            <div dangerouslySetInnerHTML={{ __html: content.content }} />
                        </div>
                    </div>
                )}

                {/* Pricing Table */}
                {content.programs && content.programs.length > 0 && (
                    <section className="max-w-6xl mx-auto">
                        <PricingTable
                            programs={content.programs}
                            bookingUrl={content.bookingUrl}
                            bookingText={content.bookingText}
                        />
                    </section>
                )}

                <LocationCrossPromotion currentLocationId={locationId} navigateTo={navigateTo} />
            </div>
        </div>
    );
};

export default TrainingProgramsPage;
