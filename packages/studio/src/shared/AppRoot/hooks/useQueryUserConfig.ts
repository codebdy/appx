import { gql } from "awesome-graphql-client";
import { IUserConfig } from "../../../model";
import { useQueryOne } from "../../../enthooks/hooks/useQueryOne";
import { useMemo } from "react";
import { ID } from "../..";
import { Device } from "@rxdrag/appx-plugin-sdk";

const userConfigGql = gql`
query ($appUuid:String!, $device:String!, $userId:ID!){
  oneUserConfig(where:{
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

export function useQueryUserConfig(appUuid: string, device: Device, userId?:ID) {
  const input = useMemo(()=>({
    gql: userId && userConfigGql,
    params: { device: device, appUuid: appUuid, userId: userId },
    depEntityNames: ["UserConfig"]
  }), [appUuid, device, userId]);
  
  const { data, error, loading } = useQueryOne<IUserConfig>(input)

  return { userConfig: data?.oneUserConfig, error, loading }
}