import { useMemo } from "react";
import { gql, useQueryOne } from "~/enthooks";
import { IPage } from "~/model";

const pageGql = gql`
query ($uuid:String!){
  onePage(where:{
    uuid:{
      _eq:$uuid
    }
  }){
    id
    uuid
    title
    schemaJson
  }
}
`

export function useQueryPageByUuid(uuid?: string) {
  const input = useMemo(() => (
    {
      gql: uuid && pageGql,
      params: { uuid },
      depEntityNames: ["Page"]
    }
  ), [uuid]);

  const { data, error, loading } = useQueryOne<IPage>(input);

  return { page: data?.onePage, error, loading }
}