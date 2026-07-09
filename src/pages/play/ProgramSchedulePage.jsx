import React, { useEffect, useState } from 'react';
import ImageContentSection from '../../components/ImageContentSection';
import ProgramScheduleSection from '../../components/sections/ProgramScheduleSection';
import LocationCrossPromotion from '../../components/LocationCrossPromotion';
import { programScheduleData } from '../../data/play/programScheduleData';
import { withAssetPaths } from '../../utils/dataWithAssets';
import { loadLocation } from '../../utils/contentLoader';
import { updateSeo } from '../../utils/seo';

const ProgramSchedulePage = ({ locationId, navigateTo }) => {
    const [location, setLocation] = useState(null);
    const processedData = withAssetPaths(programScheduleData);
    const locationName = location?.name?.replace(/^Picktopia\s+/i, '') || '';
    const locationLabel = locationName ? ` in ${locationName}` : '';
    const content = {
        title: `${processedData.title}${locationLabel}`,
        subtitle: location
            ? `Browse current programs and sessions at ${location.name}.`
            : processedData.subtitle,
        heroImage: location?.image || processedData.heroImage,
        section: {
            ...processedData,
            title: `${processedData.title}${locationLabel}`,
            subtitle: location
                ? `Find the right session at ${location.name}.`
                : processedData.subtitle,
            bookingUrl: location?.bookingLink || location?.bookingUrl || processedData.bookingUrl,
            scheduleEmbedUrl: location?.scheduleEmbedUrl,
            scheduleEmbedClass: location?.scheduleEmbedClass
        }
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
                ? `View pickleball program schedules and sessions at ${location.name}.`
                : 'View Picktopia pickleball program schedules and sessions.'
        });
    }, [content.title, location]);

    return (
        <div className="min-h-screen">
            <ImageContentSection
                title={content.title}
                subtitle={content.subtitle}
                backgroundImage={content.heroImage}
                size="large"
                padding="large"
            />

            <div className="w-full max-w-none px-12 py-8">
                <ProgramScheduleSection content={content.section} />
                <div className="mt-8">
                    <LocationCrossPromotion currentLocationId={locationId} navigateTo={navigateTo} />
                </div>
            </div>
        </div>
    );
};

export default ProgramSchedulePage;
