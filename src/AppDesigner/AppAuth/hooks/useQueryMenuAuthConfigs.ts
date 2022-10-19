import { gql } from "../../enthooks";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IMenuAuthConfig } from "../../model";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

const authConfigGql = gql`
query ($appUuid:String!){
  menuAuthConfigs(where:{
    appUuid:{
      _eq:$appUuid
    }
  }
 ){
    nodes{
      id
      appUuid
      roleId
      device
      refused
      menuItemUuid
    }
  }
}
`

export function useQueryMenuAuthConfigs() {
  const appParams = useAppParams();

  const args = useMemo(() => {
    return {
      gql: authConfigGql,
      params: { appUuid: appParams.app.uuid },
      depEntityNames: ["MenuAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IMenuAuthConfig>(args)

  return { menuConfigs: data?.menuAuthConfigs?.nodes, error, loading }
}