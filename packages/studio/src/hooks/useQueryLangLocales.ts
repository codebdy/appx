import { gql } from "awesome-graphql-client";
import { SYSTEM_APP_UUID } from "../consts";
import { useQuery } from "../enthooks/hooks/useQuery";
import { ILangLocal } from "../model";

const langLocalGql = gql`
query queryLangLocal($appUuid:String){
  langLocal(where:{
    appUuid:{
      _eq:$appUuid
    }
  }){
    id
    name
    appUuid
    schemaJson
  }
}
`

export function useQueryLangLocales(appUuid: string) {
  const { data, error, loading } = useQuery<ILangLocal>({
    gql: langLocalGql,
    params: { appUuid: appUuid || SYSTEM_APP_UUID },
    depEntityNames: ["LangLocal"]
  })
  return { langLocales: data?.langLocal, error, loading }
}