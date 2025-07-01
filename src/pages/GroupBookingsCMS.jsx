import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import WhyBookSection from '../components/sections/WhyBookSection';
import EventPackagesSection from '../components/sections/EventPackagesSection';
import FacilitiesSection from '../components/sections/FacilitiesSection';
import BookingProcessSection from '../components/sections/BookingProcessSection';
import GroupBookingForm from '../components/GroupBookingForm';
import FaqSection from '../components/sections/GroupBookingFaqSection';
import { getStaticContent } from '../utils/contentLoader';

const GroupBookingsCMS = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Try to load from markdown file first
                try {
                    const response = await fetch(`/src/content/pages/group-bookings.md`);
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
                const pageContent = cmsContent['group-bookings'];
                
                if (pageContent) {
                    setContent(pageContent);
                } else {
                    console.error(`Page content not found for group bookings page`);
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
        const result = {};
        let currentKey = null;
        let currentObj = null;
        let currentArray = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmedLine = line.trim();
            if (!trimmedLine) continue;

            const currentIndent = line.length - line.trimStart().length;

            if (trimmedLine.includes(':') && !trimmedLine.startsWith('-')) {
                const [key, ...valueParts] = trimmedLine.split(':');
                const value = valueParts.join(':').trim().replace(/"/g, '');

                if (currentIndent === 0) {
                    // Top level key
                    currentKey = key.trim();
                    if (value) {
                        result[currentKey] = value;
                    } else {
                        result[currentKey] = {};
                        currentObj = result[currentKey];
                    }
                } else if (currentIndent === 2 && currentObj) {
                    // Second level key
                    if (value) {
                        currentObj[key.trim()] = value;
                        if (key.trim().endsWith('s') && !value) {
                            currentObj[key.trim()] = [];
                            currentArray = currentObj[key.trim()];
                        }
                    } else {
                        currentObj[key.trim()] = [];
                        currentArray = currentObj[key.trim()];
                    }
                }
            } else if (trimmedLine.startsWith('- ') && currentArray) {
                // Array item
                const itemText = trimmedLine.substring(2);
                if (itemText.includes(':')) {
                    const [itemKey, ...itemValueParts] = itemText.split(':');
                    const itemValue = itemValueParts.join(':').trim().replace(/"/g, '');
                    
                    if (currentArray.length === 0 || typeof currentArray[currentArray.length - 1] === 'string') {
                        currentArray.push({ [itemKey.trim()]: itemValue });
                    } else {
                        currentArray[currentArray.length - 1][itemKey.trim()] = itemValue;
                    }
                } else {
                    currentArray.push(itemText.replace(/"/g, ''));
                }
            } else if (currentIndent > 2 && line.includes(':')) {
                // Nested properties
                const [nestedKey, ...nestedValueParts] = trimmedLine.split(':');
                const nestedValue = nestedValueParts.join(':').trim().replace(/"/g, '');
                
                if (currentArray && currentArray.length > 0 && typeof currentArray[currentArray.length - 1] === 'object') {
                    if (nestedKey.trim().endsWith('s') && !nestedValue) {
                        currentArray[currentArray.length - 1][nestedKey.trim()] = [];
                    } else {
                        currentArray[currentArray.length - 1][nestedKey.trim()] = nestedValue;
                    }
                }
            } else if (trimmedLine.startsWith('- ') && currentIndent > 2) {
                // Nested array items
                const nestedItem = trimmedLine.substring(2).replace(/"/g, '');
                if (currentArray && currentArray.length > 0 && typeof currentArray[currentArray.length - 1] === 'object') {
                    const lastItem = currentArray[currentArray.length - 1];
                    const arrayKeys = Object.keys(lastItem).filter(k => Array.isArray(lastItem[k]));
                    if (arrayKeys.length > 0) {
                        lastItem[arrayKeys[arrayKeys.length - 1]].push(nestedItem);
                    }
                }
            }
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
                overlayColor="orange"
            />

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-6xl mx-auto space-y-16">
                    {/* Why Book With Us Section */}
                    {content.whyBookWithUs && <WhyBookSection content={content.whyBookWithUs} />}
                    
                    {/* Event Packages Section */}
                    {content.eventPackages && <EventPackagesSection content={content.eventPackages} />}
                    
                    {/* Facilities & Add-Ons Section */}
                    {content.facilities && <FacilitiesSection content={content.facilities} />}
                    
                    {/* How to Book Section */}
                    {content.bookingProcess && <BookingProcessSection content={content.bookingProcess} />}
                    
                    {/* Group Booking Form */}
                    <GroupBookingForm />
                    
                    {/* FAQ Section */}
                    {content.faq && <FaqSection content={content.faq} contact={content.contact} />}
                </div>
            </div>
        </div>
    );
};

export default GroupBookingsCMS;