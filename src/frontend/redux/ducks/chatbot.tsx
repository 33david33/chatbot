import produce from 'immer';
import { Dispatch } from 'redux';
import {
  CRUD,
  ChatbotMessage,
  ChatMessage,
  AuthorType,
  ChatMessageType,
  ConversationTraceEntry,
} from '../../types/types';
import { bffComConfig } from '../../config';
import { fetchBFF } from '../../utils';

export interface IChatbotState {
  isChatOpen: boolean;
  loading: boolean;
  isDone: boolean;
  currentChatbotMessage?: ChatbotMessage;
  conversationTrace: ConversationTraceEntry[];
  chatMessages: ChatMessage[];
  error?: string;
}

// initial State
export const initialState: IChatbotState = {
  isChatOpen: true,
  loading: false,
  isDone: false,
  chatMessages: [],
  conversationTrace: [],
};

const FETCH_CHATBOT_MESSAGE_REQUEST =
  'app/chatbot/FETCH_CHATBOT_MESSAGE_REQUEST';
const FETCH_CHATBOT_MESSAGE_SUCCESS =
  'app/chatbot/FETCH_CHATBOT_MESSAGE_SUCCESS';
const FETCH_CHATBOT_MESSAGE_FAILURE =
  'app/chatbot/FETCH_CHATBOT_MESSAGE_FAILURE';
const ADD_CHAT_MESSAGE = 'app/chatbot/ADD_CHAT_MESSAGE';
const RESET = 'app/chatbot/RESET';
const SET_IS_CHAT_OPEN = 'app/chatbot/SET_IS_CHAT_OPEN';
// const SEND_MESSAGE = 'app/chatbot/SEND_MESSAGE';
const SET_IS_DONE = 'app/chatbot/SET_IS_DONE';

export interface IChatbotMessageRequest {
  type: typeof FETCH_CHATBOT_MESSAGE_REQUEST;
}
export interface IChatbotMessageSuccess {
  type: typeof FETCH_CHATBOT_MESSAGE_SUCCESS;
  chatbotMessage: ChatbotMessage;
}
export interface IChatbotMessageFailure {
  type: typeof FETCH_CHATBOT_MESSAGE_FAILURE;
  error: string;
}
export interface IAddChatMessage {
  type: typeof ADD_CHAT_MESSAGE;
  payload: {
    chatMessage: ChatMessage;
    conversationTraceEntry?: ConversationTraceEntry;
  };
}
export interface IResetChatbot {
  type: typeof RESET;
}

export interface IIsChatOpen {
  type: typeof SET_IS_CHAT_OPEN;
  isChatOpen: boolean;
}

export interface IIsDone {
  type: typeof SET_IS_DONE;
  isDone: boolean;
}

export type ChatbotDispatchTypes =
  | IChatbotMessageRequest
  | IChatbotMessageSuccess
  | IChatbotMessageFailure
  | IAddChatMessage
  | IResetChatbot
  | IIsChatOpen
  // | ISendMessage
  | IIsDone;

export const fetchChatbotMessageRequest = (): IChatbotMessageRequest => ({
  type: FETCH_CHATBOT_MESSAGE_REQUEST,
});

export const fetchChatbotMessageSuccess = (
  chatbotMessage: ChatbotMessage,
): IChatbotMessageSuccess => ({
  type: FETCH_CHATBOT_MESSAGE_SUCCESS,
  chatbotMessage,
});

export const fetchChatbotMessageFailure = (
  error: string,
): IChatbotMessageFailure => ({
  type: FETCH_CHATBOT_MESSAGE_FAILURE,
  error,
});

export const addChatMessge = (
  chatMessage: ChatMessage,
  conversationTraceEntry?: ConversationTraceEntry,
): IAddChatMessage => ({
  type: ADD_CHAT_MESSAGE,
  payload: { chatMessage, conversationTraceEntry },
});

export const resetChatbot = (): IResetChatbot => ({
  type: RESET,
});

