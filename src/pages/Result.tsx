import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import { SummaryTable } from '@/components/SummaryTable';
import { SummaryRanking } from '@/components/SummaryRanking';
import { useKey } from '@/hooks/useKey';
import { Choice, Option } from '@/types';
import { Criterion } from '@/components/Criterion';
import { spacing } from '@/constants';

type Props = {
  readonly criterion: string | null;
  readonly choices: Choice[];
  readonly options: Option[];
  readonly onChoiceToggle: (choiceId: number) => void;
  readonly onStartOverClick: () => void;
};

export function Result({
  criterion,
  choices,
  options,
  onChoiceToggle,
  onStartOverClick,
}: Props) {
  useKey('R', () => onStartOverClick());

  return (
    <Box sx={{ minWidth: 275, py: spacing }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2">
            Result
          </Typography>
          <Criterion value={criterion} />
          <Box>
            <SummaryTable
              options={options}
              choices={choices}
              onChoiceToggle={onChoiceToggle}
            />
          </Box>
          <Box>
            <SummaryRanking options={options} choices={choices} />
          </Box>
        </CardContent>
        <CardActions>
          <Box>
            <Button onClick={onStartOverClick}>Start over</Button>
            <Typography variant="caption" display="block">
              Press 'R' to start over
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
