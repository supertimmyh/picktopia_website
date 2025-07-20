import React from 'react';

const IntroSection = ({ content }) => {
    if (!content || typeof content !== 'string') return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div 
                className="font-body text-lg leading-relaxed text-gray-600 font-normal prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                    __html: content
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-picktopia-blue-dark font-bold">$1</strong>')
                        .replace(/\n\n/g, '</p><p class="font-body text-lg leading-relaxed text-gray-600 mb-4 font-normal">')
                        .replace(/^/, '<p class="font-body text-lg leading-relaxed text-gray-600 mb-4 font-normal">')
                        .replace(/$/, '</p>')
                }}
            />
        </div>
    );
};

export default IntroSection;