import React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import {
  ChatbotMessage,
  ChatbotValueOption,
  ConversationTraceEntry,
} from '../../types/types';

const useStyles = makeStyles((theme) => ({
  default: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(5),
    alignItems: 'center',
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));

type Props = {
  isDone: boolean;
  chatbotMessage: ChatbotMessage;
  handleOnOptionClick: (
    option: ChatbotValueOption,
    conversationTraceEntry: ConversationTraceEntry,
  ) => () => void;
};

const ChatbotUserOptionsContainer = ({
  isDone,
  chatbotMessage,
  handleOnOptionClick,
}: Props): JSX.Element => {
  const classes = useStyles();

  if (isDone) {
    return <></>;
  }
  return (
    <Box className={`${classes.default}`}>
      {/* add other ui components here if we have others than buttons in the future */}
      {chatbotMessage.uiType === 'button' && (
        <>
          {chatbotMessage.valueOptions.map((option, index) => {
            return (
              <Button
                className={`${classes.button}`}
                variant="outlined"
                key={`index_option_${index}_${option.nextId}`}
                onClick={handleOnOptionClick(option, {
                  value: option.value,
                  name: chatbotMessage.name,
                })}
              >
                {option.text}
              </Button>
            );
          })}
        </>
      )}
    </Box>
  );
};

export default ChatbotUserOptionsContainer;
