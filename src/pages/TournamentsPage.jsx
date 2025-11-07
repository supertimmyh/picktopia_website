import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TournamentCard from '../components/TournamentCard';
import { loadContent } from '../utils/contentLoader';
import { getAssetPath } from '../utils/assetPath';

const TournamentsPage = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('date'); // 'date', 'title', 'prize'
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

    useEffect(() => {
        const loadTournaments = async () => {
            try {
                // Load tournament slugs from manifest file
                const manifestResponse = await fetch(getAssetPath('/content/tournaments/manifest.json'));
                let slugs = [];

                if (manifestResponse.ok) {
                    slugs = await manifestResponse.json();
                } else {
                    console.log('Tournaments manifest not found');
                    setLoading(false);
                    return;
                }

                const items = [];
                for (const slug of slugs) {
                    const content = await loadContent(`/content/tournaments/${slug}.md`);
                    if (content && content.frontmatter) {
                        // Only include enabled tournaments
                        if (content.frontmatter.enabled !== false) {
                            items.push({ slug, ...content.frontmatter });
                        }
                    }
                }

                setTournaments(items);
                setLoading(false);
            } catch (error) {
                console.error('Error loading tournaments:', error);
                setLoading(false);
            }
        };

        loadTournaments();
    }, []);

    const sortTournaments = (tournaments, sortBy, sortOrder) => {
        return [...tournaments].sort((a, b) => {
            let comparison = 0;

            if (sortBy === 'date') {
                const dateA = new Date(a.tournament_date || 0);
                const dateB = new Date(b.tournament_date || 0);
                comparison = dateA - dateB;
            } else if (sortBy === 'title') {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === 'prize') {
                comparison = (a.prize_pool || 0) - (b.prize_pool || 0);
            }

            return sortOrder === 'desc' ? -comparison : comparison;
        });
    };

    const sortedTournaments = sortTournaments(tournaments, sortBy, sortOrder);

    const handleSortChange = (newSortBy) => {
        if (newSortBy === sortBy) {
            // Toggle sort order if clicking the same sort option
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            // Default: newest/highest first for date and prize, A-Z for title
            setSortOrder(newSortBy === 'title' ? 'asc' : 'desc');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <HeroSection
                    title="Tournaments"
                    subtitle="Compete for cash prizes in our exciting tournament series"
                    backgroundImage={getAssetPath("/images/uploads/place-holder.jpg")}
                    size="large"
                    overlayColor="blue"
                />

                <div className="container mx-auto px-6 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-lg">
                                <div className="w-full h-48 bg-gray-300"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-gray-300 rounded mb-3"></div>
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-24 bg-gray-300 rounded mb-4"></div>
                                    <div className="h-20 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <HeroSection
                title="Tournaments"
                subtitle="Compete for cash prizes in our exciting tournament series"
                backgroundImage={getAssetPath("/images/uploads/place-holder.jpg")}
                size="large"
                overlayColor="blue"
            />

            {/* Tournaments Content */}
            <div className="container mx-auto px-6 py-16">
                {/* Sort Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <h2 className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                            All Tournaments ({tournaments.length})
                        </h2>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600 text-sm font-medium">Sort by:</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSortChange('date')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                                    sortBy === 'date'
                                        ? 'bg-picktopia-blue-dark text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Date {sortBy === 'date' && (sortOrder === 'desc' ? '↓' : '↑')}
                            </button>
                            <button
                                onClick={() => handleSortChange('prize')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                                    sortBy === 'prize'
                                        ? 'bg-picktopia-blue-dark text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Prize {sortBy === 'prize' && (sortOrder === 'desc' ? '↓' : '↑')}
                            </button>
                            <button
                                onClick={() => handleSortChange('title')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                                    sortBy === 'title'
                                        ? 'bg-picktopia-blue-dark text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                Title {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tournaments Grid */}
                {sortedTournaments.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="font-heading text-6xl mb-4">🏆</div>
                        <h3 className="font-heading text-2xl font-bold text-picktopia-blue-dark mb-2">
                            No Tournaments Scheduled Yet
                        </h3>
                        <p className="text-gray-600 text-lg max-w-md mx-auto">
                            We're planning exciting tournaments for our community. Check back soon for tournament announcements and registration details!
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedTournaments.map((tournament, index) => (
                            <TournamentCard
                                key={tournament.slug || index}
                                tournament={tournament}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TournamentsPage;
