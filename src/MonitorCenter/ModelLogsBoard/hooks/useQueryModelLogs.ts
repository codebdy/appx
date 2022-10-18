import { gql } from "../../../enthooks";
import { useQuery } from "../../../enthooks/hooks/useQuery";
import { useMemo } from "react";
import { IModelLog } from "../../../model/log";

const logsGql = gql`
query {
  modelLogs(
    orderBy:{
      id:asc
    }
  ){
    nodes{
      id
      ip
      user{
        id
        name
      }
      appUuid
      createdAt
      operateType
      classUuid
      className
      gql
      result
    }
    total
  }
}
`

export function useQueryModelLogs() {
  const queryParams = useMemo(() => {
    return {
      gql: logsGql,
      depEntityNames: ["ModelLog"]
    }
  }, [])
  const { data, error, loading } = useQuery<IModelLog>(queryParams)

  return { logs: data?.modelLogs?.nodes, total: data?.modelLogs?.total, error, loading }
}