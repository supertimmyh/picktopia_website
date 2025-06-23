import React from 'react';
import { CMS_DATA } from '../data';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TiktokIcon } from './Icons';

const Footer = () => {
    const { description, quickLinks, contact } = CMS_DATA.footer;
    return (
        <footer className="bg-picktopia-orange text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold tracking-wider mb-4">PICKTOPIA</h3>
                        <p className="max-w-sm">{description}</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {quickLinks.map(link => (
                                <li key={link}><a href="#" className="hover:underline">{link}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <p>{contact.address}</p>
                        <p className="mt-2"><a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a></p>
                        <p><a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a></p>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t-2 border-picktopia-blue-dark/50 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Picktopia Pickleball Club. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        <a href="#" className="hover:opacity-75"><FacebookIcon /></a>
                        <a href="#" className="hover:opacity-75"><InstagramIcon /></a>
                        <a href="#" className="hover:opacity-75"><YoutubeIcon /></a>
                        <a href="#" className="hover:opacity-75"><TiktokIcon /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;