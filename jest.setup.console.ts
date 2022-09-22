global.console = {
  ...global.console,
  log: jest.fn(), 
  error: console.error,
  warn: jest.fn(),
  info: console.info,
  debug: console.debug,
};
