import { gql } from "awesome-graphql-client";
import { useQueryOne } from "../../../../enthooks/hooks/useQueryOne";
import { IPageList } from "packages/studio/src/model";
import { useDesignerParams } from "../../../context";

const appsGql = gql`
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

  const { data, error, loading } = useQueryOne<IPageList>(appsGql, { ...params }, ["PageList"])

  return { pageList: data?.onePageList, error, loading }
}