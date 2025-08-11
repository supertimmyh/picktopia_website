import React from 'react';
import HeroSection from '../components/HeroSection';
import EventPackagesSection from '../components/sections/EventPackagesSection';
import InclusionsSection from '../components/sections/InclusionsSection';
import GroupBookingForm from '../components/GroupBookingForm';
import { groupBookingData } from '../data/groupBookingData';
import { withAssetPaths } from '../utils/dataWithAssets';

const GroupBookingsPage = () => {
    const processedData = withAssetPaths(groupBookingData);
    const content = {
        hero: {
            title: processedData.title,
            subtitle: processedData.subtitle,
            heroImage: processedData.heroImage
        },
        eventPackages: processedData.eventPackages,
        inclusions: processedData.inclusions
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title={content.hero?.title}
                subtitle={content.hero?.subtitle}
                backgroundImage={content.hero?.heroImage}
                size="large"
                overlayColor="blue"
            />

            <div className="container mx-auto px-6 py-16 space-y-16">
                {/* Event Packages Section */}
                {content.eventPackages && (
                    <EventPackagesSection content={content.eventPackages} />
                )}

                {/* What's Included Section */}
                {content.inclusions && (
                    <InclusionsSection content={content.inclusions} />
                )}

                {/* Booking Form Section */}
                <GroupBookingForm />
            </div>
        </div>
    );
};

export default GroupBookingsPage;