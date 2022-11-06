import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IComponentAuthConfig } from "~/model";
import { ID } from "~/shared";
import { Device } from "@rxdrag/appx-plugin-sdk";

const authConfigGql = gql`
query ($appId:ID!, $device:String!){
  componentAuthConfigs(where:{
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
      roleId
      device
      refused
      componentId
    }
  }
}
`

export function useQueryComponentAuthConfigs(appId?:ID, device?:Device) {

  const args = useMemo(() => {
    return {
      gql: appId && device && authConfigGql,
      params: { appId, device },
      depEntityNames: ["ComponentAuthConfig"]
    }
  }, [appId, device])

  const { data, error, loading } = useQuery<IComponentAuthConfig>(args)

  return { comAuthConfigs: data?.componentAuthConfigs?.nodes, error, loading }
}