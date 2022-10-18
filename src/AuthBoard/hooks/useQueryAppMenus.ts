import { gql } from "../../enthooks";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { IMenu } from "../../model";

const menuGql = gql`
query ($appUuid:String!){
  menus(where:{
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

export function useQueryAppMenus() {
  const appUuid = useEdittingAppUuid();

  const input = useMemo(() => ({
    gql: menuGql,
    params: { appUuid },
    depEntityNames: ["Menu"]
  }), [appUuid]);

  const { data, error, loading } = useQuery<IMenu>(input)

  return { menus: data?.menus?.nodes, error, loading }
}