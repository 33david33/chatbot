import { CRUD } from '../types/types';
import bffComConfig from '../config/bffComConfig';

const createAbortController = () => {
  const abortController = new AbortController();
  const timeout = setTimeout(() => {
    abortController.abort();
  }, bffComConfig.mmUntilTimeout);

  return { abortController, timeout };
};

const fetchBFF = async (
  endpoint: string,
  operation: CRUD,
  params?: string,
  query?: string,
  body?: string,
): Promise<Response> => {
  const { abortController, timeout } = createAbortController();
  const input: RequestInfo = `${bffComConfig.serverUrl}${endpoint}${
    params || ''
  }${query ? `?${new URLSearchParams(JSON.parse(query)).toString()}` : ''}`;
  let init: RequestInit = {
    body,
    signal: abortController.signal,
  };
  switch (operation) {
    case CRUD.GET:
      init = {
        ...init,
        ...bffComConfig.getRequestOptions,
      };
      break;

    case CRUD.POST:
      init = {
        ...init,
        ...bffComConfig.postRequestOptions,
      };
      break;

    case CRUD.PUT:
      init = {
        ...init,
        ...bffComConfig.putRequestOptions,
      };
      break;

    case CRUD.PATCH:
      init = {
        ...init,
        ...bffComConfig.patchRequestOptions,
      };
      break;

    case CRUD.DELETE:
      init = {
        ...init,
        ...bffComConfig.deleteRequestOptions,
      };
      break;

    default:
      throw new Error('CRUD Operation not found');
  }
  const response: Response = await fetch(input, init).finally(() => {
    clearTimeout(timeout);
  });

  if (!response.ok) {
    let message = `An error has occured: ${response.status}`;
    try {
      const error = await response.text();
      if (response.status === 400 && error) {
        const parsedError = JSON.parse(error);
        if (parsedError && parsedError.hasOwnProperty('message'))
          message = parsedError.message;
      }
      throw new Error(message);
    } catch (e: unknown) {
      throw new Error(message);
    }
  }

  return response;
};

export default fetchBFF;
