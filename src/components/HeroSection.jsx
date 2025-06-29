import React from 'react';

const HeroSection = ({ 
    title, 
    subtitle, 
    backgroundImage, 
    children,
    size = 'large', // 'small', 'medium', 'large'
    overlayColor = 'none' // 'orange', 'blue', 'dark', 'none'
}) => {
    // Size variants
    const sizeClasses = {
        small: 'py-16 md:py-20 min-h-[40vh]',
        medium: 'py-20 md:py-24 min-h-[50vh]',
        large: 'py-24 md:py-32 lg:py-40 min-h-[70vh]'
    };

    // Overlay variants
    const overlayClasses = {
        orange: 'bg-gradient-to-r from-picktopia-orange/60 to-orange-500/60',
        blue: 'bg-gradient-to-r from-picktopia-blue-dark/60 to-picktopia-blue-mid/60',
        dark: 'bg-black/40',
        none: 'bg-transparent'
    };

    return (
        <div className={`relative text-white flex items-center justify-center ${sizeClasses[size]}`}>
            {/* Background Image - Only covers hero section */}
            {backgroundImage && (
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
            )}
            
            {/* Dark Overlay for Readability - Only covers hero section */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            
            {/* Color Overlay for Brand Consistency - Only covers hero section */}
            {overlayColor !== 'none' && (
                <div className={`absolute inset-0 ${overlayClasses[overlayColor]}`}></div>
            )}
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                {title && (
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mb-6 drop-shadow-lg tracking-wider uppercase">
                        {title}
                    </h1>
                )}
                {subtitle && (
                    <p className="font-body text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto drop-shadow-md mb-8 leading-relaxed">
                        {subtitle}
                    </p>
                )}
                {children && (
                    <div className="mt-6">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSection;