import { AwesomeGraphQLClient, GraphQLRequestError } from "awesome-graphql-client";
import { useCallback } from "react";
import { HEADER_APPX_APPUUID, HEADER_AUTHORIZATION, TOKEN_PREFIX } from "../../consts";
import { useEnthooksAppUuid, useEndpoint, useToken } from "../context";

const gql = `
  mutation ($file:Upload!){
    upload(file:$file)
  }
`

export function useUpload() {
  const endpoint = useEndpoint();
  const token = useToken();
  const appUuid = useEnthooksAppUuid();

  const upload = useCallback((file: File) => {
    const p = new Promise<string>((resolve, reject) => {
      const graphQLClient = new AwesomeGraphQLClient({ endpoint })
      graphQLClient
        .request(gql, { file }, {
          headers: {
            [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "",
            [HEADER_APPX_APPUUID]: appUuid,
          }
        })
        .then((data) => {
          resolve(data?.upload);
        })
        .catch((err: GraphQLRequestError) => {
          reject(err);
        });
    })
    return p;
  }, [appUuid, endpoint, token])

  return upload;
}
