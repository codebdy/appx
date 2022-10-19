import { gql } from "../../enthooks";
import { IPageCategory } from "../../model";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { useMemo } from "react";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";

const categoriesGql = gql`
query ($appUuid:String!){
  pageCategories(where:{
    app:{
      uuid:{
        _eq:$appUuid
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
    }
  }
}
`

export function useQueryAppPageCagegories() {
  const appUuid = useEdittingAppUuid()

  const args = useMemo(() => {
    return {
      gql: categoriesGql,
      params: { appUuid },
      depEntityNames: ["PageCategory"]
    }
  }, [appUuid])
  const { data, error, loading } = useQuery<IPageCategory>(args)

  return { categories: data?.pageCategories?.nodes, error, loading }
}