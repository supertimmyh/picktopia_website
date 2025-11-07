import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { loadContent } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const AnnualTournamentPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTournamentContent = async () => {
            try {
                const tournamentContent = await loadContent('/content/annual-tournament.md');
                if (tournamentContent && tournamentContent.frontmatter) {
                    setContent(tournamentContent.frontmatter);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading annual tournament content:', error);
                setLoading(false);
            }
        };

        loadTournamentContent();
    }, []);

    // Render markdown to HTML
    const renderMarkdown = (markdown) => {
        if (!markdown) return '';

        // Convert markdown to HTML (basic implementation)
        return markdown
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-picktopia-blue-dark mb-3 mt-6">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black text-picktopia-blue-dark mb-4 mt-8 uppercase tracking-wide">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-black text-picktopia-blue-dark mb-6">$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-picktopia-blue-dark">$1</strong>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')
            .replace(/(<li.*<\/li>)/s, '<ul class="list-disc mb-4">$1</ul>');
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <HeroSection
                    title="The Picktopia Annual Moneyball Classic"
                    subtitle="Loading tournament information..."
                    backgroundImage={getAssetPath("/images/uploads/place-holder.jpg")}
                    size="large"
                    overlayColor="blue"
                    logo={
                        <img
                            src={getAssetPath("/images/logo_simplified.svg")}
                            alt="Picktopia Logo"
                            className="w-32 h-32 md:w-40 md:h-40 mx-auto opacity-90 drop-shadow-2xl"
                        />
                    }
                />
                <div className="container mx-auto px-6 py-16">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="min-h-screen">
                <HeroSection
                    title="Tournament Information"
                    subtitle="Content not available"
                    backgroundImage={getAssetPath("/images/uploads/place-holder.jpg")}
                    size="large"
                    overlayColor="blue"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            {/* Hero Section */}
            <HeroSection
                title={content.title}
                subtitle="The Premier Pickleball Tournament of the Year"
                backgroundImage={getAssetPath(content.heroImage || "/images/uploads/place-holder.jpg")}
                size="large"
                overlayColor="blue"
                logo={
                    <img
                        src={getAssetPath("/images/logo_simplified.svg")}
                        alt="Picktopia Logo"
                        className="w-32 h-32 md:w-40 md:h-40 mx-auto opacity-90 drop-shadow-2xl"
                    />
                }
            />

            {/* Main Content Container */}
            <div className="container mx-auto px-6 py-16">
                {/* Tournament Description Section */}
                <section className="mb-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-picktopia-orange">
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: '<p class="mb-4">' + renderMarkdown(content.description) + '</p>'
                        }}
                    />
                </section>

                {/* Two Column Layout for Main Info */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Qualification Process */}
                    <section className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-picktopia-blue-mid">
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: renderMarkdown(content.qualificationProcess)
                            }}
                        />
                    </section>

                    {/* Prize Pool */}
                    <section className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-green-500">
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: renderMarkdown(content.prizePool)
                            }}
                        />
                    </section>
                </div>

                {/* Tournament Format - Full Width */}
                <section className="mb-16 bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-purple-500">
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: renderMarkdown(content.format)
                        }}
                    />
                </section>

                {/* Call to Action Section */}
                <section className="text-center bg-gradient-to-r from-picktopia-blue-dark to-picktopia-blue-mid rounded-2xl shadow-2xl p-12">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-wide">
                        Ready to Compete?
                    </h2>
                    <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                        Start your journey to the Annual Moneyball Classic by participating in our monthly qualifying tournaments.
                    </p>
                    <a
                        href={content.ctaLink || '/events'}
                        className="inline-block bg-picktopia-orange text-white font-bold py-4 px-12 rounded-full text-lg hover:bg-white hover:text-picktopia-orange transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        {content.ctaText || 'Sign Up for Next Tournament'}
                    </a>
                </section>
            </div>
        </div>
    );
};

export default AnnualTournamentPage;
