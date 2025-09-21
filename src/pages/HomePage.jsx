import React from 'react';
import HeroSection from '../components/HeroSection';
import WhatIsPicktopia from '../components/WhatIsPicktopia';
import FaqSection from '../components/FaqSection';
import LatestEvents from '../components/LatestEvents';
import Newsletter from '../components/Newsletter';
import { homePageData } from '../data/homePageData';
import { CMS_DATA } from '../data/data';
import { withAssetPaths } from '../utils/dataWithAssets';

const HomePage = ({ navigateTo }) => {
  const content = withAssetPaths(homePageData);
  const { title, subtitle, backgroundVideo, booking, schedule } = content.hero;
  
  return (
    <>
      <HeroSection
        title={title}
        subtitle={subtitle}
        backgroundVideo={backgroundVideo}
        size="large"
        overlayColor="none"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.open('https://app.courtreserve.com/Online/Portal/CreateAccountAndRequestAccessToOrg/16040', '_blank')}
            className="bg-picktopia-orange text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-picktopia-orange transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {booking}
          </button>
          <button
            onClick={() => navigateTo('play-program-schedule')}
            className="bg-picktopia-blue-dark text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-picktopia-blue-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {schedule}
          </button>
        </div>
      </HeroSection>
      <WhatIsPicktopia data={content.whatIsPicktopia} fallbackData={CMS_DATA.whatIsPicktopia} />
      <FaqSection data={content.faq} fallbackData={CMS_DATA.faq} />
      <LatestEvents navigateTo={navigateTo} />
      <Newsletter data={content.newsletter} fallbackData={CMS_DATA.newsletter} />
    </>
  );
};

export default HomePage;