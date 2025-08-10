import React from 'react';
import ImageContentSection from '../../components/ImageContentSection';
import FreeIntroSection from '../../components/sections/FreeIntroSection';
import { freePickleballIntroData } from '../../data/play/freePickleballIntroData';

const FreePickleballIntroPage = () => {
    const content = {
        title: freePickleballIntroData.title,
        subtitle: freePickleballIntroData.subtitle,
        heroImage: freePickleballIntroData.heroImage,
        section: freePickleballIntroData
    };

    return (
        <div className="min-h-screen">
            <ImageContentSection
                title={content.title}
                subtitle={content.subtitle}
                backgroundImage={content.heroImage}
                size="large"
                imagePosition="right"
                padding="large"
            />

            <div className="w-full max-w-none px-12 py-8">
                <FreeIntroSection content={content.section} />
            </div>
        </div>
    );
};

export default FreePickleballIntroPage;