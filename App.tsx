/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import InkBackground from './components/InkBackground';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import SectionHero from './components/SectionHero';
import SectionGallery from './components/SectionGallery';
import SectionStories from './components/SectionStories';
import SectionAbout from './components/SectionAbout';

const App: React.FC = () => {
  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <InkBackground />
      <Navigation onNavigate={handleNavigate} />
      
      <main>
        <SectionHero onNavigate={handleNavigate} />
        <SectionGallery />
        <SectionStories />
        <SectionAbout />
      </main>
    </div>
  );
};

export default App;
