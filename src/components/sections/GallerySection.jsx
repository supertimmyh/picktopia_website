import React, { useState } from 'react';

const GallerySection = ({ content }) => {
    const { title, subtitle, images } = content || {};
    const [selectedImage, setSelectedImage] = useState(null);

    const openLightbox = (image) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center text-picktopia-blue-dark">
                {title || "Event Gallery"}
            </h2>
            <p className="font-body text-lg text-center mb-12 max-w-3xl mx-auto text-gray-700">
                {subtitle || "See what makes our group events so special"}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images?.map((image, index) => (
                    <div 
                        key={index} 
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        onClick={() => openLightbox(image)}
                    >
                        <div className="aspect-square bg-gray-200">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-white font-heading font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                                <div className="text-2xl mb-2">🔍</div>
                                <div className="text-xs">{image.caption}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={closeLightbox}
                >
                    <div className="max-w-4xl max-h-full relative">
                        <button
                            onClick={closeLightbox}
                            className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-picktopia-orange transition-colors duration-200"
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 rounded-b-lg">
                            <p className="font-heading font-bold text-center">
                                {selectedImage.caption}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GallerySection;