import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../enthooks/hooks/useQuery";
import { ITemplate } from "../model";

const templatesGql = gql`
query{
  template{
    nodes{
      id 
      title 
      device 
      imageUrl
    }
    total
  }
}
`

export function useQueryAllTemplates() {
  const args = useMemo(() => {
    return {
      gql: templatesGql,
      depEntityNames: ["Template"],
    }
  }, [])
  return useQuery<ITemplate>(args)
}