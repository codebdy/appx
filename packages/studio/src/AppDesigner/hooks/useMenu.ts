import { gql } from "awesome-graphql-client";
import { IMenu } from "../../model";
import { useDesignerParams } from "../context";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";

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
  const params = useDesignerParams();

  const { data, error, loading } = useQueryOne<IMenu>(
    menuGql,
    { device: params.device, appUuid: params.app.uuid },
    ["Menu"]
  )

  return { menu: data?.oneMenu, error, loading }
}