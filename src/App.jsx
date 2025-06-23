import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GenericPage from './pages/GenericPage';

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
                return <GenericPage title="About Us" />;
            case 'play':
                return <GenericPage title="Play" />;
            case 'group-bookings':
                return <GenericPage title="Group Bookings" />;
            case 'locations':
                return <GenericPage title="Locations" />;
            case 'sponsorships':
                return <GenericPage title="Sponsorships" />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="font-sans">
            <Header onNavClick={navigateTo} />
            <main>
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}