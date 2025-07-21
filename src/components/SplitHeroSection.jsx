import React from 'react';

const SplitHeroSection = ({ 
    title, 
    subtitle, 
    backgroundImage, 
    children,
    size = 'large'
}) => {
    // Size variants for height
    const sizeClasses = {
        small: 'min-h-[40vh]',
        medium: 'min-h-[50vh]', 
        large: 'min-h-[70vh]'
    };

    return (
        <div className={`relative ${sizeClasses[size]} flex items-center`}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Image Side - Left */}
                    <div className="relative order-2 lg:order-1">
                        {backgroundImage ? (
                            <div className="relative rounded-lg overflow-hidden shadow-2xl">
                                <div 
                                    className="aspect-[4/3] bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${backgroundImage})` }}
                                ></div>
                                
                            </div>
                        ) : (
                            <div className="aspect-[4/3] bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No image provided</span>
                            </div>
                        )}
                    </div>

                    {/* Content Side - Right */}
                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        {title && (
                            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-picktopia-blue-dark tracking-wider uppercase">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="font-body text-lg md:text-xl lg:text-2xl font-medium mb-8 leading-relaxed text-gray-700">
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
            </div>
        </div>
    );
};

export default SplitHeroSection;