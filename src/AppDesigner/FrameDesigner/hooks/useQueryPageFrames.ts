import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IUiFrame } from "~/model";

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
  const params = useDesignerParams();

  const args = useMemo(() => {
    return {
      gql: pageFramesGql,
      params: { device: params.device, appId: params.app.id },
      depEntityNames: ["PageFrame"]
    }
  }, [params])

  const { data, error, loading } = useQuery<IUiFrame>(args)

  return { pageFrames: data?.pageFrames?.nodes, error, loading }
}