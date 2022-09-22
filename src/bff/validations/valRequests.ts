// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import httpErrors from 'http-errors';
import { check, validationResult } from 'express-validator';

export const valIdParam = [
  check('id').exists().withMessage('a id must exist').bail(),
  check('id').isNumeric().withMessage('a id must numeric').bail(),
  check('id')
    .not()
    .equals('undefined')
    .withMessage('id must be a number')
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        httpErrors(
          422,
          errors
            .array()
            .map((error) => error.msg)
            .join(', '),
        ),
      );
    }
    return next();
  },
];
