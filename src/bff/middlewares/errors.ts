import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { ErrorMessage } from '../types';
import { errorLogger } from '../config';

/**
 * Validates whether an error is an HttpError
 * @param error The error
 */
const isHttpError = (error: Error | HttpError): error is HttpError => {
  return 'status' in error;
};
/**
 * This function is called when an error is thrown. Worst case it answers the client with status 500
 * @param error The error
 * @param req Request
 * @param res Response
 * @param next Next Function
 */
export const serverErrors = (
  error: Error | HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Response<any, Record<string, any>> => {
  const errorMessage: ErrorMessage = {
    status: isHttpError(error) ? error.status : 500,
    message: error.message,
    stack: error.stack,
  };
  errorLogger.error(error);
  return res.status(errorMessage.status).json(errorMessage);
};

/**
 * This function is called when the client tries to reach an endpoint that does not exist
 * @param error The error
 * @param req Request
 * @param res Response
 * @param next Next Function
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const notFound = (req: Request, res: Response) => {
  const errorMessage: ErrorMessage = {
    status: 404,
    message: 'Endpoint not found!',
  };
  if (process.env.NODE_ENV === 'development') {
    return res.redirect(`/frontend`);
  }

  return res.status(errorMessage.status).json(errorMessage);
};
