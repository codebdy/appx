import { AwesomeGraphQLClient, GraphQLRequestError } from 'awesome-graphql-client'
import { useCallback, useState } from "react";
import { useEndpoint, useSetToken } from '../context';

const loginMutation = gql`
  mutation login($loginName: String!, $password: String!) {
    login(loginName: $loginName, password: $password)
  }
`;

export interface LoginOptions {
  serverUrl?: string;
  onCompleted?: (access_token: string) => void;
  onError?: (error?: Error) => void;
}

export function useLogin(
  options?: LoginOptions
): [
  (loginName: string, password: string) => void,
  { token?: string; loading?: boolean; error?: Error }
] {
  const setToken = useSetToken();
  const endpoint = useEndpoint();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  const login = useCallback(
    (loginName: string, password: string) => {
      const graphQLClient = new AwesomeGraphQLClient({ endpoint })

      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(loginMutation, { loginName, password })
        .then((data) => {
          setLoading(false);
          setToken(data.login);
          options?.onCompleted && options?.onCompleted(data.login);
        })
        .catch((err: ClientError) => {
          const message = parseErrorMessage(err);
          setLoading(false);
          const serverError:ServerError = { message: message, serverUrl:options?.serverUrl }
          setError(serverError);
          console.error(err);
          options?.onError && options?.onError(serverError);
        });
    },
    [createClient, options]
  );

  return [login, { token, loading, error }];
}
