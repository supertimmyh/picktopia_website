import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ContentTile from '../components/ContentTile';
import MembershipCard from '../components/MembershipCard';
import { loadContent } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const MembershipPage = () => {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);

    // Color schemes to cycle through for multiple memberships - complementary palette
    const colorSchemes = ['lightBlue', 'purple', 'coral', 'teal', 'slate'];

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
                <div className="max-w-7xl mx-auto">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                            {memberships.map((membership, index) => {
                                // Assign color scheme - popular gets special treatment, others cycle through schemes
                                const colorScheme = membership.popular ? 'popular' : colorSchemes[index % colorSchemes.length];

                                return (
                                    <MembershipCard
                                        key={membership.slug}
                                        membership={membership}
                                        colorScheme={colorScheme}
                                        isPopular={membership.popular}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MembershipPage;