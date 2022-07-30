
import { IPostOptions, usePostOne } from '../enthooks/hooks/usePostOne';
import { IApp } from '../model';
import { IAppInput } from '../model/input';

export function useCreateApp(options?: IPostOptions<IApp>) {
  return usePostOne<IAppInput, IApp>("App", options)
}