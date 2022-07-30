import { gql } from "awesome-graphql-client";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IApp } from "../model";
import { ID } from "../shared";

const appsGql = gql`
query queryApp($id:ID!){
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

export function useApp(id: ID){
  return useQueryOne<IApp>(appsGql, {id}, ["App"])
}