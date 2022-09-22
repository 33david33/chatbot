import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import dateUtils from '../../utils/dateUtils';

type Props = {
  time: number;
};

const useStyles = makeStyles((theme) => ({
  defaut: {
    color: theme.palette.grey[500],
  },
}));

const FormatedTimeMessage = ({ time }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.defaut}>
      {dateUtils.formatHHmm(time)}
    </Typography>
  );
};

export default FormatedTimeMessage;
