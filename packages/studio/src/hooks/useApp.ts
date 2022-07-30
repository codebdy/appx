import { gql } from "awesome-graphql-client";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IApp } from "../model";
import { ID } from "../shared";

const appsGql = gql`
query queryApp($id:ID!){
  app(where:{
    id:{
      _eq:$id
    }
  }){
    id
    title
  }
}
`

export function useApp(id: ID){
  return useQueryOne<IApp>(appsGql, {id}, "App")
}