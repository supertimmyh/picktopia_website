import React from 'react';

const ClosingSection = ({ content }) => {
    if (!content || typeof content !== 'string') return null;

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 text-center">
            <div 
                className="font-body text-lg leading-relaxed text-gray-600 mb-8 font-normal prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                    __html: content
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-picktopia-orange font-semibold">$1</strong>')
                        .replace(/\n\n/g, '</p><p class="font-body text-lg leading-relaxed text-gray-600 mb-8 font-normal">')
                        .replace(/^/, '<p class="font-body text-lg leading-relaxed text-gray-600 mb-6 font-normal">')
                        .replace(/$/, '</p>')
                }}
            />
        </div>
    );
};

export default ClosingSection;