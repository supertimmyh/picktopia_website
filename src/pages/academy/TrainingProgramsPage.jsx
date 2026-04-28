import React from 'react';
import HeroSection from '../../components/HeroSection';
import PricingTable from '../../components/PricingTable';
import { trainingProgramsData } from '../../data/academy/trainingProgramsData';
import { withAssetPaths } from '../../utils/dataWithAssets';

const TrainingProgramsPage = () => {
    const content = withAssetPaths(trainingProgramsData);

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
            </div>
        </div>
    );
};

export default TrainingProgramsPage;