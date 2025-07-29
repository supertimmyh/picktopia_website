import React, { useState, useEffect } from 'react';
import ImageContentSection from '../../components/ImageContentSection';
import ProgramScheduleSection from '../../components/sections/ProgramScheduleSection';
import { loadSubpageContent, getStaticContent } from '../../utils/contentLoader';

const ProgramSchedulePage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Try to load from markdown file first
                const markdownContent = await loadSubpageContent('play', 'program-schedule');
                
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
                        const programSection = playContent.sections.find(s => s.title === 'Program Schedule');
                        if (programSection) {
                            setContent({
                                title: 'Program Schedule',
                                subtitle: programSection.subtitle,
                                heroImage: playContent.heroImage,
                                section: programSection
                            });
                        }
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading program schedule content:', error);
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
                padding="large"
            />

            <div className="w-full max-w-none px-12 py-8">
                <ProgramScheduleSection content={content.section} />
            </div>
        </div>
    );
};

export default ProgramSchedulePage;