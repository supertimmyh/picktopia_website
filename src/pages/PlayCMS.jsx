import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import BookingSection from '../components/sections/BookingSection';
import ProgramScheduleSection from '../components/sections/ProgramScheduleSection';
import TrainingProgramsSection from '../components/sections/TrainingProgramsSection';
import FreeIntroSection from '../components/sections/FreeIntroSection';
import { getStaticContent } from '../utils/contentLoader';

const PlayCMS = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Try to load from markdown file first
                try {
                    const response = await fetch(`/src/content/pages/play.md`);
                    if (response.ok) {
                        const markdownText = await response.text();
                        const frontMatterMatch = markdownText.match(/^---\n([\s\S]*?)\n---/);
                        
                        if (frontMatterMatch) {
                            const frontMatter = frontMatterMatch[1];
                            const parsedContent = parseFrontMatter(frontMatter);
                            setContent(parsedContent);
                            setLoading(false);
                            return;
                        }
                    }
                } catch (mdError) {
                    console.log('Markdown file not found, falling back to static content');
                }

                // Fallback to static content
                const cmsContent = getStaticContent();
                const pageContent = cmsContent.play;
                
                if (pageContent) {
                    setContent(pageContent);
                } else {
                    console.error(`Page content not found for play page`);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading CMS content:', error);
                setLoading(false);
            }
        };

        loadContent();
    }, []);

    // Simple YAML front matter parser
    const parseFrontMatter = (frontMatter) => {
        const lines = frontMatter.split('\n');
        const result = { sections: [] };
        let currentSection = null;
        let inSections = false;

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            if (trimmedLine === 'sections:') {
                inSections = true;
                continue;
            }

            if (inSections) {
                if (line.startsWith('  - title:')) {
                    if (currentSection) {
                        result.sections.push(currentSection);
                    }
                    currentSection = { title: line.split('title:')[1].trim().replace(/"/g, '') };
                } else if (line.startsWith('    ') && currentSection) {
                    const keyValue = line.trim();
                    if (keyValue.startsWith('subtitle:')) {
                        currentSection.subtitle = keyValue.split('subtitle:')[1].trim().replace(/"/g, '');
                    } else if (keyValue.startsWith('backgroundColor:')) {
                        currentSection.backgroundColor = keyValue.split('backgroundColor:')[1].trim().replace(/"/g, '');
                    } else if (keyValue.startsWith('textColor:')) {
                        currentSection.textColor = keyValue.split('textColor:')[1].trim().replace(/"/g, '');
                    } else if (keyValue.startsWith('titleColor:')) {
                        currentSection.titleColor = keyValue.split('titleColor:')[1].trim().replace(/"/g, '');
                    } else if (keyValue.startsWith('bookingUrl:')) {
                        currentSection.bookingUrl = keyValue.split('bookingUrl:')[1].trim().replace(/"/g, '');
                    } else if (keyValue.startsWith('bookingText:')) {
                        currentSection.bookingText = keyValue.split('bookingText:')[1].trim().replace(/"/g, '');
                    } else if (keyValue.startsWith('content: |')) {
                        currentSection.content = '';
                        for (let i = lines.indexOf(line) + 1; i < lines.length; i++) {
                            const contentLine = lines[i];
                            if (!contentLine.startsWith('      ') && contentLine.trim() && !contentLine.startsWith('  - ')) {
                                break;
                            }
                            if (contentLine.startsWith('      ')) {
                                currentSection.content += contentLine.substring(6) + '\n';
                            }
                        }
                        currentSection.content = currentSection.content.trim();
                    }
                }
            } else {
                if (trimmedLine.includes(':')) {
                    const [key, ...valueParts] = trimmedLine.split(':');
                    const value = valueParts.join(':').trim().replace(/"/g, '');
                    result[key.trim()] = value;
                }
            }
        }

        if (currentSection) {
            result.sections.push(currentSection);
        }

        return result;
    };

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

    // Extract sections by title
    const sections = content.sections || [];
    const bookingSection = sections.find(s => s.title === 'Booking');
    const programSection = sections.find(s => s.title === 'Program Schedule');  
    const trainingSection = sections.find(s => s.title === 'Training Programs');
    const introSection = sections.find(s => s.title === 'Free Pickleball Intro');

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title={content.title}
                subtitle={content.subtitle}
                backgroundImage={content.heroImage}
                size="large"
                overlayColor="blue"
            />

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {bookingSection && <BookingSection content={bookingSection} />}
                    {programSection && <ProgramScheduleSection content={programSection} />}
                    {trainingSection && <TrainingProgramsSection content={trainingSection} />}
                    {introSection && <FreeIntroSection content={introSection} />}
                </div>
            </div>
        </div>
    );
};

export default PlayCMS;