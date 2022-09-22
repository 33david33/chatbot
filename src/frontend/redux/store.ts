import {
  applyMiddleware,
  legacy_createStore as createStore,
  Store,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
// turn on the logger if u need it
// import loggerMiddleware from './middleware/logger';
import reducers from './reducers';

const configureStore = (): Store => {
  let middlewares = [thunkMiddleware /* loggerMiddleware */];

  if (process.env.NODE_ENV !== 'development') {
    middlewares = [thunkMiddleware];
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const store = createStore(reducers, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(reducers));
  }

  return store;
};

export type RootStore = ReturnType<typeof reducers>;
export default configureStore;
