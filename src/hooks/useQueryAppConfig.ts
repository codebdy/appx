import { gql } from "../enthooks";
import { useMemo } from "react";
import { SYSTEM_APP_ID } from "../consts";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IAppConfig } from "../model";
import { ID } from "~/shared";

const configGql = gql`
query ($appId:ID){
  oneAppConfig(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
  }){
    id
    schemaJson
  }
}
`

export function useQueryAppConfig(appID: ID) {
  const input = useMemo(() => ({
    gql: configGql,
    params: { appID: appID || SYSTEM_APP_ID },
    depEntityNames: ["AppConfig"]
  }), [appID])

  const { data, error, loading } = useQueryOne<IAppConfig>(input)
  return { config: data?.oneAppConfig, error, loading }
}