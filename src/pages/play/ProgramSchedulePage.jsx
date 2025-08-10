import React from 'react';
import ImageContentSection from '../../components/ImageContentSection';
import ProgramScheduleSection from '../../components/sections/ProgramScheduleSection';
import { programScheduleData } from '../../data/play/programScheduleData';

const ProgramSchedulePage = () => {
    const content = {
        title: programScheduleData.title,
        subtitle: programScheduleData.subtitle,
        heroImage: programScheduleData.heroImage,
        section: programScheduleData
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