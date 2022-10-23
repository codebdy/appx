import { gql } from "~/enthooks";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { useEffect, useMemo } from "react";
import { IBusinessLog, IModelLog } from "~/model/log";

export function useQueryBusinessLogs(
  offset: number,
  limit: number = 20,
) {
  const logsGql = useMemo(() => {
    return gql`
query {
  businessLogs(
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
      message
      result
    }
    total
  }
}
`
  }, [limit, offset])

  const queryParams = useMemo(() => {
    return {
      gql: logsGql,
      depEntityNames: ["BusinessLog"]
    }
  }, [logsGql])
  const { data, error, loading, refresh, revalidating } = useQuery<IBusinessLog>(queryParams)
  useEffect(() => {
    refresh()
  }, [logsGql])

  return { logs: data?.businessLogs?.nodes, total: data?.businessLogs?.total, error, loading: loading || revalidating }
}