
import { useCallback } from 'react';
import { IApp } from '../model';
import { IAppInput } from '../model/input';
import { STORAGE_KEY_APPS } from './consts';
import { IMutationResponse } from './IMutationResponse';
import { useCreate } from './useCreate';

type CreateFn = (app: IAppInput) => void;

export function useCreateApp(onComplate?: (app: IApp) => void): [create: CreateFn, response: IMutationResponse<IApp>] {
  return useCreate<IAppInput, IApp>(STORAGE_KEY_APPS, onComplate)
}