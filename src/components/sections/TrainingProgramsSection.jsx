import React from 'react';
import ContentTile from '../ContentTile';
import BookingButton from '../BookingButton';

const TrainingProgramsSection = ({ content }) => {
    const handleBooking = () => {
        if (content?.bookingUrl) {
            window.open(content.bookingUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Parse the content to extract training program sections
    const parseContent = (contentText) => {
        if (!contentText) return [];
        
        const sections = [];
        const lines = contentText.split('\n');
        let currentSection = null;
        
        for (const line of lines) {
            if (line.startsWith('### ')) {
                if (currentSection) {
                    sections.push(currentSection);
                }
                currentSection = {
                    title: line.replace('### ', '').trim(),
                    content: []
                };
            } else if (currentSection && line.trim()) {
                currentSection.content.push(line.trim());
            }
        }
        
        if (currentSection) {
            sections.push(currentSection);
        }
        
        return sections;
    };

    const contentSections = parseContent(content?.content);

    return (
        <ContentTile
            title={content?.title || "Training Programs"}
            subtitle={content?.subtitle || "Ready to take your game to the next level?"}
        >
            <div className="space-y-6">
                {contentSections.map((section, index) => (
                    <div key={index}>
                        <h3 className="font-heading text-xl font-bold text-current mb-4">
                            {section.title}
                        </h3>
                        {section.content.map((paragraph, pIndex) => (
                            <p 
                                key={pIndex} 
                                className="mb-2"
                                dangerouslySetInnerHTML={{
                                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                }}
                            />
                        ))}
                    </div>
                ))}

                <div className="flex justify-center mt-6">
                    <BookingButton 
                        text={content?.bookingText || "Book Training"}
                        onClick={handleBooking}
                    />
                </div>
            </div>
        </ContentTile>
    );
};

export default TrainingProgramsSection;