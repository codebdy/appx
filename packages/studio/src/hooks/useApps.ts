import { gql } from "awesome-graphql-client";
import { IApp } from "../model";
import { IQueryResponse } from "./IQueryResponse";
import { useQuery } from "../enthooks/hooks/useQuery";

const appsGql = gql`
query {
  app{
    id
    title
  }
}
`

export function useApps(): IQueryResponse<IApp[]> {
  return useQuery<IApp[]>(appsGql, "App")
}