import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/about/AboutUsPage';
import GroupBookingsPage from './pages/GroupBookingsPage';
import PartnershipsPage from './pages/about/PartnershipsPage';
import CMSPage from './pages/CMSPage';
import EventCMSPage from './pages/EventCMSPage';
import EventsPage from './pages/EventsPage';
import LocationsCMSPage from './pages/LocationsCMSPage';
import MembershipPage from './pages/MembershipPage';
import BookingPage from './pages/play/BookingPage';
import ProgramSchedulePage from './pages/play/ProgramSchedulePage';
import TrainingProgramsPage from './pages/academy/TrainingProgramsPage';
import FreePickleballIntroPage from './pages/academy/FreePickleballIntroPage';
import PromotionModal from './components/PromotionModal';
import { loadContent } from './utils/contentLoader';
import { getAssetPath } from './utils/assetPath';

export default function App() {
    const [page, setPage] = useState('home');
    const [promotion, setPromotion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      const showPromotion = async () => {
        // Show only once per session
        if (sessionStorage.getItem('promotionShown')) {
          return;
        }

        try {
          const manifestResponse = await fetch(getAssetPath('/content/promotions/manifest.json'));
          if (!manifestResponse.ok) return;

          const slugs = await manifestResponse.json();
          if (slugs.length === 0) return;

          // Load the first promotion from the manifest
          const promoContent = await loadContent(`/content/promotions/${slugs[0]}.md`);

          if (promoContent && promoContent.frontmatter.enabled) {
            setPromotion({
              ...promoContent.frontmatter,
              body: promoContent.content
            });
            setIsModalOpen(true);
            sessionStorage.setItem('promotionShown', 'true');
          }
        } catch (error) {
          console.error('Failed to load promotion:', error);
        }
      };

      showPromotion();
    }, []);

    const handleCloseModal = () => setIsModalOpen(false);

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
            case 'join':
                return <MembershipPage />;
            case 'academy-training-programs':
                return <TrainingProgramsPage />;
            case 'academy-free-pickleball-intro':
                return <FreePickleballIntroPage />;
            case 'play-booking':
                return <BookingPage />;
            case 'play-program-schedule':
                return <ProgramSchedulePage />;
            case 'play-group-bookings':
                return <GroupBookingsPage />;
            case 'events':
                return <EventsPage navigateTo={navigateTo} />;
            case 'clubs':
                return <LocationsCMSPage navigateTo={navigateTo} />;
            case 'about-about-us':
                return <AboutUsPage />; // Using customized About Us page
            case 'about-partnerships':
                return <PartnershipsPage />;
            // Legacy routes for backwards compatibility
            case 'about-us':
                return <AboutUsPage />;
            case 'group-bookings':
                return <GroupBookingsPage />;
            case 'partnerships':
                return <PartnershipsPage />;
            case 'membership':
                return <MembershipPage />;
            case 'locations':
                return <LocationsCMSPage navigateTo={navigateTo} />;
            case 'play-training-programs':
                return <TrainingProgramsPage />;
            case 'play-free-pickleball-intro':
                return <FreePickleballIntroPage />;
            
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="font-sans bg-gray-100 min-h-screen">
            {isModalOpen && <PromotionModal content={promotion} onClose={handleCloseModal} />}
            <Header onNavClick={navigateTo} currentPage={page} />
            <main>
                {renderPage()}
            </main>
            <Footer onNavClick={navigateTo} />
        </div>
    );
}