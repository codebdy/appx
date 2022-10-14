import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IClassAuthConfig, IPage, IProperyAuthConfig } from "../../model";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

const authConfigGql = gql`
query ($appUuid:String!){
  properyAuthConfig(where:{
    app:{
      uuid:{
        _eq:$appUuid
      }
    }
  }
 ){
    nodes{
      id
      expanded
      canRead
      readExpression
      canUpdate
      updateExpression
      canDelete
      deleteExpression
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

  const { data, error, loading } = useQuery<IProperyAuthConfig>(args)

  return { classAuthConfigs: data?.classAuthConfigs?.nodes, error, loading }
}