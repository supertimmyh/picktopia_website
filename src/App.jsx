import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/about/AboutUsPage';
import PartnershipsPage from './pages/about/PartnershipsPage';
import CMSPage from './pages/CMSPage';
import EventCMSPage from './pages/EventCMSPage';
import EventsPage from './pages/EventsPage';
import LocationsCMSPage from './pages/LocationsCMSPage';
import MembershipPage from './pages/MembershipPage';
import FeaturedProgramsPage from './pages/FeaturedProgramsPage';
import PlayPage from './pages/PlayPage';
import BookingPage from './pages/play/BookingPage';
import ProgramSchedulePage from './pages/play/ProgramSchedulePage';
import TrainingProgramsPage from './pages/academy/TrainingProgramsPage';
import LocationDetailPage from './pages/LocationDetailPage';
import PromotionModal from './components/PromotionModal';
import { loadContent } from './utils/contentLoader';
import { getAssetPath } from './utils/assetPath';
import { getLocationFromPage, getPageFromUrl, parseLocationPage, updateUrl } from './utils/navigation';

export default function App() {
    // Initialize page from URL slug
    const [page, setPage] = useState(() => getPageFromUrl(window.location.pathname));
    const [promotion, setPromotion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Handle browser back/forward buttons
        const handlePopState = (event) => {
            const pageFromUrl = getPageFromUrl(window.location.pathname);
            setPage(pageFromUrl);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

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
        updateUrl(pageName);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        // Handle dynamic routing for events
        if (page.startsWith('events-')) {
            const eventSlug = page.replace('events-', '');
            return <EventCMSPage eventSlug={eventSlug} />;
        }

        const locationRoute = parseLocationPage(page);
        if (locationRoute) {
            switch (locationRoute.section) {
                case 'booking':
                    return <BookingPage locationId={locationRoute.locationId} navigateTo={navigateTo} />;
                case 'schedule':
                    return <ProgramSchedulePage locationId={locationRoute.locationId} navigateTo={navigateTo} />;
                case 'training':
                    return <TrainingProgramsPage locationId={locationRoute.locationId} navigateTo={navigateTo} />;
                case 'membership':
                    return <MembershipPage locationId={locationRoute.locationId} navigateTo={navigateTo} />;
                default:
                    return <LocationDetailPage locationId={locationRoute.locationId} navigateTo={navigateTo} />;
            }
        }
        
        switch (page) {
            case 'home':
                return <HomePage navigateTo={navigateTo} />;
            case 'featured-programs':
            case 'programs':
                return <FeaturedProgramsPage navigateTo={navigateTo} />;
            case 'play':
                return <PlayPage navigateTo={navigateTo} />;
            case 'join':
                return <LocationsCMSPage navigateTo={navigateTo} />;
            case 'academy-training-programs':
                return <FeaturedProgramsPage navigateTo={navigateTo} />;
            case 'academy-free-pickleball-intro':
                return <FeaturedProgramsPage navigateTo={navigateTo} />;
            case 'play-booking':
                return <PlayPage navigateTo={navigateTo} />;
            case 'play-program-schedule':
                return <LocationsCMSPage navigateTo={navigateTo} />;
            case 'play-group-bookings':
                return <PlayPage navigateTo={navigateTo} />;
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
                return <PlayPage navigateTo={navigateTo} />;
            case 'partnerships':
                return <PartnershipsPage />;
            case 'membership':
                return <LocationsCMSPage navigateTo={navigateTo} />;
            case 'locations':
                return <LocationsCMSPage navigateTo={navigateTo} />;
            case 'play-training-programs':
                return <FeaturedProgramsPage navigateTo={navigateTo} />;
            case 'play-free-pickleball-intro':
                return <FeaturedProgramsPage navigateTo={navigateTo} />;
            
            default:
                return <HomePage />;
        }
    };

    return (
        <div className="font-sans bg-gray-100 min-h-screen">
            {isModalOpen && <PromotionModal content={promotion} onClose={handleCloseModal} />}
            <Header onNavClick={navigateTo} currentPage={page} currentLocation={getLocationFromPage(page)} />
            <main>
                {renderPage()}
            </main>
            <Footer onNavClick={navigateTo} />
        </div>
    );
}
