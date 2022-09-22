// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/prefer-default-export */
import httpErrors from 'http-errors';
import nodeFetch from 'node-fetch';
import { ChatbotMessage } from '../types';
import { getDatabaseService } from '../db';
import createAbortController from '../utils/abortController';

const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
/**
 * getChatbotMessage
 * Returns a chatbot message
 * @returns
 */
export const getChatbotMessageById = async (
  id: number,
): Promise<ChatbotMessage> => {
  const databaseService = getDatabaseService();
  const chatbotMessage = await databaseService.getChatbotMessageById(id);
  if (!chatbotMessage) {
    throw httpErrors(404, 'chatbotMessageId does not exist');
  }
  // adding timeout here to mock real chat behavior
  await wait(1000);
  return chatbotMessage;
};

export const sendConversation = async (body: string): Promise<void> => {
  const { abortController, timeout } = createAbortController();
  const res = await nodeFetch(
    'https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation',
    { method: 'put', signal: abortController.signal, body },
  ).finally(() => {
    clearTimeout(timeout);
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('conversation was not saved error', error);
  }
};
