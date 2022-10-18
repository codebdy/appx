import { AwesomeGraphQLClient, GraphQLRequestError } from "../../enthooks";
import { useCallback } from "react";
import { useEnthooksAppUuid, useEndpoint, useToken } from "../../enthooks";
import { HEADER_APPX_APPUUID, HEADER_AUTHORIZATION, TOKEN_PREFIX } from "../../consts";

const gql = `
  mutation ($file:Upload!){
    uploadPlugin(file:$file)
  }
`

export function useUploadPlugin() {
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
          resolve(data?.uploadPlugin);
        })
        .catch((err: GraphQLRequestError) => {
          reject(err);
        });
    })
    return p;
  }, [appUuid, endpoint, token])

  return upload;
}
