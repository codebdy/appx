import { AwesomeGraphQLClient, GraphQLRequestError, gql } from 'awesome-graphql-client'
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
  const [token, setToken] = useState<string>()
  const setConfigToken = useSetToken();
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
          setConfigToken(data.login);
          options?.onCompleted && options?.onCompleted(data.login);
        })
        .catch((err: GraphQLRequestError) => {
          //const message = parseErrorMessage(err);
          setLoading(false);
          //const serverError:ServerError = { message: message, serverUrl:options?.serverUrl }
          setError(err);
          console.error(err);
          options?.onError && options?.onError(err);
        });
    },
    [options]
  );

  return [login, { token, loading, error }];
}
