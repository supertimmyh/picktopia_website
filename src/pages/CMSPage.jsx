import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { getStaticContent } from '../utils/contentLoader';

const CMSPage = ({ pageSlug }) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
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
                <div className="max-w-4xl mx-auto">
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
                </div>
            </div>
        </div>
    );
};

export default CMSPage;