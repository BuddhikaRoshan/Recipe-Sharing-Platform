import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Button, 
  Box, 
  Paper,
  CircularProgress,
  IconButton,
  Fade,
  useTheme
} from '@mui/material';
import { 
  PlayArrow,
  Pause, 
  RestartAlt,
  Restaurant
} from '@mui/icons-material';

const CookingTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    let intervalId;
    
    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }
    
    return () => clearInterval(intervalId); // Cleanup on unmount or dependency change
  }, [isActive]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  const formatTime = (time) => String(time).padStart(2, '0');
  
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  // Calculate progress for the circular progress
  const progress = (seconds % 60) / 60 * 100;

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: '16px',
        backgroundColor: theme.palette.background.paper,
        maxWidth: '350px',
        mx: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Restaurant sx={{ mr: 1, color: theme.palette.primary.main }} />
        <Typography variant="h5" color="primary" fontWeight="medium">
          Cooking Timer
        </Typography>
      </Box>

      <Box sx={{ position: 'relative', display: 'inline-flex', my: 2 }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={160}
          thickness={3}
          sx={{ color: isActive ? theme.palette.primary.main : theme.palette.grey[400] }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Fade in={true}>
            <Typography variant="h3" component="div" color="text.primary" fontWeight="bold">
              {formatTime(minutes)}:{formatTime(remainingSeconds)}
            </Typography>
          </Fade>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
        <Button
          variant="contained"
          color={isActive ? "secondary" : "primary"}
          onClick={toggleTimer}
          startIcon={isActive ? <Pause /> : <PlayArrow />}
          size="large"
          sx={{ 
            borderRadius: '28px',
            px: 3,
            py: 1,
            boxShadow: 2,
          }}
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>
        
        <IconButton 
          onClick={resetTimer} 
          color="error" 
          sx={{ 
            bgcolor: theme.palette.error.light,
            '&:hover': {
              bgcolor: theme.palette.error.main,
            }
          }}
        >
          <RestartAlt />
        </IconButton>
      </Box>

      {seconds > 0 && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mt: 2, fontStyle: 'italic' }}
        >
          Timer running for {minutes > 0 ? `${minutes} min${minutes !== 1 ? 's' : ''}` : ''} 
          {minutes > 0 && remainingSeconds > 0 ? ' and ' : ''}
          {remainingSeconds > 0 ? `${remainingSeconds} sec${remainingSeconds !== 1 ? 's' : ''}` : ''}
        </Typography>
      )}
    </Paper>
  );
};

export default CookingTimer;