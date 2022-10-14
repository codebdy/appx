import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IPropertyAuthConfig } from "../../model";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

const authConfigGql = gql`
query ($appUuid:String!){
  properyAuthConfigs(where:{
    appUuid:{
      _eq:$appUuid
    }
  }
 ){
    nodes{
      id
      canRead
      readExpression
      canUpdate
      updateExpression
      appUuid
      roleId
      propertyUuid
    }
  }
}
`

export function useQueryPropertyAuthConfigs() {
  const appParams = useAppParams();

  const args = useMemo(() => {
    return {
      gql: authConfigGql,
      params: { appUuid: appParams.app.uuid },
      depEntityNames: ["ProperyAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IPropertyAuthConfig>(args)

  return { properyAuthConfigs: data?.properyAuthConfigs?.nodes, error, loading }
}