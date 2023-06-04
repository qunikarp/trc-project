import React from 'react';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

import { SuggestedOptions } from '@/components/SuggestedOptions/SuggestedOptions';
import { ModifierKey, useKey } from '@/hooks/useKey';
import {
  OperatingSystem,
  useOperatingSystem,
} from '@/hooks/useOperatingSystem';
import { PersistenceKey, usePersistedState } from '@/hooks/usePersistedState';
import { Option } from '@/types';
import { DuplicatesFoundAlert } from '@/components/DuplicatesFoundAlert';
import { getDuplicatesIndexes } from '@/lib/core/getDuplicatesIndexes';
import { spacing } from '@/constants';

type Props = {
  onStartClick: (options: Option[]) => void;
};

const MIN_OPTIONS_COUNT = 3;

export const Home = ({ onStartClick }: Props): React.ReactElement => {
  const [text, setText] = usePersistedState(PersistenceKey.HomeText, '');
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const operatingSystem = useOperatingSystem();
  const modifierKey: ModifierKey =
    operatingSystem === OperatingSystem.macOS ? 'metaKey' : 'ctrlKey';

  useKey('Enter', () => handleStartClick(), [modifierKey]);

  const options: Option[] = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const hasNotEnoughOptions = options.length < MIN_OPTIONS_COUNT;

  React.useEffect(() => {
    setIsButtonDisabled(hasNotEnoughOptions);
  }, [text]);

  const handleDuplicateDelete = () => {
    const duplicates = getDuplicatesIndexes(options);
    const indexesToRemove = duplicates.flatMap(([, ...rest]) => rest);
    const newOptions = options.filter(
      (_, idx) => !indexesToRemove.includes(idx),
    );
    setText(newOptions.join('\n'));
  };

  const handleStartClick = () => {
    if (hasNotEnoughOptions) {
      return;
    }
    onStartClick(options);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleClear = () => {
    setText('');
    inputRef.current?.focus();
  };

  const prependOptions = (options: Option[]) => {
    setText((prev) => {
      const optionsString = options.join('\n');
      return [optionsString, prev].join('\n');
    });
  };

  return (
    <Box sx={{ minWidth: 275, py: spacing }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="h2">
            Prepare the list of choices
          </Typography>
          <Box sx={{ m: 1, mt: 2 }}>
            <Typography variant="body1" component="div">
              Please, write options you want to decide on:
            </Typography>
            <Typography variant="caption" component="div">
              Keep each in a separate line.
            </Typography>
          </Box>
          <Box>
            <TextField
              autoFocus
              multiline
              fullWidth
              minRows={5}
              label="Possible options"
              variant="outlined"
              inputRef={inputRef}
              value={text}
              onChange={handleTextChange}
              helperText={`Press '${
                modifierKey === 'metaKey' ? 'Cmd' : 'Ctrl'
              } + Enter' to start!`}
              InputProps={{
                endAdornment: text ? (
                  <IconButton onClick={handleClear}>
                    <ClearIcon />
                  </IconButton>
                ) : null,
              }}
            />
          </Box>
          <Box>
            <SuggestedOptions onPresetPick={prependOptions} />
          </Box>
        </CardContent>
        <DuplicatesFoundAlert
          options={options}
          onDuplicateDelete={handleDuplicateDelete}
        />

        <CardActions>
          <Button
            onClick={handleStartClick}
            disabled={isButtonDisabled}
            sx={{ ml: 'auto' }}
          >
            Start
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
