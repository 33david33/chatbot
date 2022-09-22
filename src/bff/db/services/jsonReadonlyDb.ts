import { promises as fs } from 'fs';
import httpErrors from 'http-errors';
import { ChatbotMessages, ChatbotMessage, IDatabase } from '../../types';
import { config, errorLogger } from '../../config';

class JsonReadonlyDb implements IDatabase {
  private cache: ChatbotMessages | undefined;

  private arrayToRecord = (
    chatBotMessagesArray: ChatbotMessage[],
  ): ChatbotMessages => {
    const tmpChatBotMessageRecord: ChatbotMessages = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const cbMessage of chatBotMessagesArray) {
      tmpChatBotMessageRecord[cbMessage.id] = cbMessage;
    }

    return tmpChatBotMessageRecord;
  };

  private getData = async (): Promise<ChatbotMessages | undefined> => {
    if (this.cache) {
      return this.cache;
    }

    const data = await fs.readFile(config.jsonDbFile, {
      encoding: 'utf-8',
      flag: 'r',
    });
    if (data) {
      try {
        const parsedData: ChatbotMessage[] = JSON.parse(data);
        const chatbotMessages = this.arrayToRecord(parsedData);
        this.cache = chatbotMessages;
        return chatbotMessages;
      } catch (error: any) {
        errorLogger.error(error, 'Data are corrupted! Check the JSON DB');
        throw httpErrors(500, 'Internal Server Error');
      }
    }
    return undefined;
  };

  public getChatbotMessageById = async (
    id: number,
  ): Promise<ChatbotMessage | undefined> => {
    const chatbotMessages = await this.getData();

    if (!chatbotMessages || !chatbotMessages.hasOwnProperty(id)) {
      return undefined;
    }

    return chatbotMessages[id];
  };
}

export default JsonReadonlyDb;
