import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '../lib/utils';
import { getFormspreeAjaxUrl } from '../config/formspree';

const IntroSignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: 'never-played'
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(getFormspreeAjaxUrl('intro'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    experience: formData.experience,
                    _subject: 'New Free Pickleball Intro Signup'
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                // Reset form after 3 seconds
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        experience: 'never-played'
                    });
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitError('Sorry, there was an error submitting your form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="text-center py-8">
                <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
                    <h4 className="font-heading text-xl font-bold mb-2">Thank You!</h4>
                    <p className="text-lg">We'll contact you soon to confirm your spot in our next intro session.</p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {submitError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-white">
                    {submitError}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-semibold">
                        Full Name *
                    </Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={cn(
                            "border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70",
                            "focus-visible:ring-white/50 focus-visible:ring-offset-0"
                        )}
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-semibold">
                        Email Address *
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={cn(
                            "border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70",
                            "focus-visible:ring-white/50 focus-visible:ring-offset-0"
                        )}
                        placeholder="Enter your email"
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-semibold">
                    Phone Number
                </Label>
                <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={cn(
                        "border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70",
                        "focus-visible:ring-white/50 focus-visible:ring-offset-0"
                    )}
                    placeholder="(Optional) Your phone number"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="experience" className="text-white font-semibold">
                    Pickleball Experience
                </Label>
                <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm text-white",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-0"
                    )}
                >
                    <option value="never-played" className="text-gray-800">Never played before</option>
                    <option value="tried-once" className="text-gray-800">Tried once or twice</option>
                    <option value="some-experience" className="text-gray-800">Some experience but want to start fresh</option>
                </select>
            </div>

            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-picktopia-orange hover:bg-orange-50 font-heading tracking-wide uppercase mt-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                size="xl"
            >
                {isSubmitting ? (
                    <>
                        <span className="hidden sm:inline">Submitting...</span>
                        <span className="sm:hidden">Submitting...</span>
                    </>
                ) : (
                    <>
                        <span className="hidden sm:inline">Reserve My Spot - It's Free!</span>
                        <span className="sm:hidden">Reserve!</span>
                    </>
                )}
            </Button>
        </form>
    );
};

export default IntroSignupForm;