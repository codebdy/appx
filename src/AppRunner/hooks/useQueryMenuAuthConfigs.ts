import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IMenuAuthConfig } from "~/model";
import { ID } from "~/shared";
import { Device } from "@rxdrag/appx-plugin-sdk";

const authConfigGql = gql`
query ($appId:ID!, $device:String!){
  menuAuthConfigs(where:{
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
      menuItemUuid
    }
  }
}
`

export function useQueryMenuAuthConfigs(appId?: ID, device?: Device) {

  const args = useMemo(() => {
    return {
      gql: appId && device && authConfigGql,
      params: { appId, device },
      depEntityNames: ["MenuAuthConfig"]
    }
  }, [appId, device])

  const { data, error, loading } = useQuery<IMenuAuthConfig>(args)

  return { menuAuthConfigs: data?.menuAuthConfigs?.nodes, error, loading }
}