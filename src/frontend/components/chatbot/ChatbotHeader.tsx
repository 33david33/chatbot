import React from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import CloseButton from '../shared/CloseButton';

type Props = {
  title: string;
  classes: Record<string, string>;
  handleCloseClick: () => void;
};

const styles = () => ({
  default: {
    borderBottom: '1px solid #dddddd',
    height: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
});
const ChatbotHeader = ({
  title,
  classes,
  handleCloseClick,
}: Props): JSX.Element => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={classes.default}
    >
      <Grid>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid>
        <CloseButton handleClick={handleCloseClick} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(React.memo(ChatbotHeader));
