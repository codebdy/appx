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

export function useQueryPage(id?: string) {
  const { data, error, loading } = useQueryOne<IPage>(
    {
      gql: id && pageGql,
      params: { id },
      depEntityNames: ["Page"]
    }
  )

  return { page: data?.onePage, error, loading }
}