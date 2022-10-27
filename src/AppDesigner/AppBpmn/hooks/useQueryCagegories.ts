import { gql, useQuery } from "~/enthooks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { IProcessCategory } from "~/model";

const categoriesGql = gql`
query ($appId:ID!){
  processCategories(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
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
  const { appId } = useParams();

  const args = useMemo(() => {
    return {
      gql: categoriesGql,
      params: { appId },
      depEntityNames: ["ProcessCategory"]
    }
  }, [appId])
  const { data, error, loading } = useQuery<IProcessCategory>(args)

  return { categories: data?.pageCategories?.nodes, error, loading }
}