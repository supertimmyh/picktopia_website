import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import EventPackagesSection from '../components/sections/EventPackagesSection';
import InclusionsSection from '../components/sections/InclusionsSection';
import GroupBookingForm from '../components/GroupBookingForm';
import { loadPageContent } from '../utils/contentLoader';

const GroupBookingsPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const markdownContent = await loadPageContent('group-bookings');
                
                if (markdownContent && markdownContent.frontmatter) {
                    console.log('Successfully loaded frontmatter:', markdownContent.frontmatter);
                    setContent({
                        hero: markdownContent.frontmatter,
                        eventPackages: {
                            title: "Event Types",
                            subtitle: "We offer flexible options to suit your group's needs, from casual get-togethers to comprehensive event experiences.",
                            packages: [
                                {
                                    title: "Corporate Events & Team Building",
                                    description: "Perfect for companies looking to boost morale, strengthen team bonds, and provide unique client entertainment. Our professional staff ensures your corporate event runs smoothly while everyone has a blast learning pickleball.",
                                    image: "/assets/place-holder.jpg",
                                    features: ["Professional coaching and instruction", "Flexible scheduling for business hours", "Catering coordination available", "Use of meeting spaces", "Team building activities", "Equipment provided"]
                                },
                                {
                                    title: "Private Parties & Celebrations",
                                    description: "Ideal for birthdays, anniversaries, graduations, bachelor/bachelorette parties, and any special occasion. We welcome all ages and skill levels, making it the perfect inclusive celebration venue.",
                                    image: "/assets/place-holder.jpg",
                                    features: ["Customizable party packages", "All ages welcome", "Bring your own food and drinks", "Decorations setup time included", "Sound system access", "Party host assistance"]
                                }
                            ]
                        },
                        inclusions: {
                            title: "What's Included",
                            subtitle: "Every group booking comes with these standard inclusions to ensure your event is a success.",
                            standardInclusions: [
                                { title: "Court Time", description: "Minimum 2 hours of exclusive court access" },
                                { title: "Equipment Provided", description: "Professional paddles and balls for all guests" },
                                { title: "Basic Instruction", description: "Introduction to rules and gameplay for beginners" },
                                { title: "Common Areas", description: "Access to social spaces and seating areas" },
                                { title: "Sound System", description: "Music and announcement capabilities" },
                                { title: "Setup Support", description: "Staff assistance for basic event setup" }
                            ],
                            addOns: [
                                { title: "Professional Coaching", description: "Dedicated instructor for skill development" },
                                { title: "Extended Time", description: "Additional hours beyond the 2-hour minimum" },
                                { title: "Catering Coordination", description: "Help arranging food and beverage service" },
                                { title: "Full Facility Access", description: "Exclusive use of entire facility" },
                                { title: "Decoration Setup", description: "Extra time and assistance for decorations" },
                                { title: "Photography Services", description: "Professional event photography" }
                            ]
                        }
                    });
                } else {
                    console.log('Failed to load markdown, using fallback');
                    setContent({
                        hero: {
                            title: "Party & Group Bookings",
                            subtitle: "Ready to host an unforgettable event?",
                            heroImage: "/assets/place-holder.jpg"
                        }
                    });
                }
            } catch (error) {
                console.error('Error loading content:', error);
                // Fallback content
                setContent({
                    title: "Party & Group Bookings",
                    subtitle: "Ready to host an unforgettable event?",
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
            {/* Hero Section */}
            <HeroSection
                title={content.hero?.title}
                subtitle={content.hero?.subtitle}
                backgroundImage={content.hero?.heroImage}
                size="large"
                overlayColor="blue"
            />

            <div className="container mx-auto px-6 py-16 space-y-16">
                {/* Event Packages Section */}
                {content.eventPackages && (
                    <EventPackagesSection content={content.eventPackages} />
                )}

                {/* What's Included Section */}
                {content.inclusions && (
                    <InclusionsSection content={content.inclusions} />
                )}

                {/* Booking Form Section */}
                <GroupBookingForm />
            </div>
        </div>
    );
};

export default GroupBookingsPage;