import React from 'react';
import ImageContentSection from '../../components/ImageContentSection';
import FreeIntroSection from '../../components/sections/FreeIntroSection';
import { freePickleballIntroData } from '../../data/academy/freePickleballIntroData';
import { withAssetPaths } from '../../utils/dataWithAssets';

const FreePickleballIntroPage = () => {
    const processedData = withAssetPaths(freePickleballIntroData);
    const content = {
        title: processedData.title,
        subtitle: processedData.subtitle,
        heroImage: processedData.heroImage,
        section: processedData
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