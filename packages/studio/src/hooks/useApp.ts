import { gql } from "awesome-graphql-client";
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
    config{
      id
      schemaJson
    }
  }
}
`

export function useApp(uuid: string) {
  const { data, error, loading } = useQueryOne<IApp>(appGql, { uuid }, ["App", "AppConfig"])

  return { app: data?.oneApp, error, loading }
}