import { gql } from "../enthooks";
import { IApp } from "../model";
import { useQuery } from "../enthooks/hooks/useQuery";
import { useMemo } from "react";

const appsGql = gql`
query {
  apps{
    nodes{
      id
      uuid
      title
      imageUrl 
    }
    total
  }
}
`

export function useQueryApps() {
  const queryParams = useMemo(() => {
    return {
      gql: appsGql,
      depEntityNames: ["App"]
    }
  }, [])
  return useQuery<IApp>(queryParams)
}