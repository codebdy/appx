import { gql } from "awesome-graphql-client";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IAppConfig } from "../model";

const configGql = gql`
query queryAppConfig{
  oneAppConfig(where:{
    app:{
      uuid:{
        _isNull:true
      }
    }
  }){
    id
    schemaJson
  }
}
`

export function useSystemConfig() {
  const { data, error, loading } = useQueryOne<IAppConfig>({ gql: configGql, depEntityNames: ["AppConfig"] })
  return { config: data?.oneAppConfig, error, loading }
}