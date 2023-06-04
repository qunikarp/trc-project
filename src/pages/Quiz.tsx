import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { QuizRestartDialog } from '@/components/QuizRestartDialog';
import { useGenerateId } from '@/hooks/useGenerateId';
import { useKey } from '@/hooks/useKey';
import { PersistenceKey, usePersistedState } from '@/hooks/usePersistedState';
import { Choice, Option } from '@/types';
import { Criterion } from '@/components/Criterion';
import { spacing } from '@/constants';

type Props = {
  readonly criterion: string | null;
  readonly pairs: [Option, Option][];
  readonly onFinish: (choices: Choice[]) => void;
  readonly onRestartClick: () => void;
};

export function Quiz({
  criterion,
  pairs,
  onFinish,
  onRestartClick,
}: Props): React.ReactElement | null {
  const [choices, setChoices] = usePersistedState<Choice[]>(
    PersistenceKey.QuizChoices,
    [],
    true,
  );
  const [open, setOpen] = React.useState(false);
  const [pairsToChooseFrom, setPairsToChooseFrom] = React.useState(pairs);
  useKey('A', () => handlePairClick('A'));
  useKey('B', () => handlePairClick('B'));
  useKey('R', onRestartClick);

  const generateId = useGenerateId();

  const currentStep = choices.length;
  const hasAllChoices = currentStep === pairs.length;
  const handleBackClick = () => {
    setChoices((prevState) => {
      const newChoices = [...prevState];
      newChoices.pop();
      return newChoices;
    });
  };
  const handleSkipPairClick = () => {
    setPairsToChooseFrom((prevState) => {
      const pairsToChoose = [...prevState];
      const [currentPair] = pairsToChoose.splice(currentStep, 1);
      const changedPairsToChoose = [...pairsToChoose, currentPair];
      return changedPairsToChoose;
    });
  };
  const progress = (currentStep / (pairsToChooseFrom.length - 1)) * 100;

  React.useEffect(() => {
    if (hasAllChoices) {
      onFinish(choices);
    }
  }, [hasAllChoices, onFinish, choices]);
  if (hasAllChoices) {
    return null;
  }

  const [optionA, optionB] = pairsToChooseFrom[currentStep];
  const handlePairClick = (picked: 'A' | 'B'): void => {
    setChoices((prev) => [
      ...prev,
      { id: generateId(), optionA, optionB, picked },
    ]);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ minWidth: 275, py: spacing }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2">
            Quiz
          </Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Criterion value={criterion} />
        </CardContent>
        <CardActions>
          <Box>
            <Button onClick={() => handlePairClick('A')}>{optionA}</Button>
            <Typography variant="caption" display="block">
              Press 'A' to pick this option
            </Typography>
          </Box>
          <Box>
            <Button onClick={() => handlePairClick('B')}>{optionB}</Button>
            <Typography variant="caption" display="block">
              Press 'B' to pick this option
            </Typography>
          </Box>
        </CardActions>
        <CardActions>
          <Box>
            <Button onClick={() => handleBackClick()}>Back</Button>
          </Box>
          <Box>
            <Button onClick={handleSkipPairClick}>Skip</Button>
          </Box>
          <Box>
            <Typography>
              {currentStep + 1} / {pairsToChooseFrom.length}
            </Typography>
            <QuizRestartDialog
              currentStep={currentStep}
              handleClickOpen={handleClickOpen}
              open={open}
              handleClose={handleClose}
              onRestartClick={onRestartClick}
            />
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
}
