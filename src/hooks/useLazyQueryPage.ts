import { gql } from "../enthooks";
import { useCallback } from "react";
import { useLazyRequest } from "../enthooks/hooks/useLazyRequest";
import { IPage } from "../model";
import { IPageInput } from "../model/input";
import { ID } from "../shared";

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

export function useLazyQueryPage(): [
  (id: ID) => void,
  {
    page?: IPage,
    loading?: boolean,
    error?: Error,
  }
] {
  const [doQuery, { data, error, loading }] = useLazyRequest<IPageInput>()

  const query = useCallback((id: ID) => {
    doQuery(pageGql, { id })
  }, [doQuery])

  return [query, { page: data?.onePage, error, loading }]
}