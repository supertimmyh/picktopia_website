import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData);
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
    };

    return (
        <div className="bg-picktopia-blue-dark text-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center">
                Event Inquiry Form
            </h2>
            <p className="font-body text-lg text-center mb-8 max-w-3xl mx-auto">
                Fill out the form below and our events team will create a custom package for your group.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
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
                        className="w-full px-12"
                    >
                        Get My Custom Quote
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