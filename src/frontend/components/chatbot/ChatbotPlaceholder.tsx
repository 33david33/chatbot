import React from 'react';
import { Box, Fab, Typography, Zoom } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootStore } from '../../redux';
import Svg from '../shared/Svg';
import { lngFileConfig } from '../../config';
import { useChatbotReducer } from '../../hooks';

const ChatbotPlaceholder = (): JSX.Element => {
  const isChatOpen = useSelector(
    (state: RootStore) => state.chatbotData.isChatOpen,
  );
  const { t } = useTranslation(lngFileConfig.CHATBOT);
  const { openChat } = useChatbotReducer();
  return (
    <>
      {!isChatOpen && (
        <Box
          position="fixed"
          bottom="30px"
          right="60px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Zoom in>
            <Fab
              size="large"
              color="secondary"
              aria-label="add"
              onClick={openChat}
            >
              <Svg svgName="robot" fill="#fff" />
            </Fab>
          </Zoom>
          <Typography variant="button">{t('startChat')}</Typography>
        </Box>
      )}
    </>
  );
};

export default ChatbotPlaceholder;
