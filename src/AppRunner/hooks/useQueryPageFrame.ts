import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { IPageFrame } from "../../model";
import { usePageFrameId } from "./usePageFrameId";

const pageFrameGql = gql`
query ($id:ID!){
  onePageFrame(where:{
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
export function useQueryPageFrame() {
  const pageFrameId = usePageFrameId();
  const input = useMemo(() => (
    {
      gql: pageFrameId && pageFrameGql,
      params: { pageFrameId },
      depEntityNames: ["PageFrame"]
    }
  ), [pageFrameId]);

  const { data, error, loading } = useQueryOne<IPageFrame>(input);

  return { pageFrame: data?.onePageFrame, error, loading }
}