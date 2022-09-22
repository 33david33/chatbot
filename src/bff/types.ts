// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-shadow */

export type ErrorMessage = {
  message: string;
  status: number;
  stack?: string;
};

export const svgIconTypes = ['bulb'] as const;

export type SvgIconType = typeof svgIconTypes[number];

// add more Ui Types if necessary
export type ChatbotUiType = 'button';
// add more Value Types if necessary
export type ChatbotValueType = 'boolean' | 'string' | 'number';
export type ChatbotValueOption = {
  nextId: number;
  value: boolean;
  text: string;
};
export type ChatbotMessage = {
  id: number;
  name: string;
  text: string;
  uiType: ChatbotUiType;
  valueType: ChatbotValueType;
  valueOptions: ChatbotValueOption[];
};

// since read only: for faster access we use a Record
export type ChatbotMessages = Record<number, ChatbotMessage>;

export enum AuthorType {
  AI = 1,
  USER = 2,
}

export type ChatMessage = {
  timestamp: string;
  author: AuthorType;
  text: string;
};

export interface IDatabase {
  getChatbotMessageById(id: number): Promise<ChatbotMessage | undefined>;
}

export enum CRUD {
  GET = 0,
  POST = 1,
  PUT = 2,
  PATCH = 3,
  DELETE = 4,
}
