import { gql, useQuery } from "~/enthooks";
import { IPageCategory } from "~/model";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const categoriesGql = gql`
query ($appUuid:String!, $device:String!){
  pageCategories(where:{
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
  const { device, appUuid } = useParams();

  const args = useMemo(() => {
    return {
      gql: categoriesGql,
      params: { device: device, appUuid: appUuid },
      depEntityNames: ["PageCategory"]
    }
  }, [device, appUuid])
  const { data, error, loading } = useQuery<IPageCategory>(args)

  return { categories: data?.pageCategories?.nodes, error, loading }
}