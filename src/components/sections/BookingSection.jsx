import React from 'react';
import ContentTile from '../ContentTile';
import BookingButton from '../BookingButton';

const BookingSection = ({ content }) => {
    const handleBooking = () => {
        if (content?.bookingUrl) {
            window.open(content.bookingUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Parse the content to extract structured information
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
            title={content?.title || "Booking"}
            subtitle={content?.subtitle || "Booking your spot at Picktopia is easy."}
        >
            <div className="space-y-6">
                {contentSections.map((section, index) => (
                    <div key={index}>
                        <h3 className="font-heading text-xl font-bold text-current mb-4">
                            {section.title}
                        </h3>
                        {section.content.map((paragraph, pIndex) => {
                            if (paragraph.startsWith('- ')) {
                                // Handle list items
                                const listItems = section.content
                                    .filter(p => p.startsWith('- '))
                                    .map(p => p.replace('- ', ''));
                                
                                if (pIndex === section.content.findIndex(p => p.startsWith('- '))) {
                                    return (
                                        <ul key={pIndex} className="list-disc list-inside mb-4 space-y-2">
                                            {listItems.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                }
                                return null;
                            } else if (!paragraph.startsWith('- ')) {
                                return (
                                    <p 
                                        key={pIndex} 
                                        className="mb-4"
                                        dangerouslySetInnerHTML={{
                                            __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        }}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                ))}

                <div className="flex justify-center mt-6">
                    <BookingButton 
                        text={content?.bookingText || "Book Your Spot"}
                        onClick={handleBooking}
                    />
                </div>
            </div>
        </ContentTile>
    );
};

export default BookingSection;