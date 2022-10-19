import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IPropertyAuthConfig } from "model";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";

const authConfigGql = gql`
query ($appUuid:String!){
  propertyAuthConfigs(where:{
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
      classUuid
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
      depEntityNames: ["PropertyAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IPropertyAuthConfig>(args)

  return { propertyAuthConfigs: data?.propertyAuthConfigs?.nodes, error, loading }
}