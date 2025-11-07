import React from 'react';
import { getAssetPath } from '../utils/assetPath';

const TournamentCard = ({ tournament }) => {
    // Format date to readable string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate tournament payout (prize_pool - annual_pool_contribution - admin_fee)
    const tournamentPayout = tournament.prize_pool - tournament.annual_pool_contribution - tournament.admin_fee;

    return (
        <div className="bg-white rounded-2xl border-2 border-picktopia-blue-light shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
            {/* Tournament Image */}
            {tournament.image && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={getAssetPath(tournament.image)}
                        alt={tournament.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-picktopia-orange text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                        {formatCurrency(tournament.prize_pool)} Prize Pool
                    </div>
                </div>
            )}

            {/* Card Content */}
            <div className="p-6">
                {/* Tournament Title */}
                <h3 className="text-2xl font-black text-picktopia-blue-dark uppercase tracking-wide mb-2">
                    {tournament.title}
                </h3>

                {/* Tournament Date */}
                <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-5 h-5 mr-2 text-picktopia-blue-mid" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold">
                        {formatDate(tournament.tournament_date)}
                    </span>
                </div>

                {/* Prize Pool Breakdown */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4 space-y-2">
                    <h4 className="text-sm font-bold text-picktopia-blue-dark uppercase tracking-wide mb-3">
                        Prize Pool Breakdown
                    </h4>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Total Prize Pool</span>
                        <span className="font-bold text-picktopia-blue-dark">
                            {formatCurrency(tournament.prize_pool)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Tournament Payouts</span>
                        <span className="font-semibold text-green-600">
                            {formatCurrency(tournamentPayout)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Annual Championship Fund</span>
                        <span className="font-semibold text-purple-600">
                            {formatCurrency(tournament.annual_pool_contribution)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Administrative Fee</span>
                        <span className="font-semibold text-gray-500">
                            {formatCurrency(tournament.admin_fee)}
                        </span>
                    </div>
                </div>

                {/* Description */}
                {tournament.description && (
                    <div className="prose prose-sm max-w-none">
                        <div
                            className="text-gray-700 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: tournament.description
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\n/g, '<br>')
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default TournamentCard;
