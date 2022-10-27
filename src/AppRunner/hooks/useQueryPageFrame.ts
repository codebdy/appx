import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQueryOne } from "~/enthooks/hooks/useQueryOne";
import { IUiFrame } from "~/model";
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
      params: { id: pageFrameId },
      depEntityNames: ["PageFrame"]
    }
  ), [pageFrameId]);

  const { data, error, loading } = useQueryOne<IUiFrame>(input);

  return { pageFrame: data?.onePageFrame, error, loading }
}