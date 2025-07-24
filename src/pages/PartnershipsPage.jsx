import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import WhyPartnerSection from '../components/sections/WhyPartnerSection';
import PartnershipPackagesSection from '../components/sections/PartnershipPackagesSection';
import PartnershipInquiryForm from '../components/PartnershipInquiryForm';
import { loadPageContent } from '../utils/contentLoader';

const PartnershipsPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Partnership packages data
    const packageData = [
        {
            title: "Champion Level Partnership",
            subtitle: "Premium Partnership Package",
            pricing: "Contact for Pricing",
            featured: true,
            categories: [
                {
                    title: "Premium Visibility Package",
                    benefits: [
                        "4' x 8' branded banner prominently displayed in facility",
                        "Named court sponsorship with permanent signage", 
                        "Dedicated branded corner/area within facility",
                        "Brochure and promotional material display space"
                    ]
                },
                {
                    title: "Digital Presence",
                    benefits: [
                        "Logo placement on facility TVs and digital displays",
                        "Website homepage logo with direct link to your business",
                        "Featured social media partner spotlights (12x per year)",
                        "Priority placement in monthly newsletter",
                        "Logo inclusion in event photography and marketing materials"
                    ]
                },
                {
                    title: "Exclusive Partnership Benefits",
                    benefits: [
                        "Facility use for team building/corporate events (3x per year)",
                        "Member discount program administration and promotion",
                        "Event merchandise and t-shirt logo placement",
                        "First right of refusal on special event title sponsorships",
                        "Quarterly partnership review meetings and strategy sessions"
                    ]
                }
            ]
        },
        {
            title: "Supporter Level Partnership",
            subtitle: "Strong Community Partnership",
            pricing: "Contact for Pricing",
            featured: false,
            categories: [
                {
                    title: "Strong Visibility Package",
                    benefits: [
                        "4' x 8' branded banner displayed prominently in facility",
                        "Shared promotional display space for marketing materials",
                        "Event signage placement at tournaments and special events"
                    ]
                },
                {
                    title: "Digital Engagement",
                    benefits: [
                        "Logo featured on facility TV displays",
                        "Website partner page listing with business link",
                        "Social media partner mentions and features (8x per year)",
                        "Newsletter logo inclusion and partner highlights"
                    ]
                },
                {
                    title: "Community Benefits",
                    benefits: [
                        "Facility use for corporate events and team building (2x per year)",
                        "Member discount program participation option",
                        "Priority event participation and networking opportunities"
                    ]
                }
            ]
        },
        {
            title: "Friend Level Partnership",
            subtitle: "Community Connection Package",
            pricing: "Contact for Pricing",
            featured: false,
            categories: [
                {
                    title: "Community Visibility",
                    benefits: [
                        "4' x 8' branded banner displayed in high-traffic facility area",
                        "Promotional material display space for brochures and information"
                    ]
                },
                {
                    title: "Digital Recognition",
                    benefits: [
                        "Website partner directory listing with business information",
                        "Social media partner mentions and community highlights (4x per year)"
                    ]
                },
                {
                    title: "Community Connection",
                    benefits: [
                        "Facility use for corporate events (1x per year)",
                        "Event participation and community networking opportunities"
                    ]
                }
            ]
        }
    ];

    useEffect(() => {
        const loadContent = async () => {
            try {
                const markdownContent = await loadPageContent('partnerships');
                
                if (markdownContent && markdownContent.frontmatter) {
                    console.log('Successfully loaded partnerships frontmatter:', markdownContent.frontmatter);
                    setContent(markdownContent.frontmatter);
                } else {
                    console.log('Failed to load partnerships markdown, using fallback');
                    // Fallback content
                    setContent({
                        title: "Partner With Our Community",
                        subtitle: "Join us in building something amazing together. Partner with Picktopia to reach an engaged community passionate about active living and wellness.",
                        heroImage: "/assets/place-holder.jpg"
                    });
                }
            } catch (error) {
                console.error('Error loading partnerships content:', error);
                // Fallback content
                setContent({
                    title: "Partner With Our Community", 
                    subtitle: "Join us in building something amazing together.",
                    heroImage: "/assets/place-holder.jpg"
                });
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section with Stats */}
            <div className="relative">
                <HeroSection
                    title={content.title}
                    subtitle={content.subtitle}
                    backgroundImage={content.heroImage}
                    size="large"
                    overlayColor="blue"
                />
                
                {/* Stats Overlay */}
                {(content.monthlyVisitors || content.activeMembers) && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                {content.monthlyVisitors && (
                                    <div>
                                        <div className="font-heading text-2xl font-black text-picktopia-blue-dark">
                                            {content.monthlyVisitors}
                                        </div>
                                        <div className="font-body text-sm text-gray-600">
                                            Monthly Visitors
                                        </div>
                                    </div>
                                )}
                                {content.activeMembers && (
                                    <div>
                                        <div className="font-heading text-2xl font-black text-picktopia-blue-dark">
                                            {content.activeMembers}
                                        </div>
                                        <div className="font-body text-sm text-gray-600">
                                            Active Members
                                        </div>
                                    </div>
                                )}
                                {content.communityFocus && (
                                    <div>
                                        <div className="font-heading text-lg font-black text-picktopia-blue-dark">
                                            {content.communityFocus}
                                        </div>
                                        <div className="font-body text-sm text-gray-600">
                                            Community Focus
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="container mx-auto px-6 py-16 space-y-16">
                {/* Why Partner With Us Section */}
                <WhyPartnerSection />

                {/* Partnership Packages Section */}
                <PartnershipPackagesSection content={content} packages={packageData} />

                {/* Partnership Inquiry Form */}
                <PartnershipInquiryForm />

                {/* Next Steps Section */}
                <div className="bg-picktopia-orange text-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-black mb-6 tracking-wider uppercase">
                        Ready to See the Opportunity?
                    </h2>
                    <p className="font-body text-lg mb-8 max-w-3xl mx-auto">
                        We'd love to show you our facility and discuss how a partnership could benefit your business and our community.
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="font-heading text-xl font-bold mb-2">Within 24 Hours</div>
                            <div className="font-body text-sm">We review your inquiry and reach out to schedule a conversation</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="font-heading text-xl font-bold mb-2">Facility Tour</div>
                            <div className="font-body text-sm">Visit our location to see partnership opportunities firsthand</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="font-heading text-xl font-bold mb-2">Custom Proposal</div>
                            <div className="font-body text-sm">We create a partnership proposal tailored to your goals</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-4">
                            <div className="font-heading text-xl font-bold mb-2">Partnership Launch</div>
                            <div className="font-body text-sm">Once finalized, we work together to maximize your partnership impact</div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-6 max-w-2xl mx-auto">
                        <h3 className="font-heading text-xl font-bold mb-4">Partnership Coordinator</h3>
                        <div className="space-y-2 text-sm">
                            <div><strong>Email:</strong> partnerships@picktopia.com</div>
                            <div><strong>Phone:</strong> (555) 123-PICK</div>
                            <div><strong>Office Hours:</strong> Monday - Friday, 9 AM - 6 PM</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnershipsPage;