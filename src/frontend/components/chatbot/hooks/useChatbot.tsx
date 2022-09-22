import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, shallowEqual } from 'react-redux';
import { lngFileConfig } from '../../../config';
import { useChatbotReducer } from '../../../hooks';
import { RootStore } from '../../../redux/store';
import {
  ChatMessage,
  ChatbotMessage,
  ChatbotValueOption,
  AuthorType,
  ConversationTraceEntry,
} from '../../../types/types';

// eslint-disable-next-line @typescript-eslint/ban-types
const useChatbot = (): {
  isDone: boolean;
  chatMessages: ChatMessage[];
  chatbotLoadingMessage: boolean;
  chatbotError: string | undefined;
  currentChatbotMessage: ChatbotMessage | undefined;
  handleOpenClick: () => void;
  handleCloseClick: () => void;
  handleSendClick: (message: string) => void;
  handleOptionClick: (
    option: ChatbotValueOption,
    conversationTraceEntry: ConversationTraceEntry,
  ) => () => void;
  handleRestartClick: () => void;
} => {
  const { t } = useTranslation(lngFileConfig.CHATBOT);
  const {
    getNextChatbotMessageById,
    addStatusMessage,
    closeChat,
    openChat,
    addTextMessage,
    chatDone,
    resetChat,
    sendConversationToServer,
  } = useChatbotReducer();
  const chatMessages = useSelector(
    (state: RootStore) => state.chatbotData.chatMessages,
    shallowEqual,
  );
  const chatbotLoadingMessage = useSelector(
    (state: RootStore) => state.chatbotData.loading,
  );
  const chatbotError = useSelector(
    (state: RootStore) => state.chatbotData.error,
  );
  const currentChatbotMessage = useSelector(
    (state: RootStore) => state.chatbotData.currentChatbotMessage,
    shallowEqual,
  );
  const isDone = useSelector((state: RootStore) => state.chatbotData.isDone);
  useEffect(() => {
    if (!chatMessages || chatMessages.length === 0) {
      addStatusMessage(t('startStatusMessage'));
      getNextChatbotMessageById(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNextChatbotMessageById, chatMessages, addStatusMessage]);

  useEffect(() => {
    if (isDone) {
      sendConversationToServer();
    }
  }, [isDone, sendConversationToServer]);

  const handleOpenClick = useCallback(() => {
    openChat();
  }, [openChat]);

  const handleCloseClick = useCallback(() => {
    closeChat();
  }, [closeChat]);

  const handleSendClick = useCallback(
    (message: string) => {
      addTextMessage(message, AuthorType.USER);
      if (currentChatbotMessage) {
        addTextMessage(t('iAmNotSmartEnough'), AuthorType.AI);
        addTextMessage(currentChatbotMessage.text, AuthorType.AI);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentChatbotMessage],
  );

  const handleOptionClick = useCallback(
    (
        option: ChatbotValueOption,
        conversationTraceEntry: ConversationTraceEntry,
      ) =>
      () => {
        addTextMessage(option.text, AuthorType.USER, conversationTraceEntry);
        if (typeof option.nextId === 'number') {
          getNextChatbotMessageById(option.nextId);
        } else if (option.nextId === false) {
          addTextMessage(t('endMessage'), AuthorType.AI);
          chatDone();
        }
      },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addTextMessage, getNextChatbotMessageById],
  );
  const handleRestartClick = useCallback(() => {
    resetChat();
  }, [resetChat]);

  return {
    isDone,
    chatMessages,
    chatbotLoadingMessage,
    chatbotError,
    currentChatbotMessage,
    handleOpenClick,
    handleCloseClick,
    handleSendClick,
    handleOptionClick,
    handleRestartClick,
  };
};

export default useChatbot;
