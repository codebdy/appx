import { AwesomeGraphQLClient, GraphQLRequestError } from "awesome-graphql-client";
import { useEffect, useState } from "react";
import { HEADER_APPX_APPUUID, HEADER_AUTHORIZATION, TOKEN_PREFIX } from "../../consts";
import { useAppUuid, useEndpoint, useToken } from "../context";


export function useRequest(gql: string | undefined, params?: { [key: string]: any })
  : {
    error?: Error,
    loading?: boolean,
    data?: any,
  } {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const [error, setError] = useState<Error | undefined>();
  const endpoint = useEndpoint();
  const token = useToken();
  const appUuid = useAppUuid();

  useEffect(
    () => {
      if (!gql || !endpoint) {
        return;
      }
      const graphQLClient = new AwesomeGraphQLClient({ endpoint })
      setLoading(true);
      setError(undefined);
      graphQLClient
        .request(gql, params, {
          headers: {
            [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "",
            [HEADER_APPX_APPUUID]: appUuid,
          }
        })
        .then((data) => {
          setLoading(false);
          setData(data);
        })
        .catch((err: GraphQLRequestError) => {
          setLoading(false);
          setError(err);
          console.error(err);
        });
    },
    [gql, endpoint, params, token, appUuid]
  );

  return { loading, error, data }
}