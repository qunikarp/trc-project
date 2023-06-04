import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useKey } from '@/hooks/useKey';

type Props = {
  currentStep: number;
  handleClickOpen: () => void;
  open: boolean;
  handleClose: () => void;
  onRestartClick: () => void;
};

export function QuizRestartDialog({
  currentStep,
  handleClickOpen,
  open,
  handleClose,
  onRestartClick,
}: Props) {
  const handleDialogOpen = () => {
    const hasMadeChoices = currentStep > 0;
    if (hasMadeChoices) {
      handleClickOpen();
    } else {
      onRestartClick();
    }
  };

  useKey('R', handleDialogOpen);

  return (
    <Box>
      <Button onClick={handleDialogOpen}>Restart</Button>
      <Typography variant="caption" display="inline-block">
        Press 'R' to restart
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want to reset your choices?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will reset your choices and you will have to start over.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={onRestartClick} autoFocus>
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
