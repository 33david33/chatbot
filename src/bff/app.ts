import express from 'express';
import cors from 'cors';
import { config, expressLogger } from './config';
import { apiRouter, loggerRouter } from './routes';
import { errors, rules } from './middlewares';

const app = express();

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const devMiddleware = require('./middlewares/devMiddleware').default;
  app.use(devMiddleware);
}

/** Parsers */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** If not in production use cors and http-proxy-middleware */
// if (process.env.NODE_ENV !== 'production') {
app.use(
  cors({
    credentials: true,
    origin: `${config.client.hostname}:${config.client.port}`,
    optionsSuccessStatus: 200,
  }),
);
// }

/** Logger */
if (process.env.NODE_ENV !== 'test') {
  // app.use(expressLogger);
}

/** Rules for the BFF */
app.use(rules.bffRules);

/** Route for Logger */
app.use('/logger', loggerRouter);

/** Route for API */
app.use(
  '/api',
  // protect the api here, however u seem fit
  apiRouter,
);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public`));
}

/** Error Handling 404 */
app.use(errors.notFound);

/** Error Handling if an error occures
 */
app.use(errors.serverErrors);

export default app;
