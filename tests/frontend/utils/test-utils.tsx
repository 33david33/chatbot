import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import preapreStore from '../../../src/frontend/redux/store';

const render = (
  ui: JSX.Element,
  { store = preapreStore(), ...renderOptions } = {},
): RenderResult => {
  const Wrapper: FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { queryByText as queryByTextGlob } from '@testing-library/react';
// override render method
export { render };
