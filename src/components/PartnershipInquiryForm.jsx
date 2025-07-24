import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const PartnershipInquiryForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        company: '',
        title: '',
        email: '',
        phone: '',
        partnershipLevel: '',
        businessGoals: [],
        industry: '',
        timeline: '',
        additionalInfo: '',
        consentToContact: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleGoalsChange = (goal) => {
        setFormData(prev => ({
            ...prev,
            businessGoals: prev.businessGoals.includes(goal)
                ? prev.businessGoals.filter(g => g !== goal)
                : [...prev.businessGoals, goal]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Partnership inquiry submitted:', formData);
        alert('Thank you for your interest in partnering with us! We will contact you within 24 hours to discuss opportunities.');
    };

    const businessGoalOptions = [
        'Brand Awareness',
        'Community Engagement', 
        'Customer Acquisition',
        'Employee Benefits/Team Building',
        'Supporting Local Community',
        'Other'
    ];

    return (
        <div className="bg-picktopia-blue-dark text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4 tracking-wider uppercase text-center">
                Start Your Partnership Journey
            </h2>
            <p className="font-body text-lg text-center mb-8 max-w-3xl mx-auto">
                Complete the form below and we'll schedule a conversation to explore how we can work together.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
                {/* Contact Information */}
                <div>
                    <h3 className="font-heading text-xl font-bold text-picktopia-orange mb-6">
                        Contact Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="firstName" className="text-white mb-2 block">
                                First Name *
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="bg-white text-gray-800"
                                placeholder="Your first name"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="lastName" className="text-white mb-2 block">
                                Last Name *
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="bg-white text-gray-800"
                                placeholder="Your last name"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="company" className="text-white mb-2 block">
                                Company/Organization *
                            </Label>
                            <Input
                                id="company"
                                name="company"
                                type="text"
                                required
                                value={formData.company}
                                onChange={handleInputChange}
                                className="bg-white text-gray-800"
                                placeholder="Your company name"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="title" className="text-white mb-2 block">
                                Title/Position *
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                                className="bg-white text-gray-800"
                                placeholder="Your job title"
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
                                placeholder="your.email@company.com"
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
                    </div>
                </div>

                {/* Partnership Details */}
                <div>
                    <h3 className="font-heading text-xl font-bold text-picktopia-orange mb-6">
                        Partnership Details
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="partnershipLevel" className="text-white mb-2 block">
                                Partnership Level Interest *
                            </Label>
                            <select
                                id="partnershipLevel"
                                name="partnershipLevel"
                                required
                                value={formData.partnershipLevel}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300"
                            >
                                <option value="">Select partnership level</option>
                                <option value="champion">Champion Level</option>
                                <option value="supporter">Supporter Level</option>
                                <option value="friend">Friend Level</option>
                                <option value="custom">Custom Partnership</option>
                                <option value="exploring">Just Exploring Options</option>
                            </select>
                        </div>
                        
                        <div>
                            <Label htmlFor="industry" className="text-white mb-2 block">
                                Industry/Business Type *
                            </Label>
                            <select
                                id="industry"
                                name="industry"
                                required
                                value={formData.industry}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300"
                            >
                                <option value="">Select your industry</option>
                                <option value="healthcare">Healthcare/Wellness</option>
                                <option value="financial">Financial Services</option>
                                <option value="technology">Technology</option>
                                <option value="retail">Retail/Consumer Goods</option>
                                <option value="professional">Professional Services</option>
                                <option value="food">Food & Beverage</option>
                                <option value="realestate">Real Estate</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div className="md:col-span-2">
                            <Label className="text-white mb-4 block">
                                Primary Business Goals (select all that apply)
                            </Label>
                            <div className="grid md:grid-cols-2 gap-3">
                                {businessGoalOptions.map((goal, index) => (
                                    <label key={index} className="flex items-center space-x-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.businessGoals.includes(goal)}
                                            onChange={() => handleGoalsChange(goal)}
                                            className="w-4 h-4 text-picktopia-orange"
                                        />
                                        <span className="font-body text-white text-sm">{goal}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <Label htmlFor="timeline" className="text-white mb-2 block">
                                Timeline for Partnership
                            </Label>
                            <select
                                id="timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleInputChange}
                                className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300"
                            >
                                <option value="">Select timeline</option>
                                <option value="immediate">Immediate (within 30 days)</option>
                                <option value="quarter">Next Quarter</option>
                                <option value="6months">Next 6 Months</option>
                                <option value="future">Exploring for Future</option>
                                <option value="unsure">Not Sure</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div>
                    <Label htmlFor="additionalInfo" className="text-white mb-2 block">
                        Additional Information/Questions
                    </Label>
                    <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        rows="4"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded-md bg-white text-gray-800 border border-gray-300 resize-none"
                        placeholder="Tell us more about your partnership goals, questions, or specific ideas you have in mind..."
                    />
                </div>

                {/* Consent */}
                <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            name="consentToContact"
                            checked={formData.consentToContact}
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-picktopia-orange mt-1 flex-shrink-0"
                        />
                        <span className="font-body text-white text-sm">
                            I agree to be contacted about partnership opportunities via phone, email, or text *
                        </span>
                    </label>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                    <Button
                        type="submit"
                        variant="picktopia"
                        size="xl"
                        className="w-full md:w-auto px-12"
                    >
                        Request Partnership Information
                    </Button>
                    <p className="font-body text-sm text-gray-300 mt-4">
                        * Required fields. We'll respond within 24 hours.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default PartnershipInquiryForm;