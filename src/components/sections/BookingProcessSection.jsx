import React from 'react';

const BookingProcessSection = ({ content }) => {
    const steps = content?.steps || [];

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-picktopia-blue-dark mb-4 tracking-wider uppercase text-center">
                {content?.title || "How to Book Your Event"}
            </h2>
            <p className="font-body text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                {content?.subtitle || "Ready to get the ball rolling? Here's how easy it is to book your group event with us."}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="text-center">
                        {/* Step Number */}
                        <div className="w-16 h-16 bg-picktopia-orange text-white rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="font-heading text-2xl font-black">
                                {step.step}
                            </span>
                        </div>
                        
                        {/* Step Content */}
                        <h3 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-4">
                            {step.title}
                        </h3>
                        <p className="font-body text-gray-600 leading-relaxed">
                            {step.description}
                        </p>
                        
                        {/* Connector Arrow (except for last step) */}
                        {index < steps.length - 1 && (
                            <div className="hidden md:block absolute top-8 left-1/2 transform -translate-y-1/2 translate-x-12 w-12 h-0.5 bg-picktopia-orange"></div>
                        )}
                    </div>
                ))}
            </div>
            
            {/* Call to Action */}
            {content?.callToAction && (
                <div className="mt-12 text-center">
                    <p className="font-body text-lg text-picktopia-orange font-semibold mb-4">
                        {content.callToAction}
                    </p>
                </div>
            )}
        </div>
    );
};

export default BookingProcessSection;