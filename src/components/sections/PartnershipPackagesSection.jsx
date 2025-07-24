import React from 'react';
import { Button } from '../ui/button';

const PartnershipPackagesSection = ({ content, packages }) => {
    // Use content from props or fallback to static data
    const title = content?.packagesTitle || "Partnership Packages";
    const subtitle = content?.packagesSubtitle || "Choose the partnership level that aligns with your business goals and community involvement vision.";
    const customTitle = content?.customTitle || "Let's Create Something Unique Together";
    const customDescription = content?.customDescription || "We believe the best partnerships are customized to create mutual value.";
    
    // Use packages from props or fallback to empty array
    const packageData = packages || [];

    const scrollToForm = () => {
        const formElement = document.querySelector('form');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center text-picktopia-blue-dark">
                {title}
            </h2>
            <p className="font-body text-lg text-center mb-12 max-w-3xl mx-auto text-gray-700">
                {subtitle}
            </p>
            
            <div className="space-y-8">
                {packageData.map((pkg, index) => (
                    <div 
                        key={index} 
                        className={`border rounded-xl overflow-hidden ${
                            pkg.featured 
                                ? 'border-picktopia-orange border-2 bg-gradient-to-r from-picktopia-orange/5 to-picktopia-blue-dark/5' 
                                : 'border-gray-200 bg-gray-50'
                        }`}
                    >
                        {/* Package Header */}
                        <div className={`p-6 ${pkg.featured ? 'bg-picktopia-orange text-white' : 'bg-picktopia-blue-dark text-white'}`}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-heading text-2xl font-bold mb-2">
                                        {pkg.title}
                                    </h3>
                                    <p className="font-body text-lg opacity-90">
                                        {pkg.subtitle}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-heading text-xl font-bold">
                                        {pkg.pricing}
                                    </p>
                                    {pkg.featured && (
                                        <span className="inline-block bg-white text-picktopia-orange text-xs font-bold px-2 py-1 rounded-full mt-2">
                                            MOST POPULAR
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Package Content */}
                        <div className="p-6">
                            <div className="grid lg:grid-cols-3 gap-6">
                                {pkg.categories.map((category, catIndex) => (
                                    <div key={catIndex} className="space-y-4">
                                        <h4 className="font-heading text-lg font-bold text-picktopia-blue-dark border-b border-picktopia-orange pb-2">
                                            {category.title}
                                        </h4>
                                        <ul className="space-y-2">
                                            {category.benefits.map((benefit, benefitIndex) => (
                                                <li key={benefitIndex} className="flex items-start text-sm">
                                                    <span className="w-2 h-2 bg-picktopia-orange rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                                    <span className="font-body text-gray-700 leading-relaxed">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            
                            {/* CTA Button */}
                            <div className="text-center mt-8 pt-6 border-t border-gray-200">
                                <Button
                                    variant={pkg.featured ? "picktopia" : "outline"}
                                    size="lg"
                                    className="px-8"
                                    onClick={scrollToForm}
                                >
                                    Get Partnership Details
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Partnership CTA */}
            <div className="mt-12 text-center p-8 bg-picktopia-blue-dark rounded-xl text-white">
                <h3 className="font-heading text-2xl font-bold mb-4">
                    {customTitle}
                </h3>
                <p className="font-body text-lg mb-6 max-w-2xl mx-auto">
                    {customDescription}
                </p>
                <Button
                    variant="picktopia"
                    size="lg"
                    className="px-8"
                    onClick={scrollToForm}
                >
                    Explore Custom Partnership
                </Button>
            </div>
        </div>
    );
};

export default PartnershipPackagesSection;