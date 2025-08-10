import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const FaqSection = ({ data, fallbackData }) => {
    const { title, questions } = data || fallbackData;
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-picktopia-blue-dark text-white py-16 md:py-24">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{title}</h2>
                <div className="max-w-3xl mx-auto">
                    {questions.map((item, index) => (
                        <AccordionItem
                            key={index}
                            question={item.q}
                            answer={item.a}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqSection;