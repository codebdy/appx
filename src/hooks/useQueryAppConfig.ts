import { gql } from "../enthooks";
import { useMemo } from "react";
import { SYSTEM_APP_UUID } from "../consts";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IAppConfig } from "../model";

const configGql = gql`
query ($appUuid:String){
  oneAppConfig(where:{
    appUuid:{
      _eq:$appUuid
    }
  }){
    id
    appUuid
    schemaJson
  }
}
`

export function useQueryAppConfig(appUuid: string) {
  const input = useMemo(() => ({
    gql: configGql,
    params: { appUuid: appUuid || SYSTEM_APP_UUID },
    depEntityNames: ["AppConfig"]
  }), [appUuid])

  const { data, error, loading } = useQueryOne<IAppConfig>(input)
  return { config: data?.oneAppConfig, error, loading }
}