import { v4 as uuidv4 } from 'uuid';

var idSeed = new Date().getTime()
export type ID = string;

export function createId(): ID {
  idSeed = new Date().getTime()
  return idSeed + ""
}

export const createUuid = () => {
  return uuidv4();
};
