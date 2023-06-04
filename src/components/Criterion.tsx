import React from 'react';
import Typography from '@mui/material/Typography';

type Props = {
  readonly value: string | null;
};

export const Criterion = ({ value }: Props): React.ReactElement => {
  return (
    <Typography sx={{ display: value ? 'block' : 'none' }} variant="caption">
      Criterion: {value}
    </Typography>
  );
};
