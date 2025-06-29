import React, { useState } from 'react';

const GetNotified = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', location: '' });
        alert('Thank you for your interest! We\'ll notify you about updates and new locations.');
    };

    return (
        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <h2 className="font-heading text-3xl font-black mb-6 tracking-wider uppercase">Get Notified</h2>
            <p className="font-body text-red-100 mb-8 leading-relaxed font-normal text-base">
                Be the first to know about our grand opening, special events, membership opportunities, and exciting expansion to new locations across the GTA!
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-red-100 mb-2 tracking-wide">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-semibold text-red-100 mb-2 tracking-wide">
                            Preferred Location
                        </label>
                        <select
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        >
                            <option value="" className="text-gray-800">Select your preferred location</option>
                            <option value="toronto-downtown" className="text-gray-800">Toronto - Downtown</option>
                            <option value="toronto-north" className="text-gray-800">Toronto - North York</option>
                            <option value="toronto-east" className="text-gray-800">Toronto - Scarborough</option>
                            <option value="toronto-west" className="text-gray-800">Toronto - Etobicoke</option>
                            <option value="mississauga" className="text-gray-800">Mississauga</option>
                            <option value="markham" className="text-gray-800">Markham</option>
                            <option value="vaughan" className="text-gray-800">Vaughan</option>
                            <option value="brampton" className="text-gray-800">Brampton</option>
                            <option value="richmond-hill" className="text-gray-800">Richmond Hill</option>
                            <option value="other" className="text-gray-800">Other GTA Location</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-red-100 mb-2 tracking-wide">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        placeholder="Enter your email address"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-red-50 transition-colors duration-300 transform hover:scale-105"
                >
                    Notify Me
                </button>
            </form>
        </div>
    );
};

export default GetNotified;