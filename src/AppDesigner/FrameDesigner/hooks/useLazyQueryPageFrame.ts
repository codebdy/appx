import { gql } from "~/enthooks";
import { useCallback } from "react";
import { useLazyRequest } from "~/enthooks/hooks/useLazyRequest";
import { IPageFrame } from "~/model";
import { IPageFrameInput } from "~/model";
import { ID } from "~/shared";

const pageFrameGql = gql`
query ($id:ID!){
  onePageFrame(where:{
    id:{
      _eq:$id
    }
  }){
    id
    title
    device
    imageUrl
    schemaJson
  }
}
`

export function useLazyQueryPageFrame(): [
  (id: ID) => void,
  {
    pageFrame?: IPageFrame,
    loading?: boolean,
    error?: Error,
  }
] {
  const [doQuery, { data, error, loading }] = useLazyRequest<IPageFrameInput>()

  const query = useCallback((id: ID) => {
    doQuery(pageFrameGql, { id })
  }, [doQuery])

  return [query, { pageFrame: data?.onePageFrame, error, loading }]
}