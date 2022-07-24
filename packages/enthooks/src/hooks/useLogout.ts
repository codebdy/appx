import { useCallback, useState } from "react";
import { useEndpoint, useSetToken } from "../context";
import { AwesomeGraphQLClient, GraphQLRequestError, gql } from 'awesome-graphql-client'

const logoutMutation = gql`
  mutation {
    logout
  }
`;
export interface LogoutOptions {
  serverUrl?: string;
  onCompleted?: () => void;
  onError?: (error?: Error) => void;
}

export function useLogout(
  options?: LogoutOptions
): [
  () => void,
  { loading?: boolean; error?: Error }
] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const endpoint = useEndpoint();
  const setConfigToken = useSetToken();
  
  const logout = useCallback(
    () => {
      const graphQLClient = new AwesomeGraphQLClient({ endpoint })
      setConfigToken(undefined);

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(logoutMutation)
        .then(() => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted();
        })
        .catch((err: GraphQLRequestError) => {
          setLoading(false);
          setError(err);
          console.error(err);
          options?.onError && options?.onError(err);
        });
    },
    [options]
  );

  return [logout, { loading, error }];
}
