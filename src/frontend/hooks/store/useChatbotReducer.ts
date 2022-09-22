import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchChatbotMessageById,
  addChatMessge,
  resetChatbot,
  setIsChatOpen,
  setIsDone,
  postConversation,
} from '../../redux/ducks';
import {
  AuthorType,
  ChatMessage,
  ChatMessageType,
  ConversationTraceEntry,
} from '../../types/types';

/**
 * useChatbotReducer
 * Use this hook to interact with the chatbot reducer
 */
const useChatbotReducer = (): {
  getNextChatbotMessageById: (id: number) => void;
  addTextMessage: (
    text: string,
    authorType: AuthorType,
    conversationTraceEntry?: ConversationTraceEntry,
  ) => void;
  addStatusMessage: (text: string) => void;
  resetChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  chatDone: () => void;
  sendConversationToServer: () => void;
} => {
  const dispatch = useDispatch();
  const getNextChatbotMessageById = useCallback(
    (id: number): void => {
      dispatch(fetchChatbotMessageById(id));
    },
    [dispatch],
  );

  const addTextMessage = useCallback(
    (
      text: string,
      authorType: AuthorType,
      conversationTraceEntry?: ConversationTraceEntry,
    ): void => {
      const chatMessage: ChatMessage = {
        timestamp: Date.now().toString(),
        author: authorType,
        text,
        type: ChatMessageType.TEXT,
      };
      dispatch(addChatMessge(chatMessage, conversationTraceEntry));
    },
    [dispatch],
  );

  const addStatusMessage = useCallback(
    (text: string): void => {
      const chatMessage: ChatMessage = {
        timestamp: Date.now().toString(),
        author: AuthorType.AI,
        text,
        type: ChatMessageType.STATUS,
      };
      dispatch(addChatMessge(chatMessage));
    },
    [dispatch],
  );

  const resetChat = useCallback((): void => {
    dispatch(resetChatbot());
  }, [dispatch]);

  const openChat = useCallback((): void => {
    dispatch(setIsChatOpen(true));
  }, [dispatch]);

  const closeChat = useCallback((): void => {
    dispatch(setIsChatOpen(false));
  }, [dispatch]);

  const chatDone = useCallback((): void => {
    dispatch(setIsDone(true));
  }, [dispatch]);

  const sendConversationToServer = useCallback((): void => {
    dispatch(postConversation());
  }, [dispatch]);

  return {
    getNextChatbotMessageById,
    addTextMessage,
    addStatusMessage,
    resetChat,
    openChat,
    closeChat,
    chatDone,
    sendConversationToServer,
  };
};

export default useChatbotReducer;
