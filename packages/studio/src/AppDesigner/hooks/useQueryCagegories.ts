import { gql } from "awesome-graphql-client";
import { IPageCategory } from "../../model";
import { useAppParams } from "../../shared/AppRoot/context";
import { useQuery } from "../../enthooks/hooks/useQuery";

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
    nodes{
      id
      device
      title      
    }
  }
}
`

export function useQueryCagegories() {
  const params = useAppParams();

  const { data, error, loading } = useQuery<IPageCategory>(
    {
      gql: categoriesGql,
      params: { device: params.device, appUuid: params.app.uuid },
      depEntityNames: ["PageCategory"]
    }
  )

  return { categories: data?.pageCategory?.nodes, error, loading }
}