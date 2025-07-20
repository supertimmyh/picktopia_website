import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsCMS from './pages/AboutUsCMS';
import GroupBookingsCMS from './pages/GroupBookingsCMS';
import CMSPage from './pages/CMSPage';
import EventPage from './pages/EventPage';
import LocationPage from './pages/LocationPage';
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
        // Handle dynamic routing for locations and events
        if (page.startsWith('locations-')) {
            const locationSlug = page.replace('locations-', '');
            return <LocationPage locationSlug={locationSlug} />;
        }
        
        if (page.startsWith('events-')) {
            const eventSlug = page.replace('events-', '');
            return <EventPage eventSlug={eventSlug} />;
        }
        
        switch (page) {
            case 'home':
                return <HomePage />;
            case 'about-us':
                return <AboutUsCMS />; // Using CMS-powered About Us
            case 'play-booking':
                return <BookingPage />;
            case 'play-program-schedule':
                return <ProgramSchedulePage />;
            case 'play-training-programs':
                return <TrainingProgramsPage />;
            case 'play-free-pickleball-intro':
                return <FreePickleballIntroPage />;
            case 'group-bookings':
                return <GroupBookingsCMS />;
            case 'locations':
                return <CMSPage pageSlug="locations" />;
            case 'events':
                return <CMSPage pageSlug="events" />;
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