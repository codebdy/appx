import { useCallback } from "react";
import { gql, RequestOptions, useLazyRequest } from "~/enthooks";
import { ID } from "~/shared"

export interface MakeVersionInput {
  appId: ID;
  instaneId: ID;
  version?: string;
  description?: string;
}

const makeMutation = gql`
  mutation ($appId: ID!, $instanceId ID!, $version: String!, $description:String) {
    makeVersion(appId: $appId, instanceId:$instanceId, version:$version, description:$description)
  }
`;

export function useCreateVersion(options?: RequestOptions<any>): [
  (input: MakeVersionInput) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const [doCreate, { error, loading }] = useLazyRequest(options)

  const create = useCallback((input: MakeVersionInput) => {
    doCreate(makeMutation, input)
  }, [doCreate])

  return [create, { error, loading }];
}
