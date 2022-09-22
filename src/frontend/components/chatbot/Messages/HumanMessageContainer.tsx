import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';
import FormatedTimeMessage from '../../shared/FormatedTimeMessage';

type Props = {
  text: string;
  timestamp: number | undefined;
};
const useStyles = makeStyles((theme) => ({
  default: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    alignItems: 'center',
  },
  humanTextMessage: {
    marginRight: theme.spacing(1),
    marginBottom: '0px',
    padding: theme.spacing(3),
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomLeftRadius: '10px',
    backgroundColor: '#eeeeee',
    marginLeft: theme.spacing(1),
  },
  humanTextTypography: {
    fontSize: '1.2rem',
  },
}));

const HumanMessageContainer = ({ text, timestamp }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box display="flex" className={`${classes.default}`}>
      <Box display="flex" flex={1} />
      <Box
        display="flex"
        className={`${classes.humanTextMessage}`}
        position="relative"
      >
        <Typography variant="body1" className={classes.humanTextTypography}>
          {text}
        </Typography>
        {timestamp && (
          <Box position="absolute" bottom={0} right={10}>
            <FormatedTimeMessage time={timestamp} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HumanMessageContainer;
