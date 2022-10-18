import { gql } from "../../../enthooks";
import { useQuery } from "../../../enthooks/hooks/useQuery";
import { useMemo } from "react";
import { IModelLog } from "../../../model/log";

export function useQueryModelLogs() {
  const logsGql = useMemo(() => {
    return gql`
query {
  modelLogs(
    orderBy:{
      id:desc
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
  }, [])

  const queryParams = useMemo(() => {
    return {
      gql: logsGql,
      depEntityNames: ["ModelLog"]
    }
  }, [logsGql])
  const { data, error, loading } = useQuery<IModelLog>(queryParams)

  return { logs: data?.modelLogs?.nodes, total: data?.modelLogs?.total, error, loading }
}