import React from 'react';
import Box from '@mui/material/Box';
import { AboutTeamCard } from './AboutTeamCard';
import { SectionMainHeading } from '@/components/Headings/SectionMainHeading';

export function AboutTeamSection() {
  return (
    <Box>
      <SectionMainHeading textAlign="center">
        Meet the directors
      </SectionMainHeading>
      <AboutTeamCard />
    </Box>
  );
}
