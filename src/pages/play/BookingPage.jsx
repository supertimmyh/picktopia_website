import React from 'react';
import HeroSection from '../../components/HeroSection';
import BookingSection from '../../components/sections/BookingSection';
import { bookingData } from '../../data/play/bookingData';
import { withAssetPaths } from '../../utils/dataWithAssets';

const BookingPage = () => {
    const processedData = withAssetPaths(bookingData);
    const content = {
        title: processedData.title,
        subtitle: processedData.subtitle,
        heroImage: processedData.heroImage,
        section: processedData
    };

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
                <div className="max-w-6xl mx-auto">
                    <BookingSection content={content.section} />
                </div>
            </div>
        </div>
    );
};

export default BookingPage;