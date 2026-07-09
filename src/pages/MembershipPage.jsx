import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import ContentTile from '../components/ContentTile';
import MembershipCard from '../components/MembershipCard';
import { loadContent, loadLocation } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';
import { updateSeo } from '../utils/seo';

const MembershipPage = ({ locationId, navigateTo }) => {
    const [memberships, setMemberships] = useState([]);
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    // Color schemes to cycle through for multiple memberships - complementary palette
    const colorSchemes = ['lightBlue', 'purple', 'coral', 'teal', 'slate'];

    useEffect(() => {
        const loadMemberships = async () => {
            setLoading(true);

            try {
                const selectedLocation = locationId ? await loadLocation(locationId) : null;
                setLocation(selectedLocation);

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

                const filteredMemberships = membershipData.filter((membership) => {
                    if (membership.locationId) {
                        return membership.locationId === locationId;
                    }

                    return locationId === 'scarborough';
                });

                // Sort by order field, then by title
                const sortedMemberships = filteredMemberships.sort((a, b) => {
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
    }, [locationId]);

    useEffect(() => {
        if (!location) return;

        updateSeo({
            title: `${location.name} Memberships | Picktopia`,
            description: `View membership plans and pricing for ${location.name}.`
        });
    }, [location]);

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
                title={location ? `${location.name} Memberships` : 'Membership Plans'}
                subtitle={location ? `Choose the membership plan for ${location.name}.` : 'Choose a club to view location-specific membership plans.'}
                backgroundImage={location?.image}
                size="large"
                overlayColor="blue"
            />

            {/* Membership Cards */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    {memberships.length === 0 ? (
                        <ContentTile
                            title="Coming Soon"
                            subtitle={location ? `Membership plans for ${location.name} are being finalized` : 'Choose a location to view memberships'}
                            backgroundColor="bg-white"
                            textColor="text-gray-600"
                            titleColor="text-picktopia-blue-dark"
                        >
                            <div className="space-y-4">
                                <p>Membership information will appear here when it is available for this club.</p>
                                <button
                                    onClick={() => navigateTo && navigateTo('clubs')}
                                    className="bg-picktopia-orange text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                                >
                                    View All Locations
                                </button>
                            </div>
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
