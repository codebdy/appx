import { AwesomeGraphQLClient, GraphQLRequestError } from "awesome-graphql-client";
import { useCallback, useState } from "react";
import { useEndpoint } from "../context";

export interface RequestOptions<T> {
  onCompleted?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useLazyRequest<T1, T2>(gql: string | undefined, options?: RequestOptions<T2>)
  : [
    (input: T1) => void,
    {
      error?: Error,
      loading?: boolean,
    }
  ] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const endpoint = useEndpoint();

  const request = useCallback(
    (params: T1) => {
      if (!gql) {
        return;
      }
      const graphQLClient = new AwesomeGraphQLClient({ endpoint })
      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(gql, params)
        .then((data) => {
          setLoading(false);
          options?.onCompleted && options?.onCompleted(data.login);
        })
        .catch((err: GraphQLRequestError) => {
          setLoading(false);
          setError(err);
          console.error(err);
          options?.onError && options?.onError(err);
        });
    },
    [gql, endpoint, options]
  );

  return [request, {loading, error}]
}