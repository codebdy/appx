import { gql } from "awesome-graphql-client";
import { IApp } from "../model";
import { useQuery } from "../enthooks/hooks/useQuery";
import { useMemo } from "react";

const appsGql = gql`
query {
  app{
    nodes{
      id
      uuid
      title
      imageUrl 
      templates{
        id
        device
      }     
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