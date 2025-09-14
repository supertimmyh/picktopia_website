import React from 'react';

const MembershipCard = ({
    membership,
    colorScheme = 'blue',
    isPopular = false
}) => {
    // Color scheme definitions - solid colors for maximum contrast
    const colorSchemes = {
        blue: {
            bg: 'bg-blue-100',
            border: 'border-blue-200',
            text: 'text-gray-800',
            title: 'text-blue-800',
            price: 'text-blue-600',
            feature: 'bg-blue-600',
            featureText: 'text-white',
            button: 'bg-blue-600 hover:bg-blue-700 text-white',
            checkmark: 'text-white'
        },
        green: {
            bg: 'bg-emerald-100',
            border: 'border-emerald-200',
            text: 'text-gray-800',
            title: 'text-emerald-800',
            price: 'text-emerald-600',
            feature: 'bg-emerald-600',
            featureText: 'text-white',
            button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
            checkmark: 'text-white'
        },
        orange: {
            bg: 'bg-orange-100',
            border: 'border-orange-200',
            text: 'text-gray-800',
            title: 'text-orange-800',
            price: 'text-orange-600',
            feature: 'bg-orange-600',
            featureText: 'text-white',
            button: 'bg-orange-600 hover:bg-orange-700 text-white',
            checkmark: 'text-white'
        },
        purple: {
            bg: 'bg-purple-100',
            border: 'border-purple-200',
            text: 'text-gray-800',
            title: 'text-purple-800',
            price: 'text-purple-600',
            feature: 'bg-purple-600',
            featureText: 'text-white',
            button: 'bg-purple-600 hover:bg-purple-700 text-white',
            checkmark: 'text-white'
        },
        dark: {
            bg: 'bg-gray-800',
            border: 'border-gray-700',
            text: 'text-gray-200',
            title: 'text-white',
            price: 'text-picktopia-orange',
            feature: 'bg-picktopia-orange',
            featureText: 'text-gray-900',
            button: 'bg-picktopia-orange hover:bg-orange-600 text-gray-900',
            checkmark: 'text-gray-900'
        }
    };

    // Popular plan gets special treatment with enhanced styling - solid color
    const popularScheme = {
        bg: 'bg-picktopia-blue-dark',
        border: 'border-picktopia-orange ring-4 ring-picktopia-orange',
        text: 'text-white',
        title: 'text-white',
        price: 'text-picktopia-orange',
        feature: 'bg-white',
        featureText: 'text-picktopia-blue-dark',
        button: 'bg-white hover:bg-gray-100 text-picktopia-blue-dark',
        checkmark: 'text-picktopia-blue-dark'
    };

    const colors = isPopular ? popularScheme : colorSchemes[colorScheme];

    return (
        <div className="relative">
            {/* Popular badge */}
            {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-picktopia-orange text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                        Most Popular
                    </span>
                </div>
            )}

            <div
                className={`
                    ${colors.bg} ${colors.border} ${colors.text}
                    rounded-2xl border-2 shadow-lg hover:shadow-2xl
                    transition-all duration-300 p-6 h-full flex flex-col
                    transform hover:-translate-y-2 hover:scale-105
                    ${isPopular ? 'scale-105 shadow-2xl' : ''}
                `}
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <h3 className={`${colors.title} text-2xl font-black uppercase tracking-wide mb-2`}>
                        {membership.title}
                    </h3>
                    <p className={`${colors.text} text-sm opacity-80`}>
                        {membership.duration}
                    </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                    <div className={`${colors.price} text-4xl font-black`}>
                        ${membership.price}
                    </div>
                </div>

                {/* Features */}
                {membership.features && membership.features.length > 0 && (
                    <div className="space-y-3 mb-6 flex-grow">
                        {membership.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className={`
                                    flex-shrink-0 w-5 h-5 rounded-full ${colors.feature}
                                    flex items-center justify-center mt-0.5
                                `}>
                                    <svg
                                        className={`w-3 h-3 ${colors.checkmark}`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <span className="flex-1 text-sm leading-relaxed">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Description */}
                {membership.description && (
                    <div className="mb-6">
                        <div
                            className={`${colors.text} text-sm leading-relaxed opacity-90`}
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
                            className={`
                                block w-full text-center py-3 px-6 rounded-full
                                font-bold text-sm uppercase tracking-wide
                                transition-colors duration-300 ${colors.button}
                            `}
                        >
                            Sign Up Now
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MembershipCard;