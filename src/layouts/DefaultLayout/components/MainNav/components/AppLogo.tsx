import * as React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AppIcon } from '@/layouts/DefaultLayout/components/MainNav/components/AppIcon/AppIcon';

export function AppLogo(): React.ReactElement {
  return (
    <Button
      component={Link}
      to="/"
      color="inherit"
      disableRipple
      sx={{ ml: '-8px' }}
    >
      <Box sx={{ display: 'block', mr: 1 }}>
        <AppIcon />
      </Box>
      <Typography
        component="h1"
        variant="h6"
        noWrap
        sx={{
          display: 'flex',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        The Right Choice
      </Typography>
    </Button>
  );
}
