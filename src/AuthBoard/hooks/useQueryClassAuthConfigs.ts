import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IPage } from "../../model";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

const pagesGql = gql`
query ($appUuid:String!){
  classAuthConfigs(where:{
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
      gql: pagesGql,
      params: { device: appParams.device, appUuid: appParams.app.uuid },
      depEntityNames: ["ClassAuthConfig"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IPage>(args)

  return { classAuthConfigs: data?.classAuthConfigs?.nodes, error, loading }
}