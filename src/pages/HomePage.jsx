import React from 'react';
import HeroSection from '../components/HeroSection';
import WhatIsPicktopia from '../components/WhatIsPicktopia';
import FaqSection from '../components/FaqSection';
import LatestBlogPosts from '../components/LatestBlogPosts';
import Newsletter from '../components/Newsletter';
import { CMS_DATA } from '../data';
import heroImage from '../assets/hero-image.jpeg';

const HomePage = () => {
  const { title, subtitle, cta } = CMS_DATA.hero;
  
  return (
    <>
      <HeroSection
        title={title}
        subtitle={subtitle}
        backgroundImage={heroImage}
        size="large"
        overlayColor="blue"
      >
        <button className="bg-picktopia-orange text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:text-picktopia-orange transition-all duration-300 transform hover:scale-105 shadow-lg">
          {cta}
        </button>
      </HeroSection>
      <WhatIsPicktopia />
      <FaqSection />
      <LatestBlogPosts />
      <Newsletter />
    </>
  );
};

export default HomePage;