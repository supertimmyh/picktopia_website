import React from 'react';

const ImageContentSection = ({ 
    title, 
    subtitle, 
    backgroundImage, 
    children,
    size = 'medium',
    imagePosition = 'left',
    imageAspectRatio = '4/3',
    className = '',
    containerClassName = '',
    imageClassName = '',
    contentClassName = '',
    padding = 'standard'
}) => {
    // Size variants for height (can be overridden with className)
    const sizeClasses = {
        small: 'min-h-[30vh]',
        medium: 'min-h-[40vh]', 
        large: 'min-h-[60vh]',
        auto: 'min-h-fit'
    };

    // Padding variants
    const paddingClasses = {
        none: '',
        small: 'py-8',
        standard: 'py-12',
        large: 'py-16'
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
                                    className={`aspect-[${imageAspectRatio}] bg-cover bg-center bg-no-repeat`}
                                    style={{ backgroundImage: `url(${backgroundImage})` }}
                                ></div>
                            </div>
                        ) : (
                            <div className={`aspect-[${imageAspectRatio}] bg-gray-200 rounded-lg flex items-center justify-center`}>
                                <span className="text-gray-500">No image provided</span>
                            </div>
                        )}
                    </div>

                    {/* Content Side */}
                    <div className={`${contentOrder} text-center ${contentClassName}`}>
                        {title && (
                            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-picktopia-blue-dark tracking-wider uppercase">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="font-body text-lg md:text-xl font-medium mb-8 leading-relaxed text-gray-700">
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

export default ImageContentSection;