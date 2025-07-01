import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const GroupBookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        eventType: '',
        eventDate: '',
        groupSize: '',
        preferredTime: '',
        additionalServices: [],
        specialRequests: '',
        budget: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleServiceChange = (service) => {
        setFormData(prev => ({
            ...prev,
            additionalServices: prev.additionalServices.includes(service)
                ? prev.additionalServices.filter(s => s !== service)
                : [...prev.additionalServices, service]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement form submission logic
        console.log('Form submitted:', formData);
        alert('Thank you for your inquiry! We will get back to you within 48 hours.');
    };

    const additionalServices = [
        'Professional Coaching',
        'Equipment Rental',
        'Catering Coordination',
        'Full Facility Buyout',
        'Photography Services',
        'Custom Decorations Setup'
    ];

    return (
        <div className="bg-picktopia-blue-dark text-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center">
                Group Booking Inquiry Form
            </h2>
            <p className="font-body text-lg text-center mb-8 max-w-3xl mx-auto">
                Fill out the form below and our events team will create a custom package for your group.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h3 className="font-heading text-xl font-bold text-picktopia-orange mb-4">
                            Contact Information
                        </h3>
                        
                        <div>
                            <Label htmlFor="name" className="text-white mb-2 block">
                                Full Name *
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
                                Email Address *
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
                                Phone Number *
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
                            <Label htmlFor="company" className="text-white mb-2 block">
                                Company/Organization
                            </Label>
                            <Input
                                id="company"
                                name="company"
                                type="text"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="bg-white text-gray-800"
                                placeholder="Optional"
                            />
                        </div>
                    </div>
                    
                    {/* Event Details */}
                    <div className="space-y-4">
                        <h3 className="font-heading text-xl font-bold text-picktopia-orange mb-4">
                            Event Details
                        </h3>
                        
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
                                <option value="bachelor">Bachelor/Bachelorette Party</option>
                                <option value="anniversary">Anniversary</option>
                                <option value="team-building">Team Building</option>
                                <option value="social">Social Gathering</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="eventDate" className="text-white mb-2 block">
                                Preferred Event Date *
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
                                placeholder="Number of guests"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="preferredTime" className="text-white mb-2 block">
                                Preferred Time
                            </Label>
                            <Input
                                id="preferredTime"
                                name="preferredTime"
                                type="text"
                                value={formData.preferredTime}
                                onChange={handleInputChange}
                                className="bg-white text-gray-800"
                                placeholder="e.g., 2:00 PM - 5:00 PM"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Additional Services */}
                <div>
                    <h3 className="font-heading text-xl font-bold text-picktopia-orange mb-4">
                        Additional Services
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {additionalServices.map((service, index) => (
                            <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.additionalServices.includes(service)}
                                    onChange={() => handleServiceChange(service)}
                                    className="w-4 h-4 text-picktopia-orange"
                                />
                                <span className="font-body text-white">{service}</span>
                            </label>
                        ))}
                    </div>
                </div>
                
                {/* Budget and Special Requests */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="budget" className="text-white mb-2 block">
                            Estimated Budget
                        </Label>
                        <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300"
                        >
                            <option value="">Select budget range</option>
                            <option value="under-500">Under $500</option>
                            <option value="500-1000">$500 - $1,000</option>
                            <option value="1000-2000">$1,000 - $2,000</option>
                            <option value="2000-5000">$2,000 - $5,000</option>
                            <option value="over-5000">Over $5,000</option>
                        </select>
                    </div>
                    
                    <div>
                        <Label htmlFor="specialRequests" className="text-white mb-2 block">
                            Special Requests or Notes
                        </Label>
                        <textarea
                            id="specialRequests"
                            name="specialRequests"
                            rows="4"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 resize-none"
                            placeholder="Any special requirements, dietary restrictions, accessibility needs, etc."
                        />
                    </div>
                </div>
                
                {/* Submit Button */}
                <div className="text-center pt-6">
                    <Button
                        type="submit"
                        variant="picktopia"
                        size="xl"
                        className="w-full md:w-auto px-12"
                    >
                        Submit Inquiry
                    </Button>
                    <p className="font-body text-sm text-gray-300 mt-4">
                        * Required fields. We'll respond within 48 hours.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default GroupBookingForm;