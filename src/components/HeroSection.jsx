import React from 'react';
import { CMS_DATA } from '../data';
import heroImage from '../assets/hero-image.jpeg';

const HeroSection = () => {
    const { title, subtitle, cta } = CMS_DATA.hero;
    return (
        <div className="relative text-white text-center py-24 md:py-36 lg:py-48 flex items-center justify-center min-h-[60vh]">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${heroImage})` }}
            ></div>
            
            {/* Dark Overlay Mask */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            
            {/* Blue Overlay for Brand Consistency */}
            <div className="absolute inset-0 bg-picktopia-blue-dark bg-opacity-40"></div>
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">{title}</h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">{subtitle}</p>
                <button className="bg-picktopia-orange text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-picktopia-orange transition-all duration-300 transform hover:scale-105 shadow-lg">
                    {cta}
                </button>
            </div>
        </div>
    );
};

export default HeroSection;