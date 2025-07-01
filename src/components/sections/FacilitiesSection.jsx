import React from 'react';

const FacilitiesSection = ({ content }) => {
    const facilities = content?.items || [];

    return (
        <div className="bg-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-yellow-900 mb-4 tracking-wider uppercase text-center">
                {content?.title || "Our Facilities & Add-Ons"}
            </h2>
            <p className="font-body text-lg text-yellow-800 text-center mb-12 max-w-3xl mx-auto">
                {content?.subtitle || "Everything you need to make your event memorable and successful."}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {facilities.map((facility, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="text-4xl mb-4 text-center">
                            {facility.icon}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-yellow-900 mb-3 text-center">
                            {facility.title}
                        </h3>
                        <p className="font-body text-gray-600 text-center leading-relaxed">
                            {facility.description}
                        </p>
                    </div>
                ))}
            </div>
            
            {/* Facility Image */}
            {content?.facilitiesImage && (
                <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={content.facilitiesImage} // TODO: Replace with actual facilities image
                        alt="Picktopia Facilities"
                        className="w-full h-64 object-cover"
                    />
                </div>
            )}
        </div>
    );
};

export default FacilitiesSection;