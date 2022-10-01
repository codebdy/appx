import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { IQueryInput } from "../../enthooks/hooks/IQueryInput";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IPluginInfo } from "../../model";

const pluginsGql = gql`
query ($appUuid:String!){
  pluginInfos(where:{
    appUuid:{
      _eq:$appUuid
    }
  }){
    nodes{
      id
      appUuid
      url 
      title
      pluginId
      type   
      description
      version 
    }
    total
  }
}
`

export function useQueryPluginInfos(appUuid: string) {
  const queryParams = useMemo((): IQueryInput => {
    return {
      gql: appUuid && pluginsGql,
      depEntityNames: ["PluginInfo"],
      params: { appUuid },

    }
  }, [appUuid])
  return useQuery<IPluginInfo>(queryParams)
}