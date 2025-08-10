import React from 'react';

const WhatIsPicktopia = ({ data, fallbackData }) => {
    const { title, subtitle, features } = data || fallbackData;

    return (
        <div className="bg-picktopia-blue-dark text-white py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-black mb-6 tracking-wider uppercase">{title}</h2>
                <p className="font-body max-w-3xl mx-auto text-gray-300 mb-16 text-lg leading-relaxed font-normal">{subtitle}</p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 border border-picktopia-orange/20 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="font-brand font-bold text-xl text-picktopia-orange mb-4 tracking-wider">{feature.title}</h3>
                            <p className="font-body text-gray-300 leading-relaxed font-normal">{feature.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatIsPicktopia;