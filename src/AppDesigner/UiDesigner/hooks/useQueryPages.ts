import { gql } from "~/enthooks";
import { useMemo } from "react";
import { useQuery } from "~/enthooks/hooks/useQuery";
import { IPage } from "~/model";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

const pagesGql = gql`
query ($appId:ID!, $device:String!){
  pages(where:{
    _and:[
      {
        app:{
          id:{
            _eq:$appId
          }
        }
      },
      {
        device:{
          _eq:$device
        }
      }
    ]
  },
  orderBy:{
    id:asc
  }
 ){
    nodes{
      id
      device
      title
      categoryUuid
      uuid
    }
  }
}
`

export function useQueryPages() {
  const appParams = useDesignerParams();

  const args = useMemo(() => {
    return {
      gql: pagesGql,
      params: { device: appParams.device, appId: appParams.app.id },
      depEntityNames: ["Page"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IPage>(args)

  return { pages: data?.pages?.nodes, error, loading }
}