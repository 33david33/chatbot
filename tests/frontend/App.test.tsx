import React, { Suspense } from 'react';
import { setupServer } from 'msw/node';
import App from '../../src/frontend/App';
import { testIdsConfig } from '../../src/frontend/config';
import { cleanup, render, waitFor } from './utils/test-utils';
import { handlers } from './utils';
import config from '../config/config';

// global.fetch = require('node-fetch');
const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

// mock translation lib
const ut = {
  t: (key: string) => key,
  i18n: { language: 'en' },
};
jest.mock('react-i18next', () => ({
  useTranslation: () => ut,
  initReactI18next: { type: '3rdParty', init: jest.fn() },
}));

const { jestLongTimeout } = config.delays;

afterEach(cleanup);

describe('Simple test', () => {
  test(
    'Chatbot should render',
    async () => {
      const { getByTestId } = render(
        <Suspense fallback="loading...">
          <App />
        </Suspense>,
      );

      const lazyElement = await waitFor(
        () => getByTestId(testIdsConfig.chatbot.id),
        { timeout: config.delays.jestLongTimeout },
      );

      expect(lazyElement).toBeInTheDocument();
    },
    jestLongTimeout,
  );
});
