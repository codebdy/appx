import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IClassAuthConfig } from "model";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

const authConfigGql = gql`
query ($appUuid:String!){
  classAuthConfigs(where:{
    appUuid:{
      _eq:$appUuid
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
      params: { appUuid: appParams.app.uuid },
      depEntityNames: ["ClassAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IClassAuthConfig>(args)

  return { classAuthConfigs: data?.classAuthConfigs?.nodes, error, loading }
}