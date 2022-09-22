// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * Config file for bff communication realted configurations.
 */
const { SERVER_URL } = process.env;

const apiRoute = '/api';
const chatbot = '/chatbot';

const ENDPOINTS = {
  chatbot: (id?: string) => ({
    GET_MESSAGE: `${apiRoute}${chatbot}/${id}`,
    POST_CONVERSATION: `${apiRoute}${chatbot}/conversation`,
  }),
  LOGGER: `/logger`,
};

/**
 * The default options for post requests
 */
const POST_REQUEST_OPTIONS = {
  method: 'POST',
  credentials: 'include' as const,
  headers: { 'Content-Type': 'application/json' },
};

/**
 * The default options for put requests
 */
const PUT_REQUEST_OPTIONS = {
  method: 'PUT',
  credentials: 'include' as const,
  headers: { 'Content-Type': 'application/json' },
};

/**
 * The default options for patch requests
 */
const PATCH_REQUEST_OPTIONS = {
  method: 'PATCH',
  credentials: 'include' as const,
  headers: { 'Content-Type': 'application/json' },
};

/**
 * The default options for delete requests
 */
const DELETE_REQUEST_OPTIONS = {
  method: 'DELETE',
  credentials: 'include' as const,
  headers: { 'Content-Type': 'application/json' },
};
/**
 * The default options for get requests
 */
const GET_REQUEST_OPTIONS = {
  method: 'GET',
  credentials: 'include' as const,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const bffComConfig = {
  postRequestOptions: POST_REQUEST_OPTIONS,
  getRequestOptions: GET_REQUEST_OPTIONS,
  putRequestOptions: PUT_REQUEST_OPTIONS,
  patchRequestOptions: PATCH_REQUEST_OPTIONS,
  deleteRequestOptions: DELETE_REQUEST_OPTIONS,
  serverUrl: SERVER_URL || 'http://localhost:4200',
  endpoints: ENDPOINTS,
  mmUntilTimeout: 1000 * 60 * 60,
  projectsRefetchTimeout: 5 * 1000, // 5s
  projectsPageSize: 500,
};

export default bffComConfig;
