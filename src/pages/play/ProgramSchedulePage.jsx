import React from 'react';
import ImageContentSection from '../../components/ImageContentSection';
import ProgramScheduleSection from '../../components/sections/ProgramScheduleSection';
import { programScheduleData } from '../../data/play/programScheduleData';
import { withAssetPaths } from '../../utils/dataWithAssets';

const ProgramSchedulePage = () => {
    const processedData = withAssetPaths(programScheduleData);
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
                padding="large"
            />

            <div className="w-full max-w-none px-12 py-8">
                <ProgramScheduleSection content={content.section} />
            </div>
        </div>
    );
};

export default ProgramSchedulePage;