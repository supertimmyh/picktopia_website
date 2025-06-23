import React from 'react';
import { CMS_DATA } from '../data';

const WhatIsPicktopia = () => {
    const { title, subtitle, features } = CMS_DATA.whatIsPicktopia;

    return (
        <div className="bg-picktopia-blue-dark text-white py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                <p className="max-w-3xl mx-auto text-gray-300 mb-12">{subtitle}</p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 border border-picktopia-orange/20 rounded-lg">
                            <h3 className="font-bold text-xl text-picktopia-orange mb-2">{feature.title}</h3>
                            <p className="text-gray-300">{feature.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatIsPicktopia;