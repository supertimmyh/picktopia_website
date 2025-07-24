import React, { useState, useEffect } from 'react';
import ImageContentSection from '../../components/ImageContentSection';
import FreeIntroSection from '../../components/sections/FreeIntroSection';
import { loadSubpageContent, getStaticContent } from '../../utils/contentLoader';

const FreePickleballIntroPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Try to load from markdown file first
                const markdownContent = await loadSubpageContent('play', 'free-pickleball-intro');
                
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
                        const introSection = playContent.sections.find(s => s.title === 'Free Pickleball Intro');
                        if (introSection) {
                            setContent({
                                title: 'Free Pickleball Intro',
                                subtitle: introSection.subtitle,
                                heroImage: playContent.heroImage,
                                section: introSection
                            });
                        }
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading free intro content:', error);
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
            <ImageContentSection
                title={content.title}
                subtitle={content.subtitle}
                backgroundImage={content.heroImage}
                size="large"
                imagePosition="right"
                padding="large"
            />

            <div className="container mx-auto px-6 py-8">
                <div className="max-w-6xl mx-auto">
                    <FreeIntroSection content={content.section} />
                </div>
            </div>
        </div>
    );
};

export default FreePickleballIntroPage;