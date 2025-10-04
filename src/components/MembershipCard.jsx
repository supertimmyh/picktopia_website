import React from 'react';

const MembershipCard = ({
    membership,
    colorScheme = 'blue',
    isPopular = false
}) => {
    // Color scheme definitions - lighter version of the popular card's blue/orange palette
    const colorSchemes = {
        lightBlue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-gray-700',
            title: 'text-picktopia-blue-dark',
            price: 'text-picktopia-blue-mid',
            feature: 'bg-picktopia-blue-mid',
            featureText: 'text-white',
            button: 'bg-picktopia-blue-mid hover:bg-picktopia-blue-dark text-white',
            checkmark: 'text-white'
        },
        purple: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-gray-700',
            title: 'text-picktopia-blue-dark',
            price: 'text-picktopia-blue-mid',
            feature: 'bg-picktopia-blue-mid',
            featureText: 'text-white',
            button: 'bg-picktopia-blue-mid hover:bg-picktopia-blue-dark text-white',
            checkmark: 'text-white'
        },
        coral: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-gray-700',
            title: 'text-picktopia-blue-dark',
            price: 'text-picktopia-blue-mid',
            feature: 'bg-picktopia-blue-mid',
            featureText: 'text-white',
            button: 'bg-picktopia-blue-mid hover:bg-picktopia-blue-dark text-white',
            checkmark: 'text-white'
        },
        teal: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-gray-700',
            title: 'text-picktopia-blue-dark',
            price: 'text-picktopia-blue-mid',
            feature: 'bg-picktopia-blue-mid',
            featureText: 'text-white',
            button: 'bg-picktopia-blue-mid hover:bg-picktopia-blue-dark text-white',
            checkmark: 'text-white'
        },
        slate: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-gray-700',
            title: 'text-picktopia-blue-dark',
            price: 'text-picktopia-blue-mid',
            feature: 'bg-picktopia-blue-mid',
            featureText: 'text-white',
            button: 'bg-picktopia-blue-mid hover:bg-picktopia-blue-dark text-white',
            checkmark: 'text-white'
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
                    ${isPopular ? 'shadow-2xl ring-4 ring-picktopia-orange' : ''}
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
                <div className="text-center mb-4">
                    {membership.originalPrice ? (
                        // Show promotional pricing with crossed-out original price
                        <div>
                            <div className={`${colors.text} text-lg line-through opacity-60 mb-1`}>
                                ${membership.originalPrice}
                            </div>
                            <div className={`${colors.price} text-4xl font-black`}>
                                ${membership.price}
                            </div>
                        </div>
                    ) : (
                        // Show regular pricing (existing behavior)
                        <div className={`${colors.price} text-4xl font-black`}>
                            ${membership.price}
                        </div>
                    )}
                </div>

                {/* Description */}
                {membership.description && (
                    <div className="text-center mb-6">
                        <div
                            className={`${colors.text} text-xs leading-relaxed opacity-75 italic`}
                            dangerouslySetInnerHTML={{
                                __html: membership.description
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\n/g, '<br>')
                            }}
                        />
                    </div>
                )}

                {/* Features */}
                {membership.features && membership.features.length > 0 && (
                    <div className="space-y-3 mb-6 flex-1">
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

                {/* Sign Up Button */}
                <div className="mt-auto">
                    {membership.signupLink ? (
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
                    ) : (
                        <div className="h-12"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MembershipCard;