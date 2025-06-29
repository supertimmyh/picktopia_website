import React, { useState } from 'react';
import { CMS_DATA } from '../data';
import { SearchIcon, UserIcon, CartIcon, MenuIcon, CloseIcon } from './Icons';
import AnnouncementBar from './AnnouncementBar';
import logoSvg from '../assets/logo_simplified.svg';

const Header = ({ onNavClick, currentPage }) => {
    const { navLinks } = CMS_DATA;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Use consistent styling for all pages
    const navbarBg = 'bg-white/90';
    const textColor = 'text-picktopia-blue-dark';

    const NavMenu = ({ isMobile = false }) => (
      <nav className={`${isMobile ? 'flex flex-col space-y-4 text-2xl items-center text-white' : `hidden md:flex items-center space-x-6 lg:space-x-8 ${textColor}`}`}>
        {navLinks.map(link => (
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
        ))}
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