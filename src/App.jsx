import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsCMS from './pages/AboutUsCMS';
import PlayCMS from './pages/PlayCMS';
import GroupBookingsCMS from './pages/GroupBookingsCMS';
import CMSPage from './pages/CMSPage';

export default function App() {
    const [page, setPage] = useState('home');

    const navigateTo = (pageName) => {
        setPage(pageName);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage />;
            case 'about-us':
                return <AboutUsCMS />; // Using CMS-powered About Us
            case 'play':
                return <PlayCMS />; // Using custom Play page with booking functionality
            case 'group-bookings':
                return <GroupBookingsCMS />;
            case 'locations':
                return <CMSPage pageSlug="locations" />;
            case 'sponsorships':
                return <CMSPage pageSlug="sponsorships" />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="font-sans bg-gray-100 min-h-screen">
            <Header onNavClick={navigateTo} currentPage={page} />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}