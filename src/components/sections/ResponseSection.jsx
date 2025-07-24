import React from 'react';

const ResponseSection = ({ content }) => {
    const { title, subtitle, expectations, callToAction } = content || {};

    return (
        <div className="bg-picktopia-orange text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase">
                {title || "Response & Follow-up"}
            </h2>
            <p className="font-body text-lg mb-8 max-w-3xl mx-auto">
                {subtitle || "What to expect after submitting your inquiry"}
            </p>
            
            <div className="space-y-4 mb-8 max-w-2xl mx-auto">
                {expectations?.map((expectation, index) => (
                    <div key={index} className="flex items-center justify-center text-left">
                        <div className="w-3 h-3 bg-white rounded-full mr-4 flex-shrink-0"></div>
                        <p className="font-body text-lg font-medium">
                            {expectation}
                        </p>
                    </div>
                ))}
            </div>
            
            {callToAction && (
                <div className="bg-white bg-opacity-20 rounded-xl p-6 max-w-3xl mx-auto">
                    <p className="font-body text-lg font-medium leading-relaxed">
                        {callToAction}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ResponseSection;