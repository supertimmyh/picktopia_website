import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import GroupBookingsPage from './pages/GroupBookingsPage';
import PartnershipsPage from './pages/PartnershipsPage';
import CMSPage from './pages/CMSPage';
import EventCMSPage from './pages/EventCMSPage';
import EventsPage from './pages/EventsPage';
import LocationsCMSPage from './pages/LocationsCMSPage';
import BookingPage from './pages/play/BookingPage';
import ProgramSchedulePage from './pages/play/ProgramSchedulePage';
import TrainingProgramsPage from './pages/play/TrainingProgramsPage';
import FreePickleballIntroPage from './pages/play/FreePickleballIntroPage';

export default function App() {
    const [page, setPage] = useState('home');

    const navigateTo = (pageName) => {
        setPage(pageName);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        // Handle dynamic routing for events
        if (page.startsWith('events-')) {
            const eventSlug = page.replace('events-', '');
            return <EventCMSPage eventSlug={eventSlug} />;
        }
        
        switch (page) {
            case 'home':
                return <HomePage navigateTo={navigateTo} />;
            case 'about-us':
                return <AboutUsPage />; // Using customized About Us page
            case 'play-booking':
                return <BookingPage />;
            case 'play-program-schedule':
                return <ProgramSchedulePage />;
            case 'play-training-programs':
                return <TrainingProgramsPage />;
            case 'play-free-pickleball-intro':
                return <FreePickleballIntroPage />;
            case 'group-bookings':
                return <GroupBookingsPage />;
            case 'partnerships':
                return <PartnershipsPage />;
            case 'locations':
                return <LocationsCMSPage navigateTo={navigateTo} />;
            case 'events':
                return <EventsPage navigateTo={navigateTo} />;
            
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
            <Footer onNavClick={navigateTo} />
        </div>
    );
}