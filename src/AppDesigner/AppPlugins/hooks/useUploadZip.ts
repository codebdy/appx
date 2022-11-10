import { AwesomeGraphQLClient, GraphQLRequestError } from "~/enthooks";
import { useCallback } from "react";
import { useEnthooksAppId, useEndpoint, useToken } from "~/enthooks";
import { HEADER_APPX_APPID, HEADER_AUTHORIZATION, TOKEN_PREFIX } from "~/consts";

const gql = `
  mutation ($file:Upload!, $folder: String!){
    uploadZip(file:$file, folder:$folder)
  }
`

export function useUploadZip(folder: string) {
  const endpoint = useEndpoint();
  const token = useToken();
  const appId = useEnthooksAppId();

  const upload = useCallback((file: File) => {
    const p = new Promise<string>((resolve, reject) => {
      const graphQLClient = new AwesomeGraphQLClient({ endpoint })
      graphQLClient
        .request(gql, { file, folder }, {
          headers: {
            [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "",
            [HEADER_APPX_APPID]: appId,
          }
        })
        .then((data) => {
          resolve(data?.uploadZip);
        })
        .catch((err: GraphQLRequestError) => {
          reject(err);
        });
    })
    return p;
  }, [appId, endpoint, token])

  return upload;
}
