import { AwesomeGraphQLClient, GraphQLRequestError, gql } from 'awesome-graphql-client'
import { useCallback, useState } from "react";
import { useEndpoint, useSetToken } from '../context';

const loginMutation = gql`
  mutation login($loginName: String!, $password: String!) {
    login(loginName: $loginName, password: $password)
  }
`;

export interface LoginOptions {
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
  console.log("endpoint", endpoint)
  const login = useCallback(
    (loginName: string, password: string) => {
      console.log("嘿嘿1")
      const graphQLClient = new AwesomeGraphQLClient({ endpoint })
      console.log("嘿嘿2")
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
          console.log("呵呵", err)
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
