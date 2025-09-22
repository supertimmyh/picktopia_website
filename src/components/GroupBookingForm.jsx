import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { getFormspreeAjaxUrl } from '../config/formspree';

const GroupBookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        groupSize: '',
        specialRequests: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await fetch(getFormspreeAjaxUrl('groupBooking'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    eventType: formData.eventType,
                    eventDate: formData.eventDate,
                    groupSize: formData.groupSize,
                    specialRequests: formData.specialRequests,
                    _subject: 'New Group Booking Inquiry'
                }),
            });

            if (response.ok) {
                setSubmitted(true);
                // Reset form after 5 seconds
                setTimeout(() => {
                    setSubmitted(false);
                    setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        eventType: '',
                        eventDate: '',
                        groupSize: '',
                        specialRequests: ''
                    });
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitError('Sorry, there was an error submitting your inquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-picktopia-blue-dark text-white rounded-2xl shadow-lg p-8 md:p-12">
                <div className="text-center py-8">
                    <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
                        <h4 className="font-heading text-2xl font-bold mb-4">Thank You!</h4>
                        <p className="text-lg mb-2">Your group booking inquiry has been submitted successfully.</p>
                        <p className="text-base opacity-90">Our events team will get back to you within 24 hours with a custom package for your group.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-picktopia-blue-dark text-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center">
                Event Inquiry Form
            </h2>
            <p className="font-body text-lg text-center mb-8 max-w-3xl mx-auto">
                Fill out the form below and our events team will create a custom package for your group.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                {submitError && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-white">
                        {submitError}
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <Label htmlFor="name" className="text-white mb-2 block">
                            Name *
                        </Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-white text-gray-800"
                            placeholder="Your full name"
                        />
                    </div>
                    
                    <div>
                        <Label htmlFor="email" className="text-white mb-2 block">
                            Email *
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="bg-white text-gray-800"
                            placeholder="your.email@example.com"
                        />
                    </div>
                    
                    <div>
                        <Label htmlFor="phone" className="text-white mb-2 block">
                            Phone *
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-white text-gray-800"
                            placeholder="(555) 123-4567"
                        />
                    </div>
                    
                    <div>
                        <Label htmlFor="eventType" className="text-white mb-2 block">
                            Event Type *
                        </Label>
                        <select
                            id="eventType"
                            name="eventType"
                            required
                            value={formData.eventType}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300"
                        >
                            <option value="">Select event type</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="birthday">Birthday Party</option>
                            <option value="team-building">Team Building</option>
                            <option value="social">Social Gathering</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div>
                        <Label htmlFor="eventDate" className="text-white mb-2 block">
                            Preferred Date *
                        </Label>
                        <Input
                            id="eventDate"
                            name="eventDate"
                            type="date"
                            required
                            value={formData.eventDate}
                            onChange={handleInputChange}
                            className="bg-white text-gray-800"
                        />
                    </div>
                    
                    <div>
                        <Label htmlFor="groupSize" className="text-white mb-2 block">
                            Group Size *
                        </Label>
                        <Input
                            id="groupSize"
                            name="groupSize"
                            type="number"
                            required
                            min="1"
                            value={formData.groupSize}
                            onChange={handleInputChange}
                            className="bg-white text-gray-800"
                            placeholder="Number of people"
                        />
                    </div>
                    
                    <div>
                        <Label htmlFor="specialRequests" className="text-white mb-2 block">
                            Special requests (optional)
                        </Label>
                        <textarea
                            id="specialRequests"
                            name="specialRequests"
                            rows="3"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 resize-none"
                            placeholder="Any special needs or questions?"
                        />
                    </div>
                </div>
                
                <div className="text-center pt-6">
                    <Button
                        type="submit"
                        variant="picktopia"
                        size="xl"
                        disabled={isSubmitting}
                        className="w-full px-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Submitting...' : 'Get My Custom Quote'}
                    </Button>
                    <p className="font-body text-sm text-gray-300 mt-4">
                        We'll respond within 24 hours with pricing and availability.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default GroupBookingForm;