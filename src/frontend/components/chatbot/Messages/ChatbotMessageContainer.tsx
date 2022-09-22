import React from 'react';
import { Box, Typography, makeStyles, useTheme } from '@material-ui/core';
import FormatedTimeMessage from '../../shared/FormatedTimeMessage';
import Svg from '../../shared/Svg';
import LoadingIndicator from '../../shared/LoadingIndicator';

type Props = {
  renderRobot: boolean;
  renderLoadingIndicator: boolean;
  text: string;
  timestamp: number | undefined;
};
const useStyles = makeStyles((theme) => ({
  default: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    alignItems: 'center',
  },
  aiTextMessage: {
    border: '2px solid #dddddd',
    marginBottom: '0px',
    padding: theme.spacing(3),
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    marginRight: theme.spacing(1),
  },
  aiTextTypography: {
    fontSize: '1.2rem',
  },
  robot: {
    marginBottom: '-100px',
    width: '50px',
  },
}));

const ChatbotMessageContainer = ({
  renderRobot,
  renderLoadingIndicator,
  text,
  timestamp,
}: Props): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box display="flex" className={`${classes.default}`}>
      <Box className={`${classes.robot}`}>
        {renderRobot && (
          <Svg
            svgName="robot"
            width={50}
            height={50}
            fill={theme.palette.primary.main}
          />
        )}
      </Box>
      <Box className={`${classes.aiTextMessage}`} position="relative">
        <Typography
          component="span"
          variant="body1"
          className={classes.aiTextTypography}
        >
          {renderLoadingIndicator && <LoadingIndicator message={text} />}
          {text}
        </Typography>
        {timestamp !== undefined && (
          <Box position="absolute" bottom={0} right={10}>
            <FormatedTimeMessage time={timestamp} />
          </Box>
        )}
      </Box>
      <Box display="flex" flex={1} />
    </Box>
  );
};

export default ChatbotMessageContainer;
