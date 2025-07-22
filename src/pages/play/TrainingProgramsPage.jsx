import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/HeroSection';
import CoachBiographyCard from '../../components/CoachBiographyCard';
import ProgramCard from '../../components/ProgramCard';
import TestimonialCard from '../../components/TestimonialCard';
import PricingTable from '../../components/PricingTable';
import { loadSubpageContent, getStaticContent } from '../../utils/contentLoader';

const TrainingProgramsPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Try to load from markdown file first
                const markdownContent = await loadSubpageContent('play', 'training-programs');
                
                if (markdownContent) {
                    const { frontmatter, content: markdownBody } = markdownContent;
                    setContent({
                        title: frontmatter.title,
                        subtitle: frontmatter.subtitle,
                        heroImage: frontmatter.heroImage,
                        bookingUrl: frontmatter.bookingUrl,
                        bookingText: frontmatter.bookingText,
                        coaches: frontmatter.coaches || [],
                        programs: frontmatter.programs || [],
                        testimonials: frontmatter.testimonials || [],
                        content: markdownBody
                    });
                } else {
                    // Fallback to Lorem ipsum content
                    setContent({
                        title: 'Lorem Ipsum Training',
                        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                        heroImage: '/assets/place-holder.jpg',
                        bookingUrl: '#',
                        bookingText: 'Lorem Booking',
                        coaches: [
                            {
                                name: 'Lorem Coach',
                                image: '/assets/place-holder.jpg',
                                certifications: 'Lorem Ipsum Certified',
                                experience: 'X years',
                                specialties: ['Lorem', 'Ipsum', 'Dolor'],
                                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                                availability: 'Lorem ipsum schedule'
                            }
                        ],
                        programs: [
                            {
                                title: 'Lorem Program',
                                duration: 'XX minutes',
                                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                                features: ['Lorem feature', 'Ipsum feature', 'Dolor feature'],
                                memberPrice: '$XX',
                                nonMemberPrice: '$XX',
                                skillLevel: 'Lorem level',
                                equipment: 'Lorem equipment'
                            }
                        ],
                        testimonials: [
                            {
                                name: 'Lorem Person',
                                quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                                program: 'Lorem Program',
                                rating: 5
                            }
                        ],
                        content: '<h2>Lorem Ipsum</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>'
                    });
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading training programs content:', error);
                setLoading(false);
            }
        };

        loadContent();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    Loading...
                </div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-red-600">
                    Page not found
                </div>
            </div>
        );
    }

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

                {/* Meet Our Coaches */}
                {content.coaches && content.coaches.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold font-heading text-picktopia-blue-dark text-center mb-8">
                            Meet Our Certified Coaches
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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