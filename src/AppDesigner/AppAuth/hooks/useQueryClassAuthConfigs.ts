import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { IClassAuthConfig } from "~/model";

const authConfigGql = gql`
query ($appId:ID!){
  classAuthConfigs(where:{
    appUuid:{
      _eq:$appId
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
      canCreate
      createExpression
      appUuid
      roleId
      classUuid
    }
  }
}
`

export function useQueryClassAuthConfigs() {
  const appParams = useAppParams();

  const args = useMemo(() => {
    return {
      gql: authConfigGql,
      params: { appId: appParams.app.id },
      depEntityNames: ["ClassAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IClassAuthConfig>(args)

  return { classAuthConfigs: data?.classAuthConfigs?.nodes, error, loading }
}