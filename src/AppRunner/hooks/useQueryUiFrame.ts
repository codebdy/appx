import { gql } from "~/enthooks";
import { useEffect, useMemo } from "react";
import { useQueryOne } from "~/enthooks/hooks/useQueryOne";
import { IUiFrame } from "~/model";
import { useFrameUuid } from "./useFrameUuid";

const pageFrameGql = gql`
query ($uuid:String!, $appId:ID!){
  onePageFrame(where:{
    _and:[
      {
        uuid:{
          _eq:$uuid
        },
        app:{
          id:{
            _eq:$appId
          }
        }
      }
    ]
  }){
    id
    uuid
    title
    schemaJson
  }
}
`
export function useQueryUiFrame(uuid: string | undefined, appId: string | undefined) {
  const input = useMemo(() => (
    {
      gql: uuid && appId && pageFrameGql,
      params: { uuid, appId },
      depEntityNames: ["PageFrame"]
    }
  ), [uuid, appId]);

  const { data, error, loading } = useQueryOne<IUiFrame>(input);

  return { uiFrame: data?.onePageFrame, error, loading }
}