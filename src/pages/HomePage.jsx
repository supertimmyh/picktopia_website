import React from 'react';
import HeroSection from '../components/HeroSection';
import WhatIsPicktopia from '../components/WhatIsPicktopia';
import FaqSection from '../components/FaqSection';
import LatestEvents from '../components/LatestEvents';
import Newsletter from '../components/Newsletter';
import { homePageData } from '../data/homePageData';
import { CMS_DATA } from '../data/data';
import heroVideo from '../assets/hero-video.MP4';

const HomePage = ({ navigateTo }) => {
  const { title, subtitle, booking, schedule } = homePageData.hero;
  
  return (
    <>
      <HeroSection
        title={title}
        subtitle={subtitle}
        backgroundVideo={heroVideo}
        size="large"
        overlayColor="none"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-picktopia-orange text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-picktopia-orange transition-all duration-300 transform hover:scale-105 shadow-lg">
            {booking}
          </button>
          <button className="bg-picktopia-blue-dark text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-picktopia-blue-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
            {schedule}
          </button>
        </div>
      </HeroSection>
      <WhatIsPicktopia data={homePageData.whatIsPicktopia} fallbackData={CMS_DATA.whatIsPicktopia} />
      <FaqSection data={homePageData.faq} fallbackData={CMS_DATA.faq} />
      <LatestEvents navigateTo={navigateTo} />
      <Newsletter data={homePageData.newsletter} fallbackData={CMS_DATA.newsletter} />
    </>
  );
};

export default HomePage;