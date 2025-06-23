import React from 'react';
import HeroSection from '../components/HeroSection';
import WhatIsPicktopia from '../components/WhatIsPicktopia';
import FaqSection from '../components/FaqSection';
import LatestBlogPosts from '../components/LatestBlogPosts';
import Newsletter from '../components/Newsletter';

const HomePage = () => (
  <>
    <HeroSection />
    <WhatIsPicktopia />
    <FaqSection />
    <LatestBlogPosts />
    <Newsletter />
  </>
);

export default HomePage;