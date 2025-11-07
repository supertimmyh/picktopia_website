import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { loadContent } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const AnnualTournamentPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [displayPrizePool, setDisplayPrizePool] = useState(0);

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

    // Animated counter effect for prize pool
    useEffect(() => {
        if (content && content.currentPrizePool) {
            const targetValue = content.currentPrizePool;
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = targetValue / steps;
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                if (currentStep >= steps) {
                    setDisplayPrizePool(targetValue);
                    clearInterval(timer);
                } else {
                    setDisplayPrizePool(Math.floor(increment * currentStep));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [content]);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Render markdown to HTML (simplified)
    const renderMarkdown = (markdown) => {
        if (!markdown) return '';
        return markdown
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-black text-picktopia-blue-dark mb-4 mt-6 uppercase tracking-wide">$1</h2>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-picktopia-blue-dark">$1</strong>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/^- (.*$)/gim, '<li class="ml-6 mb-2">$1</li>')
            .replace(/(<li.*<\/li>)/s, '<ul class="list-disc mb-4 text-gray-700">$1</ul>');
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
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
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

            <div className="container mx-auto px-6 py-16">
                {/* PRIZE POOL COUNTER - Main Feature */}
                <section className="mb-16 -mt-24 relative z-10">
                    <div className="bg-gradient-to-br from-picktopia-orange via-orange-500 to-orange-600 rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-transform duration-300">
                        <div className="mb-4">
                            <span className="text-white text-xl md:text-2xl font-bold uppercase tracking-wider">
                                Current Prize Pool
                            </span>
                        </div>
                        <div className="text-white text-6xl md:text-8xl font-black mb-4 font-heading drop-shadow-2xl">
                            {formatCurrency(displayPrizePool)}
                        </div>
                        <div className="text-white text-lg md:text-xl opacity-90">
                            Growing with every monthly tournament
                        </div>
                    </div>
                </section>

                {/* Tournament Description */}
                <section className="mb-12 text-center max-w-4xl mx-auto">
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                        {content.description}
                    </p>
                </section>

                {/* Two Column: How to Qualify & Details */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* How to Qualify */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-picktopia-blue-mid">
                        <h2 className="text-2xl font-black text-picktopia-blue-dark uppercase tracking-wide mb-6 flex items-center">
                            <svg className="w-8 h-8 mr-3 text-picktopia-blue-mid" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            How to Qualify
                        </h2>
                        <p className="text-gray-700 text-lg leading-relaxed">
                            {content.howToQualify}
                        </p>
                    </div>

                    {/* Tournament Details */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500">
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: '<p class="mb-4 text-gray-700">' + renderMarkdown(content.details) + '</p>'
                            }}
                        />
                    </div>
                </div>

                {/* Call to Action */}
                <section className="text-center">
                    <div className="bg-gradient-to-r from-picktopia-blue-dark to-picktopia-blue-mid rounded-2xl shadow-2xl p-12">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-wide">
                            Ready to Compete?
                        </h2>
                        <p className="text-xl text-white mb-8 max-w-2xl mx-auto opacity-90">
                            Start qualifying today by participating in our monthly tournaments
                        </p>
                        <a
                            href={content.ctaLink || '/events'}
                            className="inline-block bg-picktopia-orange text-white font-bold py-4 px-12 rounded-full text-lg hover:bg-white hover:text-picktopia-orange transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            {content.ctaText || 'View Monthly Tournaments'}
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AnnualTournamentPage;
