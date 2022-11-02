import { AwesomeGraphQLClient, GraphQLRequestError } from "~/enthooks";
import { useCallback, useRef, useState } from "react";
import { HEADER_APPX_APPID, HEADER_AUTHORIZATION, TOKEN_PREFIX } from "~/consts";
import { useEnthooksAppId, useEndpoint, useToken } from "../context";
import { useMountRef } from "./useMountRef";

export interface RequestOptions<T> {
  onCompleted?: (data: T) => void;
  onError?: (error: GraphQLRequestError) => void;
}

export function useLazyRequest<T1>(options?: RequestOptions<any>)
  : [
    (gql: string | undefined, input?: T1) => void,
    {
      error?: GraphQLRequestError,
      loading?: boolean,
      data?:any,
    }
  ] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<GraphQLRequestError | undefined>();
  const endpoint = useEndpoint();
  const token = useToken();
  const mountRef = useMountRef();
  const appId = useEnthooksAppId();
  const optionsRef = useRef<RequestOptions<any>>();
  optionsRef.current = options;

  const request = useCallback(
    (gql: string | undefined, params?: T1) => {
      if (!gql || !endpoint) {
        console.error("gql or endpoint is null", endpoint, gql)
        return;
      }

      const options = optionsRef.current;
      
      const headers = { 
        [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "" ,
        [HEADER_APPX_APPID]: appId,
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
    [endpoint, token, appId, mountRef/*, options*/]
  );

  return [request, {loading, error, data}]
}