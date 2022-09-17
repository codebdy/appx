import { gql } from "awesome-graphql-client";
import { useCallback } from "react";
import { useLazyRequest } from "../../enthooks/hooks/useLazyRequest";
import { ITemplate } from "../../model";
import { ITemplateInput } from "../../model/input";
import { ID } from "../../shared";

const templateGql = gql`
query ($id:ID!){
  oneTemplate(where:{
    id:{
      _eq:$id
    }
  }){
    id
    title
    device
    imageUrl
    schemaJson
  }
}
`

export function useLazyQueryTemplate(): [
  (id: ID) => void,
  {
    template?: ITemplate,
    loading?: boolean,
    error?: Error,
  }
] {
  const [doQuery, { data, error, loading }] = useLazyRequest<ITemplateInput>()

  const query = useCallback((id: ID) => {
    doQuery(templateGql, { id })
  }, [doQuery])

  return [query, { template: data?.oneTemplate, error, loading }]
}