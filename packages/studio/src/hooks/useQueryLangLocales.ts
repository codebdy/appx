import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
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
    nodes{
      id
      name
      appUuid
      schemaJson      
    }
  }
}
`

export function useQueryLangLocales(appUuid: string) {
  const input = useMemo(() => ({
    gql: langLocalGql,
    params: { appUuid: appUuid || SYSTEM_APP_UUID },
    depEntityNames: ["LangLocal"]
  }), [appUuid])
  const { data, error, loading } = useQuery<ILangLocal>(input)
  return { langLocales: data?.langLocal, error, loading }
}