import { gql } from "awesome-graphql-client";
import { IApp } from "../model";
import { useQuery } from "../enthooks/hooks/useQuery";

const appsGql = gql`
query {
  app{
    id
    title
  }
}
`

export function useApps() {
  return useQuery<IApp>(appsGql, ["App"])
}