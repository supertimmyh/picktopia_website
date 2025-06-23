import React from 'react';

const GenericPage = ({ title }) => (
    <div className="text-white py-24 min-h-[50vh] flex items-center">
        <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-gray-300 max-w-2xl">
                Content for the {title} page will be managed through the headless CMS. 
                This is a placeholder page where you'll fetch and render the specific content for this section.
            </p>
        </div>
    </div>
);

export default GenericPage;