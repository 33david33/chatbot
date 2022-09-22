import { hot } from 'react-hot-loader/root';
import React, { FC, Suspense } from 'react';

import AppDefaultLayout from './components/AppDefaultLayout';
import LoadingIndicator from './components/shared/LoadingIndicator';

/**
 * Entrypoint
 * The default URL is redirected to chatbot
 */
const App: FC = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <AppDefaultLayout />
    </Suspense>
  );
};

export default hot(App);
