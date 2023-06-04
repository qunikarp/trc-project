import { spacing } from '@/constants';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { SectionMainHeading } from '@/components/Headings/SectionMainHeading';

export function LegacyAboutTeamSection(): React.ReactElement {
  return (
    <Box
      sx={{
        py: spacing,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography component="p" variant="h5" sx={{ fontWeight: 'bold' }}>
          The Right Choice
        </Typography>
        <Typography component="p" variant="h6">
          is a community of people who want to develop their skills in Frontend.
          Our group reflects the best everyday practices at work software
          developer
        </Typography>
      </Box>
      <Box>
        <SectionMainHeading>
          The creators of The Right Choice Project are:
        </SectionMainHeading>
        <ul>
          <li>
            <Typography component="h4" variant="h6" sx={{ fontWeight: 'bold' }}>
              Paweł Schmidt
            </Typography>
            <Typography>
              12+ years in frontend, backend and mobile (Android) areas, working
              in technologies such as React, Vue, Node.js and TypeScript,
              utilising AWS, Vercel, Netlify platforms and using tools like Git,
              Docker or WebStorm. On a daily basis communicating in English and
              using SCRUM, Kanban or Waterfall methodologies.
            </Typography>
          </li>
          <li>
            <Typography component="h4" variant="h6" sx={{ fontWeight: 'bold' }}>
              Michał Jędro
            </Typography>
            <Typography>
              A person interested in front-end programming. One of the creators
              of The Right Choice project. Student of computer science at the
              university in Warsaw. In his career, he was associated with the IT
              department in one of the Warsaw corporations.
            </Typography>
          </li>
          <li>
            <Typography component="h4" variant="h6" sx={{ fontWeight: 'bold' }}>
              Jakub Karp
            </Typography>
            <Typography>
              On a daily basis, a student of cognitive science practicing
              fingers and mind as programmer, developing The Right Choice
              project. Follower organization and simplifying the organizational
              processes that are possible thanks to extensive knowledge of new
              technologies. UX lover who boldly introduces his comments
              regarding application usability. As a person with a very receptive
              mind has the ability to implement solutions very quickly project
              of recently discovered technologies.
            </Typography>
          </li>
        </ul>
      </Box>
    </Box>
  );
}
