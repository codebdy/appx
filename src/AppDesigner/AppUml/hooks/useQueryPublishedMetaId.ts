import { gql } from "../../enthooks";
import { useMemo } from "react";
import { useEdittingAppUuid } from "../../hooks/useEdittingAppUuid";
import { useQueryOne } from "../../enthooks/hooks/useQueryOne";
import { Meta } from "../meta/Meta";

const queryGql = gql`
query ($appUuid:String!) {
  oneMeta(
    where:{
      _and:[
        {
          appUuid:{
            _eq:$appUuid
          }
        },
        {
          status:{
            _eq:"published"
          }
        },
      ]
    }
    ,
    orderBy:[
      {
        id:desc
      }
    ]
  ){
    id
    content
    status
  }
}
`

export function useQueryPublishedMetaId() {
  const appUuid = useEdittingAppUuid();
  const input = useMemo(() => {
    return {
      gql: queryGql,
      depEntityNames: ["Meta"],
      params: { appUuid }
    }
  }, [appUuid])

  const { data, error, loading, refresh } = useQueryOne<Meta>(input)

  return { publishedId: data?.oneMeta?.id, error, loading, refresh }
}