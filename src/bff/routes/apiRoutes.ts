import express from 'express';
import chatbotRouter from './chatbotRoutes';

const apiRouter = express.Router();

/** Route for User data */
apiRouter.use('/chatbot', chatbotRouter);

export default apiRouter;
