import log from 'loglevel';
import remote from 'loglevel-plugin-remote';
import bffComConfig from './bffComConfig';

/**
 * Configures the logger that automatically sends the logs to the backend
 * Simply call log.info/error/debug etc. and it will send to the frontend logger endpoint on the server
 */
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  log.enableAll();
} else if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging'
) {
  log.setLevel(log.levels.ERROR);
}
remote.apply(log, {
  url: `${bffComConfig.serverUrl}${bffComConfig.endpoints.LOGGER}`,
  format: remote.json,
});

export default log;
