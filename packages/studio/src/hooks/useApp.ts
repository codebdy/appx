import { gql } from "awesome-graphql-client";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IApp } from "../model";

const appsGql = gql`
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
  const { data, error, loading } = useQueryOne<IApp>(appsGql, { uuid }, ["App"])

  return { app: data?.oneApp, error, loading }
}