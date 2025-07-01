import React from 'react';

const WhyBookSection = ({ content }) => {
    const benefits = content?.benefits || [];

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-picktopia-blue-dark mb-8 tracking-wider uppercase text-center">
                {content?.title || "Why Book Your Event With Us?"}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300">
                        <h3 className="font-heading text-xl font-bold text-picktopia-orange mb-4">
                            {benefit.title}
                        </h3>
                        <p className="font-body text-gray-600 leading-relaxed">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyBookSection;