import { gql } from "../enthooks";
import { useMemo } from "react";
import { SYSTEM_APP_ID } from "../consts";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IApp } from "../model";

const appGql = gql`
query ($uuid:String!){
  oneApp(where:{
    uuid:{
      _eq:$uuid
    }
  }){
    id
    uuid
    title
  }
}
`

export function useQueryApp(uuid: string) {
  const params = useMemo(() => ({
    uuid: uuid || SYSTEM_APP_ID
  }), [uuid])
  
  const { data, error, loading } = useQueryOne<IApp>(
    {
      gql: appGql,
      params,
      depEntityNames: ["App"],
    }

  )

  return { app: data?.oneApp, error, loading }
}