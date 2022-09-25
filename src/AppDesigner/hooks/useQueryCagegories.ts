import { gql } from "awesome-graphql-client";
import { IPageCategory } from "../../model";
import { useAppParams } from "../../shared/AppRoot/context";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { useMemo } from "react";

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

  const args = useMemo(() => {
    return {
      gql: categoriesGql,
      params: { device: params.device, appUuid: params.app.uuid },
      depEntityNames: ["PageCategory"]
    }
  }, [params])
  const { data, error, loading } = useQuery<IPageCategory>(args)

  return { categories: data?.pageCategory?.nodes, error, loading }
}