import React from 'react';

import { AboutHeroSection } from '@/components/AboutHeroSection/AboutHeroSection';
import { AboutOurProjectsSection } from '@/components/AboutOurProjectsSection/AboutOurProjectsSection';
import { LegacyAboutTeamSection } from '@/components/AboutHeroSection/LegacyAboutTeamSection';
import { AboutTeamSection } from '@/components/AboutTeamSection/AboutTeamSection';

export function About(): React.ReactElement {
  return (
    <>
      <AboutHeroSection />
      <AboutTeamSection />
      <LegacyAboutTeamSection />
      <AboutOurProjectsSection />
    </>
  );
}
