import { rest } from 'msw';
import { bffComConfig } from '../../../src/frontend/config';

const testData = {
  id: 100,
  name: 'liability',
  text: 'Benötigen Sie eine Haftplichtversicherung?',
  uiType: 'button',
  valueType: 'boolean',
  valueOptions: [
    {
      nextId: 200,
      value: true,
      text: 'Ja',
    },
    {
      nextId: 200,
      value: false,
      text: 'Nein',
    },
  ],
};

const handlers = [
  rest.get(
    `${bffComConfig.serverUrl}${
      bffComConfig.endpoints.chatbot(':userId').GET_MESSAGE
    }`,
    (req, res, ctx) => {
      return res(ctx.json(testData), ctx.delay(0));
    },
  ),
];

export default handlers;
