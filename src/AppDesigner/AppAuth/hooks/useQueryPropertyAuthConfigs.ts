import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { IPropertyAuthConfig } from "~/model";

const authConfigGql = gql`
query ($appId:ID!){
  propertyAuthConfigs(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
  }
 ){
    nodes{
      id
      canRead
      readExpression
      canUpdate
      updateExpression
      role{
        id
      }
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
      params: { appId: appParams.app.id },
      depEntityNames: ["PropertyAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IPropertyAuthConfig>(args)

  return { propertyAuthConfigs: data?.propertyAuthConfigs?.nodes, error, loading }
}