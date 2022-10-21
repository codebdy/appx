import { Device } from "@rxdrag/appx-plugin-sdk";
import { gql } from "../enthooks";
import { useMemo } from "react";
import { SYSTEM_APP_ID } from "../consts";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";
import { IAppDeviceConfig } from "../model";

const configGql = gql`
query ($appUuid:String, $device:String){
  oneAppDeviceConfig(where:{
    _and:[
      {
        appUuid:{
          _eq:$appUuid
        }
      },
      {
        device:{
          _eq:$device
        }
      }
    ]
  }){
    id
    appUuid
    device
    schemaJson
  }
}
`

export function useQueryAppDeviceConfig(appUuid: string, device: Device) {
  const input = useMemo(() => ({
    gql: configGql,
    params: { appUuid: appUuid || SYSTEM_APP_ID, device },
    depEntityNames: ["AppDeviceConfig"]
  }), [appUuid, device])
  const { data, error, loading } = useQueryOne<IAppDeviceConfig>(input)
  return { deviceConfig: data?.oneAppDeviceConfig, error, loading }
}