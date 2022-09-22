import request from 'supertest';
import app from '../../src/bff/app';
import bffComConfig from '../../src/frontend/config/bffComConfig';

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
jest.mock('../../src/bff/db/services/jsonReadonlyDb', () => {
  return jest.fn().mockImplementation(() => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getChatbotMessageById: (id: number) => {
        return testData;
      },
    };
  });
});

// More tests can be added here
describe('Test all endpoints related to chatbot', () => {
  describe('get chatbot/:id', () => {
    it('Should return 422 since no id is provided', async () => {
      await request(app)
        .get(bffComConfig.endpoints.chatbot().GET_MESSAGE)
        .send()
        .expect(422);
    });
    it('Should return 200 when providing a correct id', async () => {
      await request(app)
        .get(bffComConfig.endpoints.chatbot('100').GET_MESSAGE)
        .send()
        .expect(200);
    });
    it('Should return the correct value', async () => {
      const testResponse = await request(app).get(
        bffComConfig.endpoints.chatbot('100').GET_MESSAGE,
      );

      expect(testResponse.body).toStrictEqual(testData);
    });
  });
});
