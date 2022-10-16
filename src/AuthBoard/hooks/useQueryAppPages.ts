import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { IMenu, IPage } from "../../model";

const pagesGql = gql`
query ($appUuid:String!){
  pages(where:{
    app:{
      uuid:{
        _eq:$appUuid
      }
    }
  }
 ){
    nodes{
      id
      device
      schemaJson      
    }
  }
}
`

export function useQueryAppPages() {
  const appUuid = useEdittingAppUuid();

  const input = useMemo(() => ({
    gql: pagesGql,
    params: { appUuid },
    depEntityNames: ["Page"]
  }), [appUuid]);

  const { data, error, loading } = useQuery<IPage>(input)

  return { pages: data?.menus?.nodes, error, loading }
}