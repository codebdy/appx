import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { ITemplate } from "../../model";

const templatesGql = gql`
query ($device:String!){
  template(
    where:{
      device:{
        _eq:$device
      }
    }
  ){
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

export function useQueryTemplates(device: string) {
  const args = useMemo(() => {
    return {
      gql: templatesGql,
      depEntityNames: ["Template"],
      params: {
        device
      }
    }
  }, [device])
  return useQuery<ITemplate>(args)
}