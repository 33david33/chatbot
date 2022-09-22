import app from './app';
import { config, logger } from './config';

/**
 * Setup before server starts up
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/**
 * The Startingpoint of the server
 */
const startExpressServer = () => {
  app.listen(config.server.port, () => {
    logger.info(
      `BFF is listening on port ${config.server.port} in ${process.env.NODE_ENV} mode`,
    );
  });
};

/**
 * startup procedure
 * not necessary since there is nothing to check in this project right now
 */
startExpressServer();

process.on('SIGINT', () => {
  logger.info('Gracefully shutting down from SIGINT (Ctrl-C)');
  // some other closing procedures go here
  process.exit(1);
});
