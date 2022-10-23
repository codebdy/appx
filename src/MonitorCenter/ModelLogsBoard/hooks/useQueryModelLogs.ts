import { gql } from "~/enthooks";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { useEffect, useMemo } from "react";
import { IModelLog } from "~/model/log";

export function useQueryModelLogs(
  offset: number,
  limit: number = 20,
) {
  const logsGql = useMemo(() => {
    return gql`
query {
  modelLogs(
    orderBy:{
      id:desc
    },
    offset:${offset},
    limit:${limit}
  ){
    nodes{
      id
      ip
      user{
        id
        name
      }
      app{
        id
      }
      createdAt
      operateType
      classUuid
      className
      gql
      result
      message
    }
    total
  }
}
`
  }, [limit, offset])

  const queryParams = useMemo(() => {
    return {
      gql: logsGql,
      depEntityNames: ["ModelLog"]
    }
  }, [logsGql])
  const { data, error, loading, refresh, revalidating } = useQuery<IModelLog>(queryParams)
  useEffect(() => {
    refresh()
  }, [logsGql])

  return { logs: data?.modelLogs?.nodes, total: data?.modelLogs?.total, error, loading: loading || revalidating }
}