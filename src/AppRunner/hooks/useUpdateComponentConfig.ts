import { IPostOptions, usePostOne } from "~/enthooks/hooks/usePostOne";
import { useCallback } from "react";
import { useMe } from "@rxdrag/plugin-sdk/contexts/login";
import { useAppParams, useUserConfig } from "~/plugin-sdk/contexts/app";
import { IUserConfig, IUserConfigInput } from "~/model/user";

export function useUpdateComponentConfig(options?: IPostOptions<any>): [
  (path: string, value: any) => void,
  {
    loading?: boolean,
    error?: Error,
  }
] {
  const userConfig = useUserConfig();
  const { app, device } = useAppParams();
  const me = useMe();

  const [post, { error, loading }] = usePostOne<IUserConfigInput, IUserConfig>("UserConfig",
    {
      ...options,
      fieldsGql: " schemaJson"
    }
  )

  const update = useCallback((path: string, value: any) => {
    const newConfig = {
      ...userConfig || {},
      schemaJson: {
        ...userConfig?.schemaJson || {},
        [path]: value,
      },
      app: {
        sync: {
          id: app.id,
        }
      },
      user: {
        sync: {
          id: me.id,
        }
      },
      device,
    }

    post(newConfig);
  }, [app?.id, device, me.id, post, userConfig])

  return [update, { error: error, loading: loading }];
}