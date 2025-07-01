import React from 'react';

const EventPackagesSection = ({ content }) => {
    const packages = content?.packages || [];

    return (
        <div className="bg-picktopia-blue-dark text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center">
                {content?.title || "Our Event Packages"}
            </h2>
            <p className="font-body text-lg text-center mb-12 max-w-3xl mx-auto">
                {content?.subtitle || "We offer flexible options to suit your group's needs, from casual get-togethers to full-facility buyouts."}
            </p>
            
            <div className="grid lg:grid-cols-2 gap-12">
                {packages.map((pkg, index) => (
                    <div key={index} className="bg-white text-gray-800 rounded-xl overflow-hidden shadow-lg">
                        {/* Package Image */}
                        <div className="h-48 bg-gray-200 relative">
                            <img
                                src={pkg.image}
                                alt={pkg.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        </div>
                        
                        {/* Package Content */}
                        <div className="p-6">
                            <h3 className="font-heading text-2xl font-bold text-picktopia-orange mb-4">
                                {pkg.title}
                            </h3>
                            <p className="font-body text-gray-600 mb-6 leading-relaxed">
                                {pkg.description}
                            </p>
                            
                            {/* Features List */}
                            <div className="space-y-2">
                                {pkg.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm">
                                        <span className="w-2 h-2 bg-picktopia-orange rounded-full mr-3 flex-shrink-0"></span>
                                        <span className="font-body text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventPackagesSection;