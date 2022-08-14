import { gql } from "awesome-graphql-client";
import { IApp } from "../model";
import { useQuery } from "../enthooks/hooks/useQuery";

const appsGql = gql`
query {
  app{
    id
    uuid
    title
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