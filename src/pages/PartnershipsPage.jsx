import React from 'react';
import HeroSection from '../components/HeroSection';
import WhyPartnerSection from '../components/sections/WhyPartnerSection';
import PartnershipPackagesSection from '../components/sections/PartnershipPackagesSection';
import PartnershipInquiryForm from '../components/PartnershipInquiryForm';
import { partnershipData } from '../data/partnershipData';
import { withAssetPaths } from '../utils/dataWithAssets';

const PartnershipsPage = () => {
    const content = withAssetPaths(partnershipData);

    return (
        <div className="min-h-screen">
            {/* Hero Section with Stats */}
            <div className="relative">
                <HeroSection
                    title={content.title}
                    subtitle={content.subtitle}
                    backgroundImage={content.heroImage}
                    size="large"
                    overlayColor="blue"
                />
                
                {/* Stats Overlay */}
                {(content.monthlyVisitors || content.activeMembers) && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                {content.monthlyVisitors && (
                                    <div>
                                        <div className="font-heading text-2xl font-black text-picktopia-blue-dark">
                                            {content.monthlyVisitors}
                                        </div>
                                        <div className="font-body text-sm text-gray-600">
                                            Monthly Visitors
                                        </div>
                                    </div>
                                )}
                                {content.activeMembers && (
                                    <div>
                                        <div className="font-heading text-2xl font-black text-picktopia-blue-dark">
                                            {content.activeMembers}
                                        </div>
                                        <div className="font-body text-sm text-gray-600">
                                            Active Members
                                        </div>
                                    </div>
                                )}
                                {content.communityFocus && (
                                    <div>
                                        <div className="font-heading text-lg font-black text-picktopia-blue-dark">
                                            {content.communityFocus}
                                        </div>
                                        <div className="font-body text-sm text-gray-600">
                                            Community Focus
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="container mx-auto px-6 py-16 space-y-16">
                {/* Why Partner With Us Section */}
                <WhyPartnerSection />

                {/* Partnership Packages Section */}
                <PartnershipPackagesSection content={content} packages={content.packages || []} />

                {/* Partnership Inquiry Form */}
                <PartnershipInquiryForm />

                {/* Next Steps Section */}
                {content.nextSteps && (
                    <div className="bg-picktopia-orange text-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                        <h2 className="font-heading text-3xl md:text-4xl font-black mb-6 tracking-wider uppercase">
                            {content.nextSteps.title}
                        </h2>
                        <p className="font-body text-lg mb-8 max-w-3xl mx-auto">
                            {content.nextSteps.subtitle}
                        </p>
                        
                        {content.nextSteps.steps && content.nextSteps.steps.length > 0 && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {content.nextSteps.steps.map((step, index) => (
                                    <div key={index} className="bg-white/20 rounded-lg p-4">
                                        <div className="font-heading text-xl font-bold mb-2">{step.title}</div>
                                        <div className="font-body text-sm">{step.description}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {content.nextSteps.contact && (
                            <div className="bg-white/10 rounded-lg p-6 max-w-2xl mx-auto">
                                <h3 className="font-heading text-xl font-bold mb-4">{content.nextSteps.contact.title}</h3>
                                <div className="space-y-2 text-sm">
                                    <div><strong>Email:</strong> {content.nextSteps.contact.email}</div>
                                    <div><strong>Phone:</strong> {content.nextSteps.contact.phone}</div>
                                    <div><strong>Office Hours:</strong> {content.nextSteps.contact.hours}</div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnershipsPage;