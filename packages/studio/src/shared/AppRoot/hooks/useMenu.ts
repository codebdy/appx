import { gql } from "awesome-graphql-client";
import { IMenu } from "../../../model";
import { useAppParams } from "../context";
import { useQueryOne } from "../../../enthooks/hooks/useQueryOne";

const menuGql = gql`
query queryMenu($appUuid:String!, $device:String!){
  oneMenu(where:{
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
    id
    device
    schemaJson
  }
}
`

export function useMenu() {
  const params = useAppParams();

  const { data, error, loading } = useQueryOne<IMenu>(
    {
      gql: menuGql,
      params: { device: params.device, appUuid: params.app.uuid },
      depEntityNames: ["Menu"]
    }
  )

  return { menu: data?.oneMenu, error, loading }
}