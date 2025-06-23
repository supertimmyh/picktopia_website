import React from 'react';
import { CMS_DATA } from '../data';

const Newsletter = () => {
    const { title, subtitle } = CMS_DATA.newsletter;
    return (
        <div className="bg-picktopia-orange text-white py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{title}</h2>
                <p className="mb-6">{subtitle}</p>
                <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
                    <input type="email" placeholder="Enter your email" className="flex-grow p-3 rounded-md border-2 border-picktopia-blue-dark/50 focus:border-picktopia-blue-dark focus:ring-0" />
                    <button type="submit" className="bg-picktopia-blue-dark text-white font-bold py-3 px-6 rounded-md hover:bg-picktopia-blue-mid transition-colors duration-300">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;