import { gql } from "~/enthooks";
import { useEffect, useMemo } from "react";
import { useQueryOne } from "~/enthooks/hooks/useQueryOne";
import { IUiFrame } from "~/model";
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
export function useQueryUiFrame(uuid?:string) {
  const input = useMemo(() => (
    {
      gql: uuid && pageFrameGql,
      params: { uuid },
      depEntityNames: ["PageFrame"]
    }
  ), [uuid]);

  const { data, error, loading } = useQueryOne<IUiFrame>(input);
 
  return { uiFrame: data?.onePageFrame, error, loading }
}