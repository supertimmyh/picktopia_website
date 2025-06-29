import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsCMS from './pages/AboutUsCMS';
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
                return <CMSPage pageSlug="play" />;
            case 'group-bookings':
                return <CMSPage pageSlug="group-bookings" />;
            case 'locations':
                return <CMSPage pageSlug="locations" />;
            case 'sponsorships':
                return <CMSPage pageSlug="sponsorships" />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="font-sans">
            <Header onNavClick={navigateTo} currentPage={page} />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}