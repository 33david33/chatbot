import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ChatbotHeader from './ChatbotHeader';
import ChatbotContentContainer from './ChatbotContentContainer';
import ChatbotFooter from './ChatbotFooter';
import { lngFileConfig, testIdsConfig } from '../../config';
import useChatbot from './hooks/useChatbot';

const useStyles = makeStyles(() => ({
  header: {
    minHeight: '50px',
  },
  content: {
    minHeight: '50px',
  },
  footer: {
    minHeight: '50px',
  },
}));

const Chatbot = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation(lngFileConfig.CHATBOT);
  const {
    isDone,
    chatMessages,
    chatbotLoadingMessage,
    currentChatbotMessage,
    handleOptionClick,
    handleCloseClick,
    handleSendClick,
    handleRestartClick,
  } = useChatbot();

  return (
    <>
      <Box className={classes.header} data-testid={testIdsConfig.chatbot.id}>
        <ChatbotHeader title={t('title')} handleCloseClick={handleCloseClick} />
      </Box>
      <Box flex={1} overflow="auto" className={classes.content}>
        <ChatbotContentContainer
          isDone={isDone}
          chatMessages={chatMessages}
          chatbotLoadingMessage={chatbotLoadingMessage}
          currentChatbotMessage={currentChatbotMessage}
          handleOptionClick={handleOptionClick}
        />
      </Box>
      <Box className={classes.footer}>
        <ChatbotFooter
          handleSendClick={handleSendClick}
          isDone={isDone}
          handleRestartClick={handleRestartClick}
        />
      </Box>
    </>
  );
};

export default React.memo(Chatbot);
