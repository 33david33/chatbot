// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { logger } from '../config';

/**
 * logFrontendLogMessage logs a message send fromt the client
 * @param req Request from Client
 * @param res Response to Client
 */
const logFrontendLogMessage = (logMessage: string) => {
  try {
    // We could use this for click-tracking
    // Is also logged to stdout and then stored in pm2 log files
    logger.info(logMessage);
  } catch (e) {
    // Log Errors
    throw Error('Error while adding Log Message');
  }
};

const loggerService = { logFrontendLogMessage };
export default loggerService;
