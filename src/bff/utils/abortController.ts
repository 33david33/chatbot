import AbortController from 'abort-controller';

const createAbortController = (): {
  abortController: AbortController;
  timeout: NodeJS.Timeout;
} => {
  const abortController = new AbortController();
  const timeout = setTimeout(() => {
    abortController.abort();
  }, 5000);

  return { abortController, timeout };
};

export default createAbortController;
