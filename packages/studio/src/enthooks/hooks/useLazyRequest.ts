import { AwesomeGraphQLClient, GraphQLRequestError } from "awesome-graphql-client";
import { useCallback, useState } from "react";
import { HEADER_AUTHORIZATION, TOKEN_PREFIX } from "../../consts";
import { useEndpoint, useToken } from "../context";
import { useMountRef } from "./useMountRef";

export interface RequestOptions<T> {
  onCompleted?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useLazyRequest<T1>(options?: RequestOptions<any>)
  : [
    (gql: string | undefined, input?: T1) => void,
    {
      error?: Error,
      loading?: boolean,
      data?:any,
    }
  ] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(false);
  const [error, setError] = useState<Error | undefined>();
  const endpoint = useEndpoint();
  const token = useToken();
  const mountRef = useMountRef();
  
  const request = useCallback(
    (gql: string | undefined, params?: T1) => {
      if (!gql) {
        return;
      }
      const graphQLClient = new AwesomeGraphQLClient({ endpoint })
      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(gql, params, { headers: { [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "" } })
        .then((data) => {
          if (!mountRef.current) {
            return;
          }
          setLoading(false);
          options?.onCompleted && options?.onCompleted(data);
          setData(data);
        })
        .catch((err: GraphQLRequestError) => {
          setLoading(false);
          setError(err);
          console.error(err);
          options?.onError && options?.onError(err);
        });
    },
    [endpoint, token, mountRef, options]
  );

  return [request, {loading, error, data}]
}