import { AwesomeGraphQLClient, GraphQLRequestError } from "awesome-graphql-client";
import { useCallback } from "react";
import { useAppUuid, useEndpoint, useToken } from "../../enthooks";
import { HEADER_APPX_APPUUID, HEADER_AUTHORIZATION, TOKEN_PREFIX } from "../../consts";

const gql = `
  mutation ($file:Upload!){
    uploadPlugin(file:$file)
  }
`

export function useUploadPlugin() {
  const endpoint = useEndpoint();
  const token = useToken();
  const appUuid = useAppUuid();

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
