import React from 'react';

const InclusionsSection = ({ content }) => {
    const { title, subtitle, standardInclusions, addOns } = content || {};

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center text-picktopia-blue-dark">
                {title || "What's Included"}
            </h2>
            <p className="font-body text-lg text-center mb-12 max-w-3xl mx-auto text-gray-700">
                {subtitle || "Every group booking comes with these standard inclusions to ensure your event is a success."}
            </p>
            
            {/* Standard Inclusions */}
            <div className="mb-12">
                <h3 className="font-heading text-2xl font-bold text-picktopia-orange mb-8 text-center">
                    Standard Inclusions
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {standardInclusions?.map((inclusion, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-heading text-lg font-bold text-picktopia-blue-dark mb-2">
                                {inclusion.title}
                            </h4>
                            <p className="font-body text-gray-600 text-sm leading-relaxed">
                                {inclusion.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Available Add-Ons */}
            <div>
                <h3 className="font-heading text-2xl font-bold text-picktopia-orange mb-8 text-center">
                    Available Add-Ons
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {addOns?.map((addOn, index) => (
                        <div key={index} className="bg-picktopia-blue-dark text-white p-4 rounded-lg">
                            <div className="flex items-center text-sm">
                                <span className="w-2 h-2 bg-picktopia-orange rounded-full mr-3 flex-shrink-0"></span>
                                <div>
                                    <span className="font-heading font-bold block">{addOn.title}</span>
                                    <span className="font-body text-gray-300 text-xs">{addOn.description}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InclusionsSection;