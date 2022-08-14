import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../enthooks/hooks/usePostOne";
import { ILangLocal } from "../model";
import { ILangLocalInput } from "../model/input";
import { useAppParams } from "../shared/AppRoot/context";

export function useUpsertLangLocal(options?: IPostOptions<any>): [
  (page: ILangLocalInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useAppParams();

  const [post, { error, loading }] = usePostOne<ILangLocalInput, ILangLocal>("LangLocal",
    {
      ...options,
      fieldsGql: " name schemaJson"
    }
  )

  const upsert = useCallback((localInput: ILangLocalInput) => {
    const newLocal = {
      ...localInput,
      appUuid: params.app.uuid,
    }
    post({ ...newLocal })
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}