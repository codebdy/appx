import { gql } from "../enthooks";
import { useMemo } from "react";
import { SYSTEM_APP_ID } from "../consts";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IApp } from "../model";
import { ID } from "~/shared";

const appGql = gql`
query ($id:String!){
  oneApp(where:{
    id:{
      _eq:$id
    }
  }){
    id
    uuid
    title
  }
}
`

export function useQueryApp(id: ID) {
  const params = useMemo(() => ({
    id: id || SYSTEM_APP_ID
  }), [id])
  
  const { data, error, loading } = useQueryOne<IApp>(
    {
      gql: appGql,
      params,
      depEntityNames: ["App"],
    }

  )

  return { app: data?.oneApp, error, loading }
}