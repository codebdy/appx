import { gql } from "awesome-graphql-client";
import { useMemo } from "react";
import { useQuery } from "../../enthooks/hooks/useQuery";
import { IRole } from "../../model";

const rolesGql = gql`
query {
  roles{
    nodes{
      id
      name
    }
  }
}
`

export function useQueryRoles() {
  const args = useMemo(() => {
    return {
      gql: rolesGql,
      depEntityNames: ["Role"]
    }
  }, [])

  const { data, error, loading } = useQuery<IRole>(args)

  return { roles: data?.roles?.nodes, error, loading }
}