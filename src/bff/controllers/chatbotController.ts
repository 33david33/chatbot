// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prefer-destructuring */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Request, Response } from 'express';
import { chatbotService } from '../services';

/**
 *
 * getChatbotMessageById
 * Returns a Chatbotmessage or throws a 404 if not found
 *
 * @param req Request from Client
 * @param res Response to Client
 */
export const getChatbotMessageById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const chatbotMessage = await chatbotService.getChatbotMessageById(
    parseInt(id, 10),
  );

  // Send
  res.status(200).json(chatbotMessage);
};

export const sendConversation = async (req: Request, res: Response) => {
  console.info('sending conversation: ', req.body);

  // don't do it endpoint is down
  await chatbotService.sendConversation(req.body);
  res.status(200).json({});
};
