import React from 'react';

const WhyPartnerSection = ({ content }) => {
    const benefits = [
        {
            title: "Reach an Engaged Community",
            description: "Connect with 1,200+ monthly visitors who are passionate about active living and community wellness. Our members are local families and professionals who value quality and support local businesses.",
            highlights: [
                "Ages 25-65, strong representation across all age groups",
                "Above-average household income and education levels", 
                "Health and wellness-focused lifestyle",
                "Strong local community engagement"
            ],
            icon: "👥"
        },
        {
            title: "Align With Excellence", 
            description: "Associate your brand with our region's premier pickleball facility and our commitment to community wellness. We maintain the highest standards in everything we do.",
            highlights: [
                "State-of-the-art facility and professional equipment",
                "Certified instructors and structured programming",
                "Clean, welcoming, and professional environment",
                "Positive brand association and community reputation"
            ],
            icon: "⭐"
        },
        {
            title: "Create Meaningful Connections",
            description: "Build authentic relationships through events, member benefits, and community programming that goes beyond traditional advertising.",
            highlights: [
                "Exclusive member events and tournaments",
                "Corporate team building programs", 
                "Community wellness initiatives",
                "Educational workshops and clinics"
            ],
            icon: "🤝"
        }
    ];

    return (
        <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center text-picktopia-blue-dark">
                Why Partner With Us
            </h2>
            <p className="font-body text-lg text-center mb-12 max-w-3xl mx-auto text-gray-700">
                Connect with a thriving community that values health, wellness, and local business support.
            </p>
            
            <div className="grid lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="text-center mb-6">
                            <div className="text-4xl mb-4">{benefit.icon}</div>
                            <h3 className="font-heading text-xl font-bold text-picktopia-blue-dark mb-4">
                                {benefit.title}
                            </h3>
                        </div>
                        
                        <p className="font-body text-gray-600 mb-6 leading-relaxed">
                            {benefit.description}
                        </p>
                        
                        <div className="space-y-3">
                            {benefit.highlights.map((highlight, idx) => (
                                <div key={idx} className="flex items-start">
                                    <span className="w-2 h-2 bg-picktopia-orange rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                    <span className="font-body text-sm text-gray-700 leading-relaxed">
                                        {highlight}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyPartnerSection;