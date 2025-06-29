import React from 'react';
import ContentTile from '../ContentTile';
import IntroSignupForm from '../IntroSignupForm';

const FreeIntroSection = ({ content }) => {
    // Parse the content to extract intro sections
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
            title={content?.title || "Free Pickleball Intro"}
            subtitle={content?.subtitle || "New to the sport? We want you to love pickleball as much as we do!"}
            backgroundColor={content?.backgroundColor || "bg-picktopia-orange"}
            textColor={content?.textColor || "text-white"}
            titleColor={content?.titleColor || "text-white"}
        >
            <div className="space-y-6">
                {contentSections.map((section, index) => (
                    <div key={index}>
                        <h3 className="font-heading text-xl font-bold text-white mb-4">
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
                
                {/* Look for closing message */}
                {content?.content?.includes('We can\'t wait to see you on the courts!') && (
                    <p className="mb-6 text-center font-bold text-lg">
                        We can't wait to see you on the courts!
                    </p>
                )}

                <IntroSignupForm />
            </div>
        </ContentTile>
    );
};

export default FreeIntroSection;