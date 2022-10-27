import { gql } from "~/enthooks";
import { useQueryOne } from "~/enthooks/hooks/useQueryOne";
import { useMemo } from "react";
import { Device } from "@rxdrag/appx-plugin-sdk";
import { IUserConfig } from "~/model/user";
import { ID } from "~/shared";

const userConfigGql = gql`
query ($appId:ID!, $device:String!, $userId:ID!){
  oneUserConfig(where:{
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
      },
      {
        user:{
          id:{
            _eq:$userId
          }
        }
      }
    ]
  }
 ){
    id
    device
    schemaJson
  }
}
`

export function useQueryUserConfig(appId: ID, device: Device, userId?:ID) {
  const input = useMemo(()=>({
    gql: userId && userConfigGql,
    params: { device: device, appId, userId: userId },
    depEntityNames: ["UserConfig"]
  }), [appId, device, userId]);
  
  const { data, error, loading } = useQueryOne<IUserConfig>(input)

  return { userConfig: data?.oneUserConfig, error, loading }
}