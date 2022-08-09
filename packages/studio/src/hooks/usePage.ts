import { gql } from "awesome-graphql-client";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IPage } from "../model";

const pageGql = gql`
query queryPage($id:ID!){
  onePage(where:{
    id:{
      _eq:$id
    }
  }){
    id
    title
    schemaJson
  }
}
`

export function usePage(id: string) {
  const { data, error, loading } = useQueryOne<IPage>(pageGql, { id }, ["Page"])

  return { page: data?.onePage, error, loading }
}