import React from 'react';
import GetNotified from '../../components/GetNotified';
import HeroSection from '../../components/HeroSection';
import { aboutUsData } from '../../data/about/aboutUsData';
import { CMS_DATA } from '../../data/data';
import { withAssetPaths } from '../../utils/dataWithAssets';

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

                        {/* Facility Image */}
                        <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                            <img
                                src={content.facilityImage}
                                alt="Picktopia Lounge Area"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Club Policies Section */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Code of Conduct */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                            <h2 className="font-heading text-2xl font-black text-picktopia-blue-dark mb-6 tracking-wider uppercase">
                                {content.clubPolicies.codeOfConduct.title}
                            </h2>
                            <ul className="space-y-4">
                                {content.clubPolicies.codeOfConduct.rules.map((rule, index) => (
                                    <li key={index}>
                                        {typeof rule === 'string' ? (
                                            <div className="flex items-start">
                                                <span className="w-2 h-2 bg-picktopia-blue-dark rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                                <span
                                                    className="font-body text-base font-normal leading-relaxed text-gray-700"
                                                    dangerouslySetInnerHTML={{ __html: rule.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>') }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="ml-0">
                                                <div
                                                    className="font-body text-base font-normal leading-relaxed text-gray-700 mb-2"
                                                    dangerouslySetInnerHTML={{ __html: rule.title.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>') }}
                                                />
                                                <ul className="ml-6 space-y-2">
                                                    {rule.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start">
                                                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                                            <span className="font-body text-sm font-normal leading-relaxed text-gray-600">
                                                                {item}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Rules & Regulations */}
                        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                            <h2 className="font-heading text-2xl font-black text-picktopia-blue-dark mb-6 tracking-wider uppercase">
                                {content.clubPolicies.rulesAndRegulations.title}
                            </h2>
                            <ul className="space-y-4">
                                {content.clubPolicies.rulesAndRegulations.rules.map((rule, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="w-2 h-2 bg-picktopia-blue-dark rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                        <span
                                            className="font-body text-base font-normal leading-relaxed text-gray-700"
                                            dangerouslySetInnerHTML={{ __html: rule.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>') }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
