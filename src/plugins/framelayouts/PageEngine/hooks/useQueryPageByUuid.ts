import { useMemo } from "react";
import { gql, useQueryOne } from "~/enthooks";
import { IPage } from "~/model";
import { ID } from "~/shared";

const pageGql = gql`
query ($uuid:String!, $appId:ID!){
  onePage(where:{
    _and:[
      {
        uuid:{
          _eq:$uuid
        }
      },
      {
        app:{
          id:{
            _eq:$appId
          }
        }
      }
    ]
  }){
    id
    uuid
    title
    schemaJson
  }
}
`

export function useQueryPageByUuid(appId: ID, uuid?: string) {
  const input = useMemo(() => (
    {
      gql: uuid && pageGql,
      params: { uuid, appId },
      depEntityNames: ["Page"]
    }
  ), [appId, uuid]);

  const { data, error, loading } = useQueryOne<IPage>(input);
  return { page: data?.onePage, error, loading }
}