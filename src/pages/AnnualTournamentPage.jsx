import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { loadContent } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const AnnualTournamentPage = () => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [displayPrizePool, setDisplayPrizePool] = useState(0);
    const [activeTab, setActiveTab] = useState('monthly');

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
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
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
                    <div className="bg-gradient-to-br from-picktopia-orange via-orange-500 to-orange-600 rounded-3xl shadow-2xl p-8 md:p-12 text-center transform hover:scale-105 transition-transform duration-300">
                        <div className="mb-4">
                            <span className="text-white text-xl md:text-2xl font-bold uppercase tracking-wider">
                                Current Prize Pool
                            </span>
                        </div>
                        <div className="text-white text-5xl md:text-7xl font-black mb-2 font-heading drop-shadow-2xl">
                            {formatCurrency(displayPrizePool)}
                        </div>
                        <div className="text-white text-sm md:text-base opacity-75 mb-2">
                            As of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-white text-lg md:text-xl opacity-90">
                            Growing with every monthly tournament
                        </div>
                    </div>
                </section>

                {/* Tournament Overview */}
                <section className="mb-16 text-center max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                        {content.description}
                    </p>
                </section>

                {/* Key Info Cards */}
                <section className="grid md:grid-cols-2 gap-6 mb-16">
                    {/* Event Date */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-picktopia-blue-mid">
                        <div className="text-picktopia-blue-mid text-4xl font-bold mb-2">📅</div>
                        <h3 className="text-lg font-black text-picktopia-blue-dark uppercase mb-2">Event Date</h3>
                        <p className="text-gray-700 text-lg">{content.eventDate || 'Year End (TBA)'}</p>
                    </div>

                    {/* Member Only */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-t-4 border-purple-500">
                        <div className="text-purple-500 text-4xl font-bold mb-2">👥</div>
                        <h3 className="text-lg font-black text-picktopia-blue-dark uppercase mb-2">Members Only</h3>
                        <p className="text-gray-700 text-lg">Registered Picktopia Members</p>
                    </div>
                </section>

                {/* Qualification Process */}
                <section className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-picktopia-blue-dark uppercase tracking-wide mb-10 text-center">
                        Path to the Classic
                    </h2>
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-picktopia-blue-mid">
                        <div className="flex items-center justify-center mb-8">
                            <svg className="w-8 h-8 text-picktopia-blue-mid mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-2xl font-black text-picktopia-blue-dark uppercase">How to Qualify</h3>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            {content.howToQualify}
                        </p>

                        {/* Qualification Timeline */}
                        {(content.topSeeds || content.wildCardSpots) && (
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h4 className="text-xl font-bold text-picktopia-blue-dark mb-6">Seeding Breakdown</h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {content.topSeeds && (
                                        <div className="bg-blue-50 rounded-lg p-6">
                                            <div className="flex items-start">
                                                <div className="bg-picktopia-blue-mid text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                                                    {content.topSeeds}
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-picktopia-blue-dark mb-1">Top Seeded Teams</h5>
                                                    <p className="text-sm text-gray-700">Monthly tournament winners automatically qualify (1 per month)</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {content.wildCardSpots && (
                                        <div className="bg-purple-50 rounded-lg p-6">
                                            <div className="flex items-start">
                                                <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                                                    {content.wildCardSpots}
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-picktopia-blue-dark mb-1">Wild Card Spots</h5>
                                                    <p className="text-sm text-gray-700">Available based on top finishes and participation</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Skill Divisions */}
                {content.divisions && content.divisions.length > 0 && (
                    <section className="mb-16">
                        <h2 className="text-3xl md:text-4xl font-black text-picktopia-blue-dark uppercase tracking-wide mb-10 text-center">
                            Skill Divisions
                        </h2>
                        <div className="grid md:grid-cols-4 gap-4 mb-8">
                            {content.divisions.map((division, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200">
                                    <div className="text-3xl font-black text-picktopia-blue-dark mb-2">{division.level}</div>
                                    <p className="text-sm text-gray-700">
                                        {division.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Prize Structure - Tabbed */}
                <section className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-picktopia-blue-dark uppercase tracking-wide mb-10 text-center">
                        Prize Structure
                    </h2>

                    {/* Tabs */}
                    <div className="flex justify-center gap-4 mb-8 flex-wrap">
                        <button
                            onClick={() => setActiveTab('monthly')}
                            className={`px-6 py-3 rounded-full font-bold uppercase transition-all ${
                                activeTab === 'monthly'
                                    ? 'bg-picktopia-orange text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Monthly Tournaments
                        </button>
                        <button
                            onClick={() => setActiveTab('annual')}
                            className={`px-6 py-3 rounded-full font-bold uppercase transition-all ${
                                activeTab === 'annual'
                                    ? 'bg-picktopia-orange text-white shadow-lg'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Annual Prize Pool
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        {activeTab === 'monthly' && (
                            <div className="animate-fadeIn">
                                <h3 className="text-2xl font-black text-picktopia-blue-dark mb-6">Monthly Tournament Prizes</h3>
                                {content.monthlyEntryFee && (
                                    <div className="mb-6 p-4 bg-gradient-to-r from-picktopia-blue-mid to-picktopia-blue-dark rounded-lg">
                                        <p className="text-white text-center text-lg">
                                            <span className="font-bold">Entry Fee:</span> {formatCurrency(content.monthlyEntryFee)} per player
                                        </p>
                                    </div>
                                )}
                                <p className="text-gray-700 mb-8 text-lg">Each entry fee goes toward immediate cash prizes for top finishers:</p>

                                {content.monthlyPrizes && (
                                    <div className="space-y-4">
                                        <div className="flex items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                            <div className="text-3xl font-black text-blue-500 mr-6 w-20 text-center">1st</div>
                                            <div className="flex-1">
                                                <p className="font-bold text-picktopia-blue-dark">{content.monthlyPrizes.first}% of Prize Pool</p>
                                                <p className="text-sm text-gray-600">1st place prize per division</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                                            <div className="text-3xl font-black text-gray-400 mr-6 w-20 text-center">2nd</div>
                                            <div className="flex-1">
                                                <p className="font-bold text-picktopia-blue-dark">{content.monthlyPrizes.second}% of Prize Pool</p>
                                                <p className="text-sm text-gray-600">2nd place prize per division</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 bg-amber-50 rounded-lg border-l-4 border-amber-400">
                                            <div className="text-3xl font-black text-amber-600 mr-6 w-20 text-center">3rd</div>
                                            <div className="flex-1">
                                                <p className="font-bold text-picktopia-blue-dark">{content.monthlyPrizes.third}% of Prize Pool</p>
                                                <p className="text-sm text-gray-600">3rd place prize per division</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {content.entryFeeAllocation && (
                                    <div className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-lg">
                                        <p className="text-sm text-gray-700">
                                            <strong>Entry Fee Allocation:</strong> {formatCurrency(content.entryFeeAllocation.monthlyPrizes)} goes to monthly prizes, {formatCurrency(content.entryFeeAllocation.annualPool)} accumulates to Annual Prize Pool, {formatCurrency(content.entryFeeAllocation.processing)} covers processing
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'annual' && (
                            <div className="animate-fadeIn">
                                <h3 className="text-2xl font-black text-picktopia-blue-dark mb-6">Annual Moneyball Classic Distribution</h3>
                                <p className="text-gray-700 mb-8 text-lg">Prize distribution for the year-end championship tournament:</p>

                                {content.annualPrizes && (
                                    <div className="space-y-4">
                                        <div className="flex items-center p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                                            <div className="text-3xl font-black text-yellow-600 mr-6 w-20 text-center">🏆</div>
                                            <div className="flex-1">
                                                <p className="font-bold text-picktopia-blue-dark">Champion: {content.annualPrizes.champion}%</p>
                                                <p className="text-sm text-gray-600">1st place winner of the annual tournament</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 bg-gray-100 rounded-lg border-l-4 border-gray-400">
                                            <div className="text-3xl font-black text-gray-500 mr-6 w-20 text-center">🥈</div>
                                            <div className="flex-1">
                                                <p className="font-bold text-picktopia-blue-dark">Runner-up: {content.annualPrizes.runnerUp}%</p>
                                                <p className="text-sm text-gray-600">2nd place finisher</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                                            <div className="text-3xl font-black text-orange-600 mr-6 w-20 text-center">🥉</div>
                                            <div className="flex-1">
                                                <p className="font-bold text-picktopia-blue-dark">Semi-finalists: {content.annualPrizes.semifinalist}% each</p>
                                                <p className="text-sm text-gray-600">3rd and 4th place finishers</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                                            <div className="text-3xl font-black text-blue-500 mr-6 w-20 text-center">4️⃣</div>
                                            <div className="flex-1">
                                                <p className="font-bold text-picktopia-blue-dark">Quarter-finalists: {content.annualPrizes.quarterfinalist}% each</p>
                                                <p className="text-sm text-gray-600">5th-8th place finishers</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {content.entryFeeAllocation && (
                                    <div className="mt-8 p-4 bg-orange-100 border border-orange-300 rounded-lg">
                                        <p className="text-sm text-gray-700">
                                            <strong>Note:</strong> The annual prize pool accumulates from {formatCurrency(content.entryFeeAllocation.annualPool)} of each team's monthly entry fee throughout the year.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Tournament Details */}
                {content.details && (
                    <section className="mb-16">
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-purple-500">
                            <h2 className="text-2xl font-black text-picktopia-blue-dark uppercase tracking-wide mb-6 flex items-center">
                                <svg className="w-8 h-8 mr-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                Tournament Details
                            </h2>
                            <div
                                className="prose prose-lg max-w-none text-gray-700"
                                dangerouslySetInnerHTML={{
                                    __html: renderMarkdown(content.details)
                                }}
                            />
                        </div>
                    </section>
                )}

                {/* Call to Action */}
                <section className="text-center">
                    <div className="bg-gradient-to-r from-picktopia-blue-dark to-picktopia-blue-mid rounded-2xl shadow-2xl p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wide">
                            Ready to Compete?
                        </h2>
                        <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto opacity-90">
                            Start qualifying today by participating in our monthly tournaments
                        </p>
                        <a
                            href={content.nextQualifyingTournamentLink || content.ctaLink || '/events'}
                            className="inline-block bg-picktopia-orange text-white font-bold py-4 px-12 rounded-full text-lg hover:bg-white hover:text-picktopia-orange transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            {content.nextQualifyingTournamentName || content.ctaText || 'Sign Up for Next Tournament'}
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AnnualTournamentPage;
