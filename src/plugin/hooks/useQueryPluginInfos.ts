import { gql } from "~/enthooks";
import { useMemo } from "react";
import { IQueryInput } from "~/enthooks/hooks/IQueryInput";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IPluginInfo } from "~/model";
import { ID } from "~/shared";

const pluginsGql = gql`
query ($appId:ID!){
  pluginInfos(where:{
    app:{
      id:{
        _eq:$appId
      }
    }
  }){
    nodes{
      id
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

export function useQueryPluginInfos(appId: ID) {
  const queryParams = useMemo((): IQueryInput => {
    return {
      gql: appId && pluginsGql,
      depEntityNames: ["PluginInfo"],
      params: { appId },

    }
  }, [appId])
  return useQuery<IPluginInfo>(queryParams)
}