import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { chatbotController } from '../controllers';
import { valRequests } from '../validations';

const chatbotRouter = express.Router();

chatbotRouter
  .route('/:id')
  .get(
    valRequests.valIdParam,
    expressAsyncHandler(chatbotController.getChatbotMessageById),
  );

chatbotRouter
  .route('/conversation')
  .post(expressAsyncHandler(chatbotController.sendConversation));

export default chatbotRouter;
