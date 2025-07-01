import React, { useState } from 'react';
import AccordionItem from '../AccordionItem';

const GroupBookingFaqSection = ({ content, contact }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = content?.questions || [];

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-picktopia-blue-dark mb-8 tracking-wider uppercase text-center">
                {content?.title || "Frequently Asked Questions"}
            </h2>
            
            <div className="max-w-4xl mx-auto">
                {faqData.map((item, index) => (
                    <AccordionItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                        className="border-b border-gray-200 last:border-b-0"
                    />
                ))}
            </div>
            
            {/* Contact for More Questions */}
            {contact && (
                <div className="mt-12 text-center bg-gray-50 rounded-xl p-8">
                    <h3 className="font-heading text-xl font-bold text-picktopia-orange mb-4">
                        {contact.title || "Still Have Questions?"}
                    </h3>
                    <p className="font-body text-gray-600 mb-6">
                        {contact.subtitle || "Our events team is here to help you plan the perfect group experience."}
                    </p>
                    <div className="space-y-2">
                        {contact.email && (
                            <p className="font-body text-gray-800">
                                <strong>Email:</strong> {contact.email}
                            </p>
                        )}
                        {contact.phone && (
                            <p className="font-body text-gray-800">
                                <strong>Phone:</strong> {contact.phone}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupBookingFaqSection;