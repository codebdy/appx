import { gql } from "awesome-graphql-client";
import { IPage } from "../../../../model";
import { useDesignerParams } from "../../../context";
import { useQuery } from "../../../../enthooks/hooks/useQuery";

const pagesGql = gql`
query queryPages($appUuid:String!, $device:String!){
  page(where:{
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
    title
  }
}
`

export function usePages() {
  const params = useDesignerParams();

  const { data, error, loading } = useQuery<IPage>(
    pagesGql,
    { device: params.device, appUuid: params.app.uuid },
    ["Page"]
  )

  return { pages: data?.page, error, loading }
}