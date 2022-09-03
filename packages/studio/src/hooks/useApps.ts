import { gql } from "awesome-graphql-client";
import { IApp } from "../model";
import { useQuery } from "../enthooks/hooks/useQuery";

const appsGql = gql`
query {
  app{
    nodes{
      id
      uuid
      title      
    }
    total
  }
}
`

export function useApps() {
  return useQuery<IApp>(
    {
      gql: appsGql,
      depEntityNames: ["App"]
    }
  )
}