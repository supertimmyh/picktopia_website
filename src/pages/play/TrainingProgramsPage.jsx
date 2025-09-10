import React from 'react';
import HeroSection from '../../components/HeroSection';
import CoachBiographyCard from '../../components/CoachBiographyCard';
import ProgramCard from '../../components/ProgramCard';
import TestimonialCard from '../../components/TestimonialCard';
import PricingTable from '../../components/PricingTable';
import { trainingProgramsData } from '../../data/play/trainingProgramsData';
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

                {/* Training Programs Grid */}
                {content.programs && content.programs.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold font-heading text-picktopia-blue-dark text-center mb-8">
                            Our Training Programs
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                            {content.programs.map((program, index) => (
                                <ProgramCard
                                    key={index}
                                    program={program}
                                    bookingUrl={content.bookingUrl}
                                    bookingText={content.bookingText}
                                />
                            ))}
                        </div>
                    </section>
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

                {/* Meet Our Pros */}
                {content.coaches && content.coaches.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold font-heading text-picktopia-blue-dark text-center mb-8">
                            Meet Our Pros
                        </h2>
                        <div className={`grid grid-cols-1 gap-6 max-w-6xl mx-auto ${
                            content.coaches.length <= 2 
                                ? 'md:grid-cols-2 justify-items-center' 
                                : 'md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                            {content.coaches.map((coach, index) => (
                                <CoachBiographyCard key={index} coach={coach} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Student Testimonials */}
                {content.testimonials && content.testimonials.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold font-heading text-picktopia-blue-dark text-center mb-8">
                            What Our Students Say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {content.testimonials.map((testimonial, index) => (
                                <TestimonialCard key={index} testimonial={testimonial} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default TrainingProgramsPage;