import express from 'express';
import { loggerController } from '../controllers';

const loggerRouter = express.Router();

loggerRouter.route('/').post(loggerController.logFrontendLogMessage);

export default loggerRouter;
