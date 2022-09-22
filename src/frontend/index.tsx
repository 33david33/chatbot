// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable global-require */

import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';

import './config/logger';
import './config/i18n';
import preapreStore from './redux/store';

const store = preapreStore();

/**
 * The journey starts here
 */
const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};
render(App);

if (module.hot) {
  module.hot.accept('./App.tsx', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const NextRootContainer = require('./App').default;
    render(NextRootContainer);
  });
}
