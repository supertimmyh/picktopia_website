import React, { useState } from 'react';
import { getFormspreeAjaxUrl } from '../config/formspree';

const Newsletter = ({ data, fallbackData }) => {
    const { title, subtitle } = data || fallbackData;
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(getFormspreeAjaxUrl('newsletter'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    _subject: 'New Newsletter Subscription'
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                // Reset form after 3 seconds
                setTimeout(() => {
                    setSubmitted(false);
                    setEmail('');
                }, 3000);
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            console.error('Newsletter submission error:', error);
            setSubmitError('Sorry, there was an error subscribing. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-picktopia-orange text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm max-w-lg mx-auto">
                        <h3 className="text-2xl font-bold mb-2">Welcome to the Newsletter! 🎉</h3>
                        <p className="text-lg">You're now subscribed and will receive our latest updates, events, and pickleball tips.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-picktopia-orange text-white py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{title}</h2>
                <p className="mb-6">{subtitle}</p>
                {submitError && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-white max-w-lg mx-auto mb-4">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                        className="flex-grow p-3 rounded-md border-2 border-picktopia-blue-dark/50 focus:border-picktopia-blue-dark focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-picktopia-blue-dark text-white font-bold py-3 px-6 rounded-md hover:bg-picktopia-blue-mid transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;