import { gql } from "awesome-graphql-client";
import { useCallback } from "react";
import { RequestOptions, useLazyRequest } from "../../enthooks/hooks/useLazyRequest";
import { Meta } from "../meta/Meta";

const publishGql = gql`
  mutation publish($appUuid:String!) {
    publish (appUuid:$appUuid){
      id
    }
  }
`;

export function usePublishMeta(
  appUuid: string,
  options?: RequestOptions<Meta>
): [
    () => void,
    { loading: boolean; error: Error | undefined }
  ] {

  const [doPublish, { loading, error }] = useLazyRequest(options)

  const publish = useCallback(() => {
    doPublish(publishGql, {appUuid})
  }, [appUuid, doPublish]);

  return [publish, { loading, error }];
}
