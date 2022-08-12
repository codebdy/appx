import { gql } from "awesome-graphql-client";
import { IPageCategory } from "../../../model";
import { useAppParams } from "../context";
import { useQuery } from "../../../enthooks/hooks/useQuery";

const categoriesGql = gql`
query queryCategories($appUuid:String!, $device:String!){
  pageCategory(where:{
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
  },
  orderBy:{
    id:asc
  }
 ){
    id
    device
    title
  }
}
`

export function useCagegories() {
  const params = useAppParams();

  const { data, error, loading } = useQuery<IPageCategory>(
    categoriesGql,
    { device: params.device, appUuid: params.app.uuid },
    ["PageCategory"]
  )

  return { categories: data?.pageCategory, error, loading }
}