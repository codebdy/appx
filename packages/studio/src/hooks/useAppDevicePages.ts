import { ID } from "../shared";
import { Device, IApp } from "../model";
import { gql } from "awesome-graphql-client";
import { useQueryOne } from "../enthooks/hooks/useQueryOne";

const appsGql = gql`
query queryApp($device:DeviceEnumComparisonExp!, id:ID!){
  oneApp(where:{
    id:{
      _eq:$id
    }
  }){
    id
    title
    pages(where:{
      device:{
        _eq:$device
      }
    }){
      id
      schema
      title
    }
  }
}
`

export function useAppDevicePages(id: ID, device: Device) {
  return useQueryOne<IApp>(
    {
      gql: appsGql,
      params: { id, device },
      depEntityNames: ["App", "Page"]
    })
}