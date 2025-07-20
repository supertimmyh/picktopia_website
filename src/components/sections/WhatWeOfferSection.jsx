import React from 'react';

const WhatWeOfferSection = ({ content }) => {
    if (!content || !content.features) return null;

    const features = Array.isArray(content.features) ? content.features : [];

    return (
        <div className="bg-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <h2 className="font-heading text-3xl font-black text-yellow-900 mb-8 tracking-wider uppercase">
                {content.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-yellow-900">
                <ul className="space-y-4">
                    {features.slice(0, 3).map((featureItem, index) => {
                        const featureText = featureItem?.feature || featureItem || '';
                        return (
                            <li key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                <span 
                                    className="font-body text-base font-normal leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: featureText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }}
                                />
                            </li>
                        );
                    })}
                </ul>
                <ul className="space-y-4">
                    {features.slice(3).map((featureItem, index) => {
                        const featureText = featureItem?.feature || featureItem || '';
                        return (
                            <li key={index + 3} className="flex items-start">
                                <span className="w-2 h-2 bg-yellow-900 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                                <span 
                                    className="font-body text-base font-normal leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: featureText.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default WhatWeOfferSection;