import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IPage } from "../../model";
import { useAppParams } from "../../shared/AppRoot/context";

const pagesGql = gql`
query queryPages($appUuid:String!, $device:String!){
  page(where:{
    _and:[
      {
        app:{
          uuid:{
            _eq:$appUuid
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
      category{
        id
      }
    }
  }
}
`

export function useQueryPages() {
  const appParams = useAppParams();

  const args = useMemo(() => {
    return {
      gql: pagesGql,
      params: { device: appParams.device, appUuid: appParams.app.uuid },
      depEntityNames: ["Page"]
    }
  }, [appParams])

  const { data, error, loading } = useQuery<IPage>(args)

  return { pages: data?.page?.nodes, error, loading }
}