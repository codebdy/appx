import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { IMenuAuthConfig } from "~/model";

const authConfigGql = gql`
query ($appId:ID!){
  menuAuthConfigs(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
  }
 ){
    nodes{
      id
      role{
        id
      }
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
      params: { appId: appParams.app.id },
      depEntityNames: ["MenuAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IMenuAuthConfig>(args)

  return { menuConfigs: data?.menuAuthConfigs?.nodes, error, loading }
}