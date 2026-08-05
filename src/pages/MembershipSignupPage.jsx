import React, { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { getFormspreeAjaxUrl } from '../config/formspree';
import {
    getMembershipDeposit,
    RH_MEMBERSHIP_PAYMENT,
    RH_MEMBERSHIP_SIGNUP_LOCATION_ID
} from '../config/membershipSignup';
import { loadContent, loadLocation } from '../utils/contentLoader';
import { getLocationPageName } from '../utils/navigation';
import { updateSeo } from '../utils/seo';

const initialFormData = {
    name: '',
    email: '',
    phone: '',
    notes: '',
    acknowledgement: false
};

const MembershipSignupPage = ({ locationId, membershipSlug, navigateTo }) => {
    const [membership, setMembership] = useState(null);
    const [location, setLocation] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const depositAmount = getMembershipDeposit(membership?.title);
    const isValidTemporarySignup = locationId === RH_MEMBERSHIP_SIGNUP_LOCATION_ID && depositAmount;

    useEffect(() => {
        const loadSignupContent = async () => {
            setLoading(true);

            try {
                const [selectedLocation, membershipContent] = await Promise.all([
                    loadLocation(locationId),
                    loadContent(`/content/memberships/${membershipSlug}.md`)
                ]);

                setLocation(selectedLocation);

                if (membershipContent?.frontmatter) {
                    setMembership({
                        slug: membershipSlug,
                        ...membershipContent.frontmatter
                    });
                }
            } catch (error) {
                console.error('Error loading membership signup content:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSignupContent();
    }, [locationId, membershipSlug]);

    useEffect(() => {
        updateSeo({
            title: membership ? `${membership.title} Signup | Picktopia` : 'Membership Signup | Picktopia',
            description: 'Submit your Richmond Hill membership deposit signup information.'
        });
    }, [membership]);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        if (!formData.acknowledgement) {
            setSubmitError('Please confirm that you understand the deposit is sent separately by e-transfer.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(getFormspreeAjaxUrl('membershipSignup'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    notes: formData.notes,
                    location: location?.name || locationId,
                    locationId,
                    membership: membership?.title,
                    membershipSlug,
                    membershipPrice: membership?.price,
                    depositAmount: `$${depositAmount}`,
                    acknowledgement: 'Customer understands deposit is sent separately by e-transfer and the membership is a 12-month commitment.',
                    _subject: `New RH Membership Deposit Signup - ${membership?.title || 'Membership'}`
                })
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Membership signup submission error:', error);
            setSubmitError('Sorry, there was an error submitting your signup. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="font-heading text-2xl font-bold text-picktopia-blue-dark">
                    Loading...
                </div>
            </div>
        );
    }

    if (!membership || !isValidTemporarySignup) {
        return (
            <div className="min-h-screen bg-gray-100">
                <div className="container mx-auto px-6 py-16">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                        <h1 className="font-heading text-3xl font-black text-picktopia-blue-dark mb-4">
                            Membership Signup Unavailable
                        </h1>
                        <p className="text-gray-700 mb-8">
                            This temporary deposit signup form is only available for Richmond Hill paid memberships.
                        </p>
                        <Button
                            type="button"
                            variant="picktopia"
                            onClick={() => navigateTo(getLocationPageName(locationId, 'membership'))}
                        >
                            Back to Memberships
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <HeroSection
                title="Membership Signup"
                subtitle={`${location?.name || 'Picktopia RH'} - ${membership.title}`}
                backgroundImage={location?.image}
                size="medium"
                overlayColor="blue"
            />

            <div className="container mx-auto px-6 py-12">
                <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_360px] gap-8 items-start">
                    <section className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        {submitted ? (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="font-heading text-3xl font-black text-picktopia-blue-dark mb-3">
                                        Signup Received
                                    </h2>
                                    <p className="text-gray-700">
                                        Thank you. Please send your deposit by e-transfer to complete the next step.
                                    </p>
                                </div>

                                <div className="bg-picktopia-blue-dark text-white rounded-lg p-6 space-y-4">
                                    <div>
                                        <p className="text-sm uppercase font-bold text-picktopia-orange">E-transfer recipient</p>
                                        <p className="text-xl font-bold">{RH_MEMBERSHIP_PAYMENT.clubName}</p>
                                        <p className="text-lg">{RH_MEMBERSHIP_PAYMENT.etransferEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm uppercase font-bold text-picktopia-orange">Deposit amount</p>
                                        <p className="text-3xl font-black">${depositAmount}</p>
                                    </div>
                                    <div className="space-y-2 text-sm leading-relaxed">
                                        <p>{RH_MEMBERSHIP_PAYMENT.securityInstruction}</p>
                                        <p>{RH_MEMBERSHIP_PAYMENT.noteInstruction}</p>
                                        <p className="font-bold">{RH_MEMBERSHIP_PAYMENT.depositWarning}</p>
                                    </div>
                                </div>

                                <div className="text-gray-700">
                                    <p className="font-bold text-picktopia-blue-dark">Questions?</p>
                                    <p>Email: {RH_MEMBERSHIP_PAYMENT.contactEmail}</p>
                                    <p>Phone: {RH_MEMBERSHIP_PAYMENT.contactPhone}</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="mb-8">
                                    <h2 className="font-heading text-3xl font-black text-picktopia-blue-dark mb-3">
                                        Submit Your Information
                                    </h2>
                                    <p className="text-gray-700">
                                        Complete this form first. After it is submitted, the e-transfer deposit instructions will appear.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {submitError && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                                            {submitError}
                                        </div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your full name"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone *</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="647-478-9866"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="selectedMembership">Selected Membership</Label>
                                            <Input
                                                id="selectedMembership"
                                                type="text"
                                                value={`${membership.title} - $${depositAmount} deposit`}
                                                readOnly
                                                className="bg-gray-100"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes (optional)</Label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            rows="4"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-gray-900 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            placeholder="Anything our membership team should know?"
                                        />
                                    </div>

                                    <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="acknowledgement"
                                            checked={formData.acknowledgement}
                                            onChange={handleInputChange}
                                            className="mt-1"
                                            required
                                        />
                                        <span className="text-sm text-gray-700">
                                            I understand that my membership spot is not secured until Picktopia receives my e-transfer deposit, and that this membership is a 12-month commitment.
                                        </span>
                                    </label>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <Button
                                            type="submit"
                                            variant="picktopia"
                                            size="xl"
                                            disabled={isSubmitting}
                                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Submit Signup'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="xl"
                                            onClick={() => navigateTo(getLocationPageName(locationId, 'membership'))}
                                        >
                                            Back to Memberships
                                        </Button>
                                    </div>
                                </form>
                            </>
                        )}
                    </section>

                    <aside className="bg-picktopia-blue-dark text-white rounded-lg shadow-lg p-6">
                        <h3 className="font-heading text-xl font-black mb-4">Selected Plan</h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm uppercase text-picktopia-orange font-bold">Membership</p>
                                <p className="text-2xl font-black">{membership.title}</p>
                            </div>
                            <div>
                                <p className="text-sm uppercase text-picktopia-orange font-bold">Membership price</p>
                                <p>{membership.price}</p>
                            </div>
                            <div>
                                <p className="text-sm uppercase text-picktopia-orange font-bold">Deposit due</p>
                                <p className="text-3xl font-black">${depositAmount}</p>
                            </div>
                            <p className="text-sm text-white/80">{RH_MEMBERSHIP_PAYMENT.depositWarning}</p>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default MembershipSignupPage;
