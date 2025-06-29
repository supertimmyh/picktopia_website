import React from 'react';
import { ChevronDownIcon } from './Icons';

const AccordionItem = ({ question, answer, isOpen, onClick }) => (
    <div className="mb-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left p-4 bg-picktopia-orange text-white font-bold text-lg focus:outline-none"
        >
            <span>{question}</span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDownIcon />
            </span>
        </button>
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
            <p className="p-4 bg-white text-gray-700">{answer}</p>
        </div>
    </div>
);

export default AccordionItem;