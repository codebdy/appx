import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useAppParams } from "../../shared/AppRoot/context";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IPageFrame } from "../../model";

const pageFramesGql = gql`
query ($device:String!, $appUuid:String!){
  pageFrame(
    where:{
      _and:[
        {
          app:{
            uuid:{
              _eq:$appUuid
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
    }
    total
  }
}
`

export function useQueryPageFrames(device: string) {
  const params = useAppParams();

  const args = useMemo(() => {
    return {
      gql: pageFramesGql,
      params: { device: params.device, appUuid: params.app.uuid },
      depEntityNames: ["PageFrame"]
    }
  }, [device])

  const { data, error, loading } = useQuery<IPageFrame>(args)

  return { pageFrames: data?.pageFrame?.nodes, error, loading }
}