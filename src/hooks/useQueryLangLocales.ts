import { gql } from "../enthooks";
import { useMemo } from "react";
import { SYSTEM_APP_ID } from "../consts";
import { useQuery } from "../enthooks/hooks/useQuery";
import { ILangLocal } from "../model";

const langLocalGql = gql`
query ($appUuid:String){
  langLocals(where:{
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
    params: { appUuid: appUuid || SYSTEM_APP_ID },
    depEntityNames: ["LangLocal"]
  }), [appUuid])
  const { data, error, loading } = useQuery<ILangLocal>(input)
  return { langLocales: data?.langLocals?.nodes, error, loading }
}