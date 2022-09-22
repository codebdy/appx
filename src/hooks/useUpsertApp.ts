
import { IPostOptions, usePostOne } from '../enthooks/hooks/usePostOne';
import { IApp } from '../model';
import { IAppInput } from '../model/input';

export function useUpsertApp(options?: IPostOptions<IApp>) {
  return usePostOne<IAppInput, IApp>("App", options)
}