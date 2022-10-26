import { gql, useQuery } from "~/enthooks";
import { IPageCategory } from "~/model";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const categoriesGql = gql`
query ($appId:ID!, $device:String!){
  pageCategories(where:{
    _and:[
      {
        app:{
          id:{
            _eq:$appId
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
      uuid 
    }
  }
}
`

export function useQueryCagegories() {
  const { device, appId } = useParams();

  const args = useMemo(() => {
    return {
      gql: categoriesGql,
      params: { device: device, appId },
      depEntityNames: ["PageCategory"]
    }
  }, [device, appId])
  const { data, error, loading } = useQuery<IPageCategory>(args)

  return { categories: data?.pageCategories?.nodes, error, loading }
}