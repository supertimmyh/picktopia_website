import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, UserPlus, FileText, Calendar, Phone, MessageCircle, Download, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';
import BookingButton from '../BookingButton';

const BookingSection = ({ content }) => {
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);

    const handleBooking = () => {
        if (content?.bookingUrl) {
            window.open(content.bookingUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const handleWhatsApp = () => {
        // Placeholder for WhatsApp number - to be added later
        const phoneNumber = 'YOUR_WHATSAPP_NUMBER'; // Replace with actual number
        const message = encodeURIComponent('Hi! I need help with court booking at Picktopia.');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const handleDownloadApp = () => {
        window.open('https://courtreserve.com/mobile-app/', '_blank');
    };

    // Parse the content to extract structured information
    const parseContent = (contentText) => {
        if (!contentText) return { steps: [], faq: [] };
        
        const lines = contentText.split('\n');
        const steps = [];
        const faq = [];
        let currentSection = null;
        let isInFaqSection = false;
        
        for (const line of lines) {
            if (line.startsWith('## FAQ') || line.startsWith('### FAQ')) {
                // Before switching to FAQ mode, save the current section if it exists
                if (currentSection && !isInFaqSection) {
                    steps.push(currentSection);
                    currentSection = null;
                }
                isInFaqSection = true;
                continue;
            }
            
            if (line.startsWith('### ')) {
                if (currentSection && !isInFaqSection) {
                    steps.push(currentSection);
                } else if (currentSection && isInFaqSection) {
                    faq.push(currentSection);
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
            if (isInFaqSection) {
                faq.push(currentSection);
            } else {
                steps.push(currentSection);
            }
        }
        
        return { steps, faq };
    };

    const { steps: contentSections, faq: faqSections } = parseContent(content?.content);

    const stepIcons = [UserPlus, FileText, Calendar];
    const stepColors = ['bg-picktopia-orange', 'bg-picktopia-blue-mid', 'bg-picktopia-blue-dark'];

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
                <h1 className="font-heading text-4xl font-bold text-picktopia-blue-dark">
                    {content?.title || "Court Booking"}
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {content?.subtitle || "Booking your spot at Picktopia is easy."}
                </p>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                    {contentSections.map((_, index) => (
                        <div key={index} className="flex items-center">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300",
                                index <= currentStep ? stepColors[index] : "bg-gray-300"
                            )}>
                                {index < currentStep ? (
                                    <CheckCircle className="w-6 h-6" />
                                ) : (
                                    index + 1
                                )}
                            </div>
                            {index < contentSections.length - 1 && (
                                <div className={cn(
                                    "w-12 h-1 transition-all duration-300",
                                    index < currentStep ? "bg-picktopia-orange" : "bg-gray-300"
                                )} />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Step Cards */}
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
                {contentSections.map((section, index) => {
                    const IconComponent = stepIcons[index] || Calendar;
                    return (
                        <Card 
                            key={index} 
                            className={cn(
                                "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border-2",
                                index === currentStep ? "border-picktopia-orange shadow-lg" : "border-gray-200 hover:border-picktopia-blue-mid"
                            )}
                            onClick={() => setCurrentStep(index)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center space-x-3">
                                    <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center text-white",
                                        stepColors[index]
                                    )}>
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <Badge variant="outline" className="mb-2">
                                            Step {index + 1}
                                        </Badge>
                                        <CardTitle className="text-lg">
                                            {section.title}
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {section.content.map((paragraph, pIndex) => {
                                    if (paragraph.startsWith('- ')) {
                                        const listItems = section.content
                                            .filter(p => p.startsWith('- '))
                                            .map(p => p.replace('- ', ''));
                                        
                                        if (pIndex === section.content.findIndex(p => p.startsWith('- '))) {
                                            return (
                                                <ul key={pIndex} className="list-disc list-inside space-y-2 text-gray-600">
                                                    {listItems.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="text-sm">{item}</li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return null;
                                    } else if (!paragraph.startsWith('- ')) {
                                        return (
                                            <p 
                                                key={pIndex} 
                                                className="text-sm text-gray-600 mb-3"
                                                dangerouslySetInnerHTML={{
                                                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-picktopia-blue-dark">$1</strong>')
                                                }}
                                            />
                                        );
                                    }
                                    return null;
                                })}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Multiple CTAs */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                <h3 className="font-heading text-2xl font-bold text-center text-picktopia-blue-dark">
                    Ready to Book?
                </h3>
                
                <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
                    <Button 
                        onClick={handleDownloadApp}
                        variant="picktopia-outline"
                        size="xl"
                        className="w-full group font-heading tracking-wide uppercase transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:bg-picktopia-orange hover:text-white"
                    >
                        <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Download App
                    </Button>
                    
                    <BookingButton 
                        text={content?.bookingText || "Book Your Spot"}
                        onClick={handleBooking}
                        className="w-full group mt-0"
                    />
                </div>
            </div>

            {/* Court Reserve Widget Placeholder */}
            <Card className="border-dashed border-2 border-picktopia-orange">
                <CardContent className="p-8 text-center">
                    <div className="space-y-4">
                        <Calendar className="w-16 h-16 mx-auto text-picktopia-orange" />
                        <h3 className="font-heading text-xl font-bold text-picktopia-blue-dark">
                            Court Reserve Booking Widget
                        </h3>
                        <p className="text-gray-600">
                            This space is reserved for the Court Reserve booking widget integration.
                            The widget will allow direct booking without leaving the page.
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <code className="text-sm text-gray-600">
                                {"<!-- Court Reserve Widget will be embedded here -->"}
                            </code>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="bg-picktopia-blue-dark text-white rounded-lg p-6">
                <h3 className="font-heading text-xl font-bold mb-4 text-center">
                    Need Help? Contact Us
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                        onClick={handleWhatsApp}
                        variant="secondary"
                        className="group bg-green-600 hover:bg-green-700 text-white border-0"
                    >
                        <MessageCircle className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        WhatsApp
                    </Button>
                    
                    <Button 
                        onClick={() => window.location.href = 'tel:+1234567890'}
                        variant="secondary"
                        className="group bg-white text-picktopia-blue-dark hover:bg-gray-100"
                    >
                        <Phone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        Call Us
                    </Button>
                </div>
            </div>

            {/* FAQ Section */}
            {faqSections.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-heading text-2xl text-picktopia-blue-dark">
                            Frequently Asked Questions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {faqSections.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 last:border-b-0 pb-4 last:pb-0">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full flex justify-between items-center text-left py-2 hover:text-picktopia-orange transition-colors duration-200"
                                >
                                    <span className="font-semibold">{faq.title}</span>
                                    {expandedFaq === index ? (
                                        <ChevronUp className="w-5 h-5 text-picktopia-orange" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </button>
                                {expandedFaq === index && (
                                    <div className="mt-2 space-y-2">
                                        {faq.content.map((paragraph, pIndex) => (
                                            <p 
                                                key={pIndex} 
                                                className="text-gray-600 text-sm"
                                                dangerouslySetInnerHTML={{
                                                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default BookingSection;