import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/HeroSection';
import BookingSection from '../../components/sections/BookingSection';
import { loadSubpageContent, getStaticContent } from '../../utils/contentLoader';

const BookingPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Try to load from markdown file first
                const markdownContent = await loadSubpageContent('play', 'booking');
                
                if (markdownContent) {
                    const { frontmatter, content: markdownBody } = markdownContent;
                    setContent({
                        title: frontmatter.title,
                        subtitle: frontmatter.subtitle,
                        heroImage: frontmatter.heroImage,
                        section: {
                            title: frontmatter.title,
                            subtitle: frontmatter.subtitle,
                            bookingUrl: frontmatter.bookingUrl,
                            bookingText: frontmatter.bookingText,
                            backgroundColor: frontmatter.backgroundColor,
                            textColor: frontmatter.textColor,
                            titleColor: frontmatter.titleColor,
                            content: markdownBody
                        }
                    });
                } else {
                    // Fallback to static content
                    const cmsContent = getStaticContent();
                    const playContent = cmsContent.play;
                    
                    if (playContent && playContent.sections) {
                        const bookingSection = playContent.sections.find(s => s.title === 'Booking');
                        if (bookingSection) {
                            setContent({
                                title: 'Court Booking',
                                subtitle: bookingSection.subtitle,
                                heroImage: playContent.heroImage,
                                section: bookingSection
                            });
                        }
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading booking content:', error);
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

            <div className="container mx-auto px-6 py-8">
                <div className="max-w-6xl mx-auto">
                    <BookingSection content={content.section} />
                </div>
            </div>
        </div>
    );
};

export default BookingPage;