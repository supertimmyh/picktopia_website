import React from 'react';
import GetNotified from '../components/GetNotified';
import HeroSection from '../components/HeroSection';
import { aboutUsData } from '../data/aboutUsData';
import { CMS_DATA } from '../data/data';
import { withAssetPaths } from '../utils/dataWithAssets';

const AboutUsPage = () => {
    const content = withAssetPaths(aboutUsData);

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
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Intro Text */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                        <div 
                            className="font-body text-lg leading-relaxed text-gray-600 font-normal prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ __html: content.intro.replace(/\*\*(.*?)\*\*/g, '<strong class="text-picktopia-blue-dark font-bold">$1</strong>') }}
                        />
                    </div>

                    {/* What We Offer Section */}
                    {content.whatWeOffer && (
                        <div className="bg-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                            <h2 className="font-heading text-3xl font-black text-yellow-900 mb-8 tracking-wider uppercase">
                                {content.whatWeOffer.title}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8 text-yellow-900">
                                <ul className="space-y-4">
                                    {content.whatWeOffer.features.slice(0, 3).map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="w-2 h-2 bg-yellow-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                            <span 
                                                className="font-body text-base font-normal leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                                <ul className="space-y-4">
                                    {content.whatWeOffer.features.slice(3).map((feature, index) => (
                                        <li key={index + 3} className="flex items-start">
                                            <span className="w-2 h-2 bg-yellow-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                            <span 
                                                className="font-body text-base font-normal leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: feature.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Get Notified Section with Image */}
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Get Notified Component */}
                        <GetNotified />
                        
                        {/* Placeholder Image */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                            <img
                                src={content.heroImage}
                                alt="Picktopia Club Interior"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Closing Statement */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center">
                        <div 
                            className="font-body text-lg leading-relaxed text-gray-600 mb-8 font-normal prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{ 
                                __html: content.closing
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-picktopia-orange font-semibold">$1</strong>')
                                    .replace(/\n\n/g, '</p><p class="font-body text-lg leading-relaxed text-gray-600 mb-8 font-normal">')
                                    .replace(/^/, '<p class="font-body text-lg leading-relaxed text-gray-600 mb-6 font-normal">')
                                    .replace(/$/, '</p>')
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;