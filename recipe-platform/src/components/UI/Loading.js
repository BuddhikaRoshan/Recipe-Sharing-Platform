import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loading = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
    <CircularProgress />
  </Box>
);

export default Loading;