export const setIsChatOpen = (isChatOpen: boolean): IIsChatOpen => ({
  type: SET_IS_CHAT_OPEN,
  isChatOpen,
});

export const setIsDone = (isDone: boolean): IIsDone => ({
  type: SET_IS_DONE,
  isDone,
});

const createChatMessage = (
  text: string,
  author: AuthorType,
  type?: ChatMessageType,
) => ({
  timestamp: Date.now().toString(),
  author,
  text,
  type: type === undefined ? ChatMessageType.TEXT : type,
});

// Reducer
const chatbotReducer = (
  state: IChatbotState = initialState,
  action: ChatbotDispatchTypes,
): IChatbotState => {
  switch (action.type) {
    case FETCH_CHATBOT_MESSAGE_REQUEST:
      return produce(state, (draftState: IChatbotState) => {
        const tmpDraftState = draftState;
        tmpDraftState.loading = true;
      });
    case FETCH_CHATBOT_MESSAGE_SUCCESS:
      return produce(state, (draftState: IChatbotState) => {
        const tmpDraftState = draftState;
        tmpDraftState.loading = false;
        tmpDraftState.error = undefined;
        tmpDraftState.currentChatbotMessage = action.chatbotMessage;
        tmpDraftState.chatMessages.push(
          createChatMessage(action.chatbotMessage.text, AuthorType.AI),
        );
      });
    case FETCH_CHATBOT_MESSAGE_FAILURE:
      return produce(state, (draftState: IChatbotState) => {
        const tmpDraftState = draftState;
        tmpDraftState.loading = false;
        tmpDraftState.error = action.error;
      });
    case ADD_CHAT_MESSAGE:
      return produce(state, (draftState: IChatbotState) => {
        const tmpDraftState = draftState;
        tmpDraftState.chatMessages.push({ ...action.payload.chatMessage });
        if (action.payload.conversationTraceEntry) {
          tmpDraftState.conversationTrace.push({
            ...action.payload.conversationTraceEntry,
          });
        }
      });
    case SET_IS_CHAT_OPEN:
      return produce(state, (draftState: IChatbotState) => {
        const tmpDraftState = draftState;
        tmpDraftState.isChatOpen = action.isChatOpen;
      });
    case SET_IS_DONE:
      return produce(state, (draftState: IChatbotState) => {
        const tmpDraftState = draftState;
        tmpDraftState.isDone = action.isDone;
      });
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};

// thunk

export const fetchChatbotMessageById = (id: number) => {
  return async (
    dispatch: Dispatch<ChatbotDispatchTypes>,
    getState: () => any,
  ): Promise<void> => {
    try {
      const state = getState();
      // only dispatch if no data
      if (
        state.chatbotData.currentChatbotMessage &&
        state.chatbotData.currentChatbotMessage.id === id
      ) {
        return;
      }

      dispatch(fetchChatbotMessageRequest());

      const response = await fetchBFF(
        bffComConfig.endpoints.chatbot(id.toString()).GET_MESSAGE,
        CRUD.GET,
      );
      const chatbotMessage: ChatbotMessage = await response.json();
      dispatch(fetchChatbotMessageSuccess(chatbotMessage));
    } catch (error: unknown) {
      const errorMsg = (error as Error).message;
      dispatch(fetchChatbotMessageFailure(errorMsg));
      dispatch(
        addChatMessge(
          createChatMessage(errorMsg, AuthorType.AI, ChatMessageType.STATUS),
        ),
      );
    }
  };
};

export const postConversation = () => {
  return async (
    dispatch: Dispatch<ChatbotDispatchTypes>,
    getState: () => any,
  ): Promise<void> => {
    try {
      const state = getState();
      await fetchBFF(
        bffComConfig.endpoints.chatbot().POST_CONVERSATION,
        CRUD.POST,
        undefined,
        undefined,
        JSON.stringify(state.chatbotData.conversationTrace),
      );
    } catch (error: unknown) {
      const errorMsg = (error as Error).message;
      console.error(errorMsg);
    }
  };
};

export default chatbotReducer;
