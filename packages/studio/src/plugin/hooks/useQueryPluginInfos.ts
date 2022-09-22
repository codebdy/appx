import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IPluginInfo } from "../../model";

const pluginsGql = gql`
query {
  pluginInfos{
    nodes{
      id
      appUuid
      url 
      title
      pluginId
      type    
    }
    total
  }
}
`

export function useQueryPluginInfos() {
  const queryParams = useMemo(() => {
    return {
      gql: pluginsGql,
      depEntityNames: ["PluginInfo"]
    }
  }, [])
  return useQuery<IPluginInfo>(queryParams)
}