import { combineReducers } from 'redux';
import { chatbotReducer } from './ducks';

const appReducer = combineReducers({
  chatbotData: chatbotReducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (state: any, action: any) => {
  return appReducer(state, action);
};
