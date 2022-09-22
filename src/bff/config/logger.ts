import pino from 'pino';
import expressPinoLogger from 'express-pino-logger';

export const logger = pino({ prettyPrint: false });
export const errorLogger = pino(process.stderr);
export const expressLogger = expressPinoLogger({ logger });
