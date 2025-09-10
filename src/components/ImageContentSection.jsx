import React from 'react';

const ImageContentSection = ({ 
    title, 
    subtitle, 
    backgroundImage, 
    children,
    size = 'medium',
    imagePosition = 'left',
    imageAspectRatio = '16/9',
    backgroundPosition = 'top',
    className = '',
    containerClassName = '',
    imageClassName = '',
    contentClassName = '',
    padding = 'standard'
}) => {
    // Size variants for height (can be overridden with className)
    const sizeClasses = {
        small: 'min-h-[25vh]',
        medium: 'min-h-[35vh]', 
        large: 'min-h-[50vh]',
        auto: 'min-h-fit'
    };

    // Padding variants
    const paddingClasses = {
        none: '',
        small: 'py-4',
        standard: 'py-6',
        large: 'py-8'
    };

    // Background position variants
    const backgroundPositionClasses = {
        top: 'bg-top',
        center: 'bg-center',
        bottom: 'bg-bottom',
        left: 'bg-left',
        right: 'bg-right',
        'top-left': 'bg-left-top',
        'top-right': 'bg-right-top',
        'bottom-left': 'bg-left-bottom',
        'bottom-right': 'bg-right-bottom'
    };

    // Determine grid order based on image position
    const isImageLeft = imagePosition === 'left';
    const imageOrder = isImageLeft ? 'order-2 lg:order-1' : 'order-2 lg:order-2';
    const contentOrder = isImageLeft ? 'order-1 lg:order-2' : 'order-1 lg:order-1';

    // Text alignment based on image position
    const textAlignment = isImageLeft ? 'text-center lg:text-left' : 'text-center lg:text-right';

    return (
        <div className={`relative ${sizeClasses[size]} ${paddingClasses[padding]} w-full ${className}`}>
            <div className={`w-full max-w-none px-12 ${containerClassName}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                    {/* Image Side */}
                    <div className={`relative ${imageOrder} ${imageClassName}`}>
                        {backgroundImage ? (
                            <div className="relative rounded-lg overflow-hidden shadow-2xl">
                                <div 
                                    className={`bg-cover ${backgroundPositionClasses[backgroundPosition] || 'bg-top'} bg-no-repeat`}
                                    style={{ 
                                        aspectRatio: imageAspectRatio,
                                        backgroundImage: `url(${backgroundImage})` 
                                    }}
                                ></div>
                            </div>
                        ) : (
                            <div 
                                className="bg-gray-200 rounded-lg flex items-center justify-center"
                                style={{ aspectRatio: imageAspectRatio }}
                            >
                                <span className="text-gray-500">No image provided</span>
                            </div>
                        )}
                    </div>

                    {/* Content Side */}
                    <div className={`${contentOrder} ${contentClassName}`}>
                        <div 
                            className="bg-white rounded-lg shadow-2xl p-8 flex flex-col justify-center text-center"
                            style={{ aspectRatio: imageAspectRatio }}
                        >
                            {title && (
                                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-8 text-picktopia-blue-dark tracking-wider uppercase leading-tight">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="font-body text-xl md:text-2xl lg:text-3xl font-medium mb-8 leading-relaxed text-gray-700">
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
        </div>
    );
};

export default ImageContentSection;