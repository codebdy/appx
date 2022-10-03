import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { IProcess } from "../../model/process";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { useAppParams } from "../../plugin-sdk/contexts/appRoot";

const processesGql = gql`
query ($appId:ID!){
  processes(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
  },
  orderBy:{
    id:asc
  }
 ){
    nodes{
      id
      name
      type
    }
  }
}
`

export function useQueryProcesses() {
  const appParams = useAppParams();

  const args = useMemo(() => {
    return {
      gql: processesGql,
      params: { device: appParams.device, appId: appParams.app.id },
      depEntityNames: ["Process"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IProcess>(args)

  return { processes: data?.processes?.nodes, error, loading }
}