// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/prefer-default-export */
import { IDatabase } from '../types';
import { config } from '../config';
import JsonReadonlyDb from './services/jsonReadonlyDb';

let databaseService: IDatabase | undefined;

export const getDatabaseService = (): IDatabase => {
  if (databaseService) {
    return databaseService;
  }
  switch (config.database) {
    case 'JSON':
      databaseService = new JsonReadonlyDb();
      return databaseService;
    // add more databaseServices here
    default:
      databaseService = new JsonReadonlyDb();
      return databaseService;
  }
};
