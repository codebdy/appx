import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IComponentAuthConfig, IMenuAuthConfig } from "../../model";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

const authConfigGql = gql`
query ($appUuid:String!){
  componentAuthConfigs(where:{
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
      componentId
    }
  }
}
`

export function useQueryComponentAuthConfigs() {
  const appParams = useAppParams();

  const args = useMemo(() => {
    return {
      gql: authConfigGql,
      params: { appUuid: appParams.app.uuid },
      depEntityNames: ["ComponentAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IComponentAuthConfig>(args)

  return { componentConfigs: data?.componentAuthConfig?.nodes, error, loading }
}