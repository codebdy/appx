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
  return useQuery<IApp>(
    {
      gql: appsGql,
      depEntityNames: ["App"]
    }
  )
}