import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IPageFrame } from "~/model";

const pageFramesGql = gql`
query ($device:String!, $appId:ID!){
  pageFrames(
    where:{
      _and:[
        {
          app:{
            id:{
              _eq:$appId
            }
          }
        },
        {
          device:{
            _eq:$device
          }
        }
      ]
    }
  ){
    nodes{
      id 
      title 
      device 
      imageUrl
      uuid
    }
    total
  }
}
`

export function useQueryPageFrames() {
  const params = useAppParams();

  const args = useMemo(() => {
    return {
      gql: pageFramesGql,
      params: { device: params.device, appId: params.app.id },
      depEntityNames: ["PageFrame"]
    }
  }, [params])

  const { data, error, loading } = useQuery<IPageFrame>(args)

  return { pageFrames: data?.pageFrames?.nodes, error, loading }
}