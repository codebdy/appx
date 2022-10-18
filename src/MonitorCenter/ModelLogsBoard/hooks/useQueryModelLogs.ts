import { gql } from "../../../enthooks";
import { useQuery } from "../../../enthooks/hooks/useQuery";
import { useEffect, useMemo } from "react";
import { IModelLog } from "../../../model/log";

export function useQueryModelLogs(
  limit: number = 20,
) {
  const logsGql = useMemo(() => {
    return gql`
query {
  modelLogs(
    orderBy:{
      id:desc
    },
    limit:${limit}
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
  }, [limit])

  const queryParams = useMemo(() => {
    return {
      gql: logsGql,
      depEntityNames: ["ModelLog"]
    }
  }, [logsGql])
  const { data, error, loading, refresh } = useQuery<IModelLog>(queryParams)
  console.log("哈哈哈", data)

  useEffect(()=>{
    refresh()
  }, [logsGql])

  return { logs: data?.modelLogs?.nodes, total: data?.modelLogs?.total, error, loading }
}