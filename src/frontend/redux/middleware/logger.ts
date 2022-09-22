import log from 'loglevel';
import { Action, MiddlewareAPI, Dispatch } from 'redux';
import { ThunkMiddleware } from 'redux-thunk';

const logger: ThunkMiddleware =
  (api: MiddlewareAPI) =>
  (next: Dispatch) =>
  <A extends Action>(action: A) => {
    // eslint-disable-next-line no-console
    console.group(action.type);
    log.debug('dispatching', action);
    const result = next(action);
    log.debug('next state', api.getState());
    // eslint-disable-next-line no-console
    console.groupEnd();
    return result;
  };

export default logger;
