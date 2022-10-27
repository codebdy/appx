import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQueryOne } from "~/enthooks/hooks/useQueryOne";
import { IApp, IUiFrame } from "~/model";
import { useFrameUuid } from "./useFrameUuid";

const pageFrameGql = gql`
query ($uuid:String!){
  onePageFrame(where:{
    uuid:{
      _eq:$uuid
    }
  }){
    id
    uuid
    title
    schemaJson
  }
}
`
export function useQueryPageFrame() {
  const uuid = useFrameUuid();
  const input = useMemo(() => (
    {
      gql: uuid && pageFrameGql,
      params: { uuid },
      depEntityNames: ["PageFrame"]
    }
  ), [uuid]);

  const { data, error, loading } = useQueryOne<IUiFrame>(input);

  return { pageFrame: data?.onePageFrame, error, loading }
}