import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  Zoom,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import Chatbot from './chatbot';
import LoadingIndicator from './shared/LoadingIndicator';
import { lngFileConfig } from '../config';
import theme from '../theme';
import { RootStore } from '../redux';
import ChatbotPlaceholder from './chatbot/ChatbotPlaceholder';
import Content from './content/Content';

const useStyles = makeStyles(() => ({
  pageContainer: {},
  chatbotContainer: {
    boxShadow: '-3px -3px 10px #666666',
    padding: '0',
    backgroundColor: '#fff',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppDefaultLayout = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation(lngFileConfig.CHATBOT);

  const isChatOpen = useSelector(
    (state: RootStore) => state.chatbotData.isChatOpen,
  );
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            />
            <Typography variant="h6" className={classes.title}>
              {t('needHelp')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Content />
      </Container>
      <ChatbotPlaceholder />
      {isChatOpen && (
        <Zoom in>
          <Box
            height="80vh"
            width="30vw"
            display="flex"
            flexDirection="column"
            className={classes.chatbotContainer}
            position="fixed"
            bottom={0}
            right={0}
          >
            <Suspense fallback={<LoadingIndicator message={t('loading')} />}>
              <Chatbot />
            </Suspense>
          </Box>
        </Zoom>
      )}
    </ThemeProvider>
  );
};

export default AppDefaultLayout;
