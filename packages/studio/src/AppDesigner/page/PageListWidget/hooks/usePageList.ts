import { gql } from "awesome-graphql-client";
import { useQueryOne } from "../../../../enthooks/hooks/useQueryOne";
import { IPageList } from "../../../../model";
import { useDesignerParams } from "../../../context";

const listGql = gql`
query queryPageList($appUuid:String!, $device:String!){
  onePageList(where:{
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
  }){
    id
    device
    app{
      uuid
    }
    schemaJson
  }
}
`

export function usePageList() {
  const params = useDesignerParams();

  const { data, error, loading } = useQueryOne<IPageList>(
    listGql,
    { device: params.device, appUuid: params.app.uuid },
    ["PageList"]
  )

  return { pageList: data?.onePageList, error, loading }
}