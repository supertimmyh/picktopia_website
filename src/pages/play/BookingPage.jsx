import React from 'react';
import HeroSection from '../../components/HeroSection';
import BookingSection from '../../components/sections/BookingSection';
import { bookingData } from '../../data/play/bookingData';

const BookingPage = () => {
    const content = {
        title: bookingData.title,
        subtitle: bookingData.subtitle,
        heroImage: bookingData.heroImage,
        section: bookingData
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