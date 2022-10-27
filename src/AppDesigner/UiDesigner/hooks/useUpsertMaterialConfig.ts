import { useCallback } from "react";
import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { IMaterialConfig } from "~/model";
import { IMaterialConfigInput } from "~/model";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

export function useUpsertMaterialConfig(options?: IPostOptions<any>): [
  (config: IMaterialConfigInput) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();

  const [post, { error, loading }] = usePostOne<IMaterialConfigInput, IMaterialConfig>("MaterialConfig",
    {
      ...options,
      fieldsGql: " schemaJson"
    }
  )

  const upsert = useCallback((config: IMaterialConfigInput) => {
    const newConfig = {
      ...config,
      app: { sync: { id: params.app.id } },
    }
    post({ ...newConfig })
  }, [params?.app, post]);

  return [upsert, { error: error, loading: loading }]
}