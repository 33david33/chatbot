import React, { useCallback, useState } from 'react';
import { Box, TextField, makeStyles } from '@material-ui/core';
import SvgButton from '../shared/SvgButton';

const useStyles = makeStyles((theme) => ({
  default: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

type Props = {
  isDone: boolean;
  handleSendClick: (message: string) => void;
  handleRestartClick: () => void;
};

const ChatbotFooter = ({
  isDone,
  handleSendClick,
  handleRestartClick,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [textInput, setTextInput] = useState<string>('');

  const handleChangeUserChatMessage = useCallback((event) => {
    setTextInput(event.target.value);
  }, []);

  const handleClick = useCallback(() => {
    handleSendClick(textInput);
    setTextInput('');
  }, [handleSendClick, textInput]);

  return (
    <form noValidate autoComplete="off">
      <Box display="flex" className={classes.default}>
        <Box display="flex" flex={1} marginRight={1}>
          <TextField
            id="standard-basic"
            variant="outlined"
            style={{ width: '100%' }}
            value={textInput}
            onChange={handleChangeUserChatMessage}
            disabled={isDone}
          />
        </Box>
        {!isDone ? (
          <Box>
            <SvgButton
              handleClick={handleClick}
              disabled={isDone || !textInput || textInput === ''}
              svgName="send"
            />
          </Box>
        ) : (
          <Box>
            <SvgButton
              handleClick={handleRestartClick}
              disabled={!isDone}
              svgName="restartAlt"
            />
          </Box>
        )}
      </Box>
    </form>
  );
};

export default React.memo(ChatbotFooter);
