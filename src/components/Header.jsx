import React, { useState, useEffect } from 'react';
import { CMS_DATA } from '../data';
import { SearchIcon, UserIcon, CartIcon, MenuIcon, CloseIcon } from './Icons';
import AnnouncementBar from './AnnouncementBar';
import { loadLocationsForNav, loadEventsForNav } from '../utils/contentLoader';
import logoSvg from '../assets/logo_simplified.svg';

const Header = ({ onNavClick, currentPage }) => {
    const { navLinks } = CMS_DATA;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [dynamicNavData, setDynamicNavData] = useState({});
    
    // Load dynamic navigation data
    useEffect(() => {
        const loadDynamicNav = async () => {
            const locations = await loadLocationsForNav();
            const events = await loadEventsForNav();
            setDynamicNavData({ locations, events });
        };
        loadDynamicNav();
    }, []);
    
    // Use consistent styling for all pages
    const navbarBg = 'bg-white/90';
    const textColor = 'text-picktopia-blue-dark';

    const NavMenu = ({ isMobile = false }) => (
      <nav className={`${isMobile ? 'flex flex-col space-y-4 text-2xl items-center text-white' : `hidden md:flex items-center space-x-6 lg:space-x-8 ${textColor}`}`}>
        {navLinks.map((link, index) => {
          // Handle dynamic navigation items
          if (typeof link === 'object' && link.type === 'dynamic') {
            const dynamicData = dynamicNavData[link.source] || [];
            
            if (dynamicData.length === 0) {
              // Show loading state or simple link
              return (
                <a 
                  key={link.title} 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onNavClick(link.title.toLowerCase());
                    if (isMobile) setIsMobileMenuOpen(false);
                  }} 
                  className="hover:text-picktopia-orange transition-colors duration-300"
                >
                  {link.title}
                </a>
              );
            }
            
            // Show dropdown with dynamic content
            return (
              <div 
                key={link.title} 
                className="relative"
                onMouseEnter={() => !isMobile && setOpenDropdown(index)}
                onMouseLeave={() => !isMobile && setOpenDropdown(null)}
              >
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (isMobile) {
                      setOpenDropdown(openDropdown === index ? null : index);
                    } else {
                      // Navigate to main page
                      onNavClick(link.title.toLowerCase());
                    }
                  }}
                  className="hover:text-picktopia-orange transition-colors duration-300 flex items-center"
                >
                  {link.title}
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {(openDropdown === index) && (
                  <div 
                    className={`${isMobile ? 'mt-2 space-y-2' : 'absolute top-full left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 z-50'}`}
                    onMouseEnter={() => !isMobile && setOpenDropdown(index)}
                    onMouseLeave={() => !isMobile && setOpenDropdown(null)}
                  >
                    {dynamicData.map(item => (
                      <a
                        key={item.slug}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const pageName = `${link.source}-${item.slug}`;
                          onNavClick(pageName);
                          setOpenDropdown(null);
                          if (isMobile) setIsMobileMenuOpen(false);
                        }}
                        className={`${isMobile ? 'text-white hover:text-picktopia-orange text-lg' : 'block px-4 py-2 text-sm text-picktopia-blue-dark hover:bg-gray-100 hover:text-picktopia-orange'} transition-colors duration-300`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          // Handle static dropdown navigation (like Play)
          else if (typeof link === 'object' && link.subLinks) {
            return (
              <div 
                key={link.title} 
                className="relative"
                onMouseEnter={() => !isMobile && setOpenDropdown(index)}
                onMouseLeave={() => !isMobile && setOpenDropdown(null)}
              >
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    if (isMobile) {
                      setOpenDropdown(openDropdown === index ? null : index);
                    }
                  }}
                  className="hover:text-picktopia-orange transition-colors duration-300 flex items-center"
                >
                  {link.title}
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {(openDropdown === index) && (
                  <div 
                    className={`${isMobile ? 'mt-2 space-y-2' : 'absolute top-full left-0 mt-0 w-48 bg-white rounded-md shadow-lg py-2 z-50'}`}
                    onMouseEnter={() => !isMobile && setOpenDropdown(index)}
                    onMouseLeave={() => !isMobile && setOpenDropdown(null)}
                  >
                    {link.subLinks.map(subLink => (
                      <a
                        key={subLink}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          const pageName = `play-${subLink.replace(/\s+/g, '-').toLowerCase()}`;
                          onNavClick(pageName);
                          setOpenDropdown(null);
                          if (isMobile) setIsMobileMenuOpen(false);
                        }}
                        className={`${isMobile ? 'text-white hover:text-picktopia-orange text-lg' : 'block px-4 py-2 text-sm text-picktopia-blue-dark hover:bg-gray-100 hover:text-picktopia-orange'} transition-colors duration-300`}
                      >
                        {subLink}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          } 
          // Handle simple string navigation links
          else {
            return (
              <a 
                key={link} 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(link.replace(/\s+/g, '-').toLowerCase());
                  if (isMobile) setIsMobileMenuOpen(false);
                }} 
                className="hover:text-picktopia-orange transition-colors duration-300"
              >
                {link}
              </a>
            );
          }
        })}
      </nav>
    );

    return (
        <>
            <AnnouncementBar />
            <header className="sticky top-0 z-50 px-4 pt-2">
                <div className={`${navbarBg} backdrop-blur-md shadow-lg rounded-2xl mx-auto max-w-7xl px-6 py-4 flex justify-between items-center ${textColor}`}>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavClick('home'); }} className="flex items-center space-x-1">
                    <img src={logoSvg} alt="Picktopia Logo" className="h-12 w-12 lg:h-16 lg:w-16" />
                    <div className={`flex flex-col text-sm lg:text-base font-brand font-black ${textColor} leading-tight tracking-wider`}>
                        <span>PICKLEBALL</span>
                        <span>CLUB</span>
                    </div>
                </a>

                <NavMenu />

                <div className={`flex items-center space-x-4 ${textColor}`}>
                    <button className="hover:text-picktopia-orange"><UserIcon /></button>
                    <button className="md:hidden hover:text-picktopia-orange" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <CloseIcon/> : <MenuIcon />}
                    </button>
                </div>
            </div>
            
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full h-screen bg-picktopia-blue-dark bg-opacity-95 flex flex-col items-center justify-center">
                    <NavMenu isMobile={true}/>
                </div>
            )}
            </header>
        </>
    );
};

export default Header;