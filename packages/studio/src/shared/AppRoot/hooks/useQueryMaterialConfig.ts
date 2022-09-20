import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQueryOne } from "../../../enthooks/hooks/useQueryOne";
import { IMaterialConfig } from "../../../model";
import { Device } from "../../../plugin-sdk/model";

const materialConfigGql = gql`
query ($appUuid:String!, $device:String!){
  oneMaterialConfig(where:{
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
  }
 ){
    id
    appUuid
    device
    schemaJson
  }
}
`

export function useQueryMaterialConfig(appUuid: string, device: Device){
  const input = useMemo(()=>({
    gql: appUuid && materialConfigGql,
    params: { device: device, appUuid: appUuid },
    depEntityNames: ["MaterialConfig"]
  }), [appUuid, device]);
  
  const { data, error, loading } = useQueryOne<IMaterialConfig>(input)

  return { materialConfig: data?.oneMaterialConfig, error, loading }
}