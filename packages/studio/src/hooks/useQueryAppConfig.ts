import { gql } from "awesome-graphql-client";
import { SYSTEM_APP_UUID } from "../consts";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IAppConfig } from "../model";

const configGql = gql`
query queryAppConfig($appUuid:String){
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
  const { data, error, loading } = useQueryOne<IAppConfig>({
    gql: configGql,
    params: { appUuid: appUuid || SYSTEM_APP_UUID },
    depEntityNames: ["AppConfig"]
  })
  return { config: data?.oneAppConfig, error, loading }
}