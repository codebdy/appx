import { AwesomeGraphQLClient, GraphQLRequestError } from "awesome-graphql-client";
import { useEffect, useState } from "react";
import { useEndpoint } from "../context";


export function useRequest(gql: string | undefined, params: { [key: string]: any })
  : {
    error?: Error,
    loading?: boolean,
    data?: any,
  } {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(false);
  const [error, setError] = useState<Error | undefined>();
  const endpoint = useEndpoint();

  useEffect(
    () => {
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
          setData(data);
        })
        .catch((err: GraphQLRequestError) => {
          setLoading(false);
          setError(err);
          console.error(err);
        });
    },
    [gql, endpoint, params]
  );

  return { loading, error, data }
}