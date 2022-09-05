import { AwesomeGraphQLClient, GraphQLRequestError } from "awesome-graphql-client";
import { useCallback, useState } from "react";
import { HEADER_APPX_APPUUID, HEADER_AUTHORIZATION, TOKEN_PREFIX } from "../../consts";
import { useAppUuid, useEndpoint, useToken } from "../context";
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
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<Error | undefined>();
  const endpoint = useEndpoint();
  const token = useToken();
  const mountRef = useMountRef();
  const appUuid = useAppUuid();

  const request = useCallback(
    (gql: string | undefined, params?: T1) => {
      if (!gql || !endpoint) {
        console.log("gql or endpoint is null")
        return;
      }

      const headers = { 
        [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "" ,
        [HEADER_APPX_APPUUID]: appUuid,
      } 

      const graphQLClient = new AwesomeGraphQLClient({ endpoint })
      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(gql, params, { 
          headers: headers
        })
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
    [endpoint, token, appUuid, mountRef, options]
  );

  return [request, {loading, error, data}]
}