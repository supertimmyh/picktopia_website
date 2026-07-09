import React, { useEffect, useState } from 'react';
import HeroSection from '../../components/HeroSection';
import BookingSection from '../../components/sections/BookingSection';
import LocationCrossPromotion from '../../components/LocationCrossPromotion';
import { bookingData } from '../../data/play/bookingData';
import { withAssetPaths } from '../../utils/dataWithAssets';
import { loadLocation } from '../../utils/contentLoader';
import { updateSeo } from '../../utils/seo';

const BookingPage = ({ locationId, navigateTo }) => {
    const [location, setLocation] = useState(null);
    const processedData = withAssetPaths(bookingData);
    const locationName = location?.name?.replace(/^Picktopia\s+/i, '') || '';
    const locationLabel = locationName ? ` in ${locationName}` : '';
    const content = {
        title: `${processedData.title}${locationLabel}`,
        subtitle: location
            ? `Reserve courts, programs, and play time at ${location.name}.`
            : processedData.subtitle,
        heroImage: location?.image || processedData.heroImage,
        section: {
            ...processedData,
            title: `${processedData.title}${locationLabel}`,
            subtitle: location
                ? `Booking your spot at ${location.name} is easy.`
                : processedData.subtitle,
            bookingUrl: location?.bookingLink || location?.bookingUrl || processedData.bookingUrl,
            bookingText: locationName ? `Book at ${locationName}` : processedData.bookingText,
            phoneNumber: location?.phone?.replace(/\D/g, '') || processedData.phoneNumber
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
                ? `Book pickleball courts and programs at ${location.name}.`
                : 'Book pickleball courts and programs at Picktopia.'
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

            <div className="container mx-auto px-6 py-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    <BookingSection content={content.section} />
                    <LocationCrossPromotion currentLocationId={locationId} navigateTo={navigateTo} />
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
