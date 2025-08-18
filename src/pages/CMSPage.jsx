import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ContentTile from '../components/ContentTile';
import { getStaticContent } from '../utils/contentLoader';

const CMSPage = ({ pageSlug }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Try to load from markdown file first
                try {
                    const response = await fetch(`/content/pages/${pageSlug}.md`);
                    if (response.ok) {
                        const markdownText = await response.text();
                        const frontMatterMatch = markdownText.match(/^---\n([\s\S]*?)\n---/);
                        
                        if (frontMatterMatch) {
                            // Parse YAML front matter (simplified)
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
                const pageContent = cmsContent[pageSlug];
                
                if (pageContent) {
                    setContent(pageContent);
                } else {
                    console.error(`Page content not found for slug: ${pageSlug}`);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading CMS content:', error);
                setLoading(false);
            }
        };

        loadContent();
    }, [pageSlug]);

    // Simple YAML front matter parser for our use case
    const parseFrontMatter = (frontMatter) => {
        const lines = frontMatter.split('\n');
        const result = { sections: [] };
        let currentKey = null;
        let currentSection = null;
        let inSections = false;
        let indentLevel = 0;

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
                    } else if (keyValue.startsWith('content: |')) {
                        currentSection.content = '';
                        let contentStarted = false;
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
                    {/* Check if content has sections (new format) */}
                    {content.sections && content.sections.length > 0 ? (
                        // New tile-based layout
                        content.sections.map((section, index) => (
                            <ContentTile
                                key={index}
                                title={section.title}
                                subtitle={section.subtitle}
                                backgroundColor={section.backgroundColor || 'bg-white'}
                                textColor={section.textColor || 'text-gray-800'}
                                titleColor={section.titleColor || 'text-picktopia-blue-dark'}
                            >
                                <div 
                                    className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ 
                                        __html: section.content
                                            .replace(/### (.*?)(?=\n|$)/g, '<h3 class="font-heading text-xl font-bold text-current mb-4 mt-6 first:mt-0">$1</h3>')
                                            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                                            .replace(/\n- /g, '\n<li>')
                                            .replace(/\n\n/g, '</p><p class="mb-4">')
                                            .replace(/^(?!<h3|<li)/, '<p class="mb-4">')
                                            .replace(/$/, '</p>')
                                            .replace(/<li>/g, '<ul class="list-disc list-inside mb-4"><li>')
                                            .replace(/<\/p>\n<ul>/g, '</p><ul>')
                                    }}
                                />
                            </ContentTile>
                        ))
                    ) : (
                        // Fallback to old format
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                            <div 
                                className="font-body text-lg leading-relaxed text-gray-600 font-normal prose prose-lg max-w-none"
                                dangerouslySetInnerHTML={{ 
                                    __html: content.body
                                        .replace(/## (.*?)(?=\n|$)/g, '<h2 class="font-heading text-2xl font-black text-picktopia-blue-dark mb-6 mt-8 first:mt-0 tracking-wider uppercase">$1</h2>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-picktopia-blue-dark font-bold">$1</strong>')
                                        .replace(/\n\n/g, '</p><p class="font-body text-lg leading-relaxed text-gray-600 mb-6 font-normal">')
                                        .replace(/^(?!<h2)/, '<p class="font-body text-lg leading-relaxed text-gray-600 mb-6 font-normal">')
                                        .replace(/$/, '</p>')
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CMSPage;