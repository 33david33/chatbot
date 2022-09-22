import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

type Props = {
  message?: string;
};
const LoadingIndicator = ({ message }: Props): JSX.Element => {
  return (
    <Box display="flex" flex={1} alignItems="center" justifyContent="center">
      <CircularProgress />
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

LoadingIndicator.defaultProps = {
  message: undefined,
};
export default LoadingIndicator;
