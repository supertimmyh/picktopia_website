import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ContentTile from '../components/ContentTile';
import { loadContent } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const MembershipPage = () => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMemberships = async () => {
            try {
                // Load membership slugs from manifest file
                const manifestResponse = await fetch(getAssetPath('/content/memberships/manifest.json'));
                let membershipSlugs = [];

                if (manifestResponse.ok) {
                    membershipSlugs = await manifestResponse.json();
                } else {
                    // Fallback to empty array if manifest doesn't exist
                    console.log('Memberships manifest not found');
                    setLoading(false);
                    return;
                }

                const membershipData = [];

                for (const slug of membershipSlugs) {
                    try {
                        const membershipContent = await loadContent(`/content/memberships/${slug}.md`);
                        if (membershipContent && membershipContent.frontmatter) {
                            membershipData.push({
                                slug: slug,
                                ...membershipContent.frontmatter
                            });
                        }
                    } catch (error) {
                        console.log(`Membership ${slug} not found, skipping`);
                    }
                }

                // Sort by order field, then by title
                const sortedMemberships = membershipData.sort((a, b) => {
                    if (a.order && b.order) {
                        return a.order - b.order;
                    }
                    return (a.title || '').localeCompare(b.title || '');
                });

                setMemberships(sortedMemberships);
                setLoading(false);
            } catch (error) {
                console.error('Error loading memberships:', error);
                setLoading(false);
            }
        };

        loadMemberships();
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
                title="Membership Plans"
                subtitle="Choose the perfect membership plan that fits your pickleball lifestyle"
                size="large"
                overlayColor="blue"
            />

            {/* Membership Cards */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    {memberships.length === 0 ? (
                        <ContentTile
                            title="Coming Soon"
                            subtitle="Our membership plans are being finalized"
                            backgroundColor="bg-white"
                            textColor="text-gray-600"
                            titleColor="text-picktopia-blue-dark"
                        >
                            <p>We're working on exciting membership options for you. Please check back soon or contact us for more information.</p>
                        </ContentTile>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {memberships.map((membership, index) => (
                                <div key={membership.slug} className="relative">
                                    {/* Popular badge */}
                                    {membership.popular && (
                                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                            <span className="bg-picktopia-orange text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    <ContentTile
                                        title={membership.title}
                                        subtitle={membership.duration}
                                        backgroundColor={membership.popular ? "bg-gradient-to-br from-picktopia-blue-light to-picktopia-blue-dark text-white" : "bg-white"}
                                        textColor={membership.popular ? "text-white" : "text-gray-600"}
                                        titleColor={membership.popular ? "text-white" : "text-picktopia-blue-dark"}
                                        className={membership.popular ? "ring-4 ring-picktopia-orange shadow-2xl scale-105" : "hover:scale-105 transition-transform duration-300"}
                                    >
                                        {/* Price */}
                                        <div className="text-center mb-6">
                                            <div className={`text-4xl font-black ${membership.popular ? 'text-white' : 'text-picktopia-orange'}`}>
                                                {membership.price}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        {membership.features && membership.features.length > 0 && (
                                            <div className="space-y-3 mb-6">
                                                {membership.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-start space-x-3">
                                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full ${membership.popular ? 'bg-white' : 'bg-picktopia-orange'} flex items-center justify-center mt-0.5`}>
                                                            <svg
                                                                className={`w-3 h-3 ${membership.popular ? 'text-picktopia-blue-dark' : 'text-white'}`}
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <span className="flex-1 text-sm leading-relaxed">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Description */}
                                        {membership.description && (
                                            <div className="mb-6">
                                                <div
                                                    className="text-sm leading-relaxed opacity-90"
                                                    dangerouslySetInnerHTML={{
                                                        __html: membership.description
                                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                            .replace(/\n/g, '<br>')
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Sign Up Button */}
                                        {membership.signupLink && (
                                            <div className="mt-auto">
                                                <a
                                                    href={membership.signupLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`block w-full text-center py-3 px-6 rounded-full font-bold text-sm uppercase tracking-wide transition-colors duration-300 ${
                                                        membership.popular
                                                            ? 'bg-white text-picktopia-blue-dark hover:bg-gray-100'
                                                            : 'bg-picktopia-orange text-white hover:bg-orange-600'
                                                    }`}
                                                >
                                                    Sign Up Now
                                                </a>
                                            </div>
                                        )}
                                    </ContentTile>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;