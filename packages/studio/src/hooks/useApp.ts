import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { SYSTEM_APP_UUID } from "../consts";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IApp } from "../model";

const appGql = gql`
query queryApp($uuid:String!){
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

export function useApp(uuid: string) {
  const params = useMemo(() => ({
    uuid: uuid || SYSTEM_APP_UUID
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