import { gql } from "~/enthooks";
import { useCallback } from "react";
import { useLazyRequest } from "~/enthooks/hooks/useLazyRequest";
import { IUiFrame } from "~/model";
import { IUiFrameInput } from "~/model";
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
    uuid
  }
}
`

export function useLazyQueryPageFrame(): [
  (id: ID) => void,
  {
    pageFrame?: IUiFrame,
    loading?: boolean,
    error?: Error,
  }
] {
  const [doQuery, { data, error, loading }] = useLazyRequest<IUiFrameInput>()

  const query = useCallback((id: ID) => {
    doQuery(pageFrameGql, { id })
  }, [doQuery])

  return [query, { pageFrame: data?.onePageFrame, error, loading }]
}