// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express';
import { loggerService } from '../services';

/**
 * logFrontendLogMessage sends a message from the client to the service
 * @param req Request from Client
 * @param res Response to Client
 */
const logFrontendLogMessage = async (req: Request, res: Response) => {
  try {
    loggerService.logFrontendLogMessage(JSON.stringify(req.body));
  } catch (error) {
    res.status(400).send(error);
  }
};

const loggerController = { logFrontendLogMessage };
export default loggerController;
