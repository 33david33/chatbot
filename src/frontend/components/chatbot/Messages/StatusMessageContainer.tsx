import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

type Props = {
  text: string;
};
const useStyles = makeStyles((theme) => ({
  default: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    alignItems: 'center',
  },
  statusMessage: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  statusTextTypography: {
    fontWeight: 500,
    color: '#aaaaaa',
  },
}));

const StatusMessageContainer = ({ text }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      className={`${classes.default} ${classes.statusMessage}`}
    >
      <Typography variant="body1" className={classes.statusTextTypography}>
        {text}
      </Typography>
    </Box>
  );
};

export default StatusMessageContainer;
