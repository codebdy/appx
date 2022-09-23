import { gql } from "awesome-graphql-client";
import { useCallback, useMemo } from "react";
import { EVENT_DATA_POSTED_ONE, trigger } from "../events";
import { useLazyRequest } from "./useLazyRequest";

export interface IPostOptions<T> {
  fieldsGql?:string,
  onCompleted?: (data: T) => void;
  onError?: (error: Error) => void;
  noRefresh?: boolean;
}

export type PostResponse<T> = [
  (data: T) => void,
  { loading?: boolean; error?: Error }
]

export function usePostOne<T, T2>(
  __type: string,
  options?: IPostOptions<T2>
): PostResponse<T> {
  const postName = useMemo(() => ("upsertOne" + __type), [__type]);

  const [doPost, { error, loading }] = useLazyRequest({
    onCompleted: (data) => {
      trigger(EVENT_DATA_POSTED_ONE, { entity: __type })
      options?.onCompleted && data && options?.onCompleted(data[postName]);
    },
    onError: options?.onError
  })

  const post = useCallback(
    (object: T) => {
      const inputType = __type + "Input";
      const postMutation = gql`
        mutation ${postName} ($object: ${inputType}!) {
          ${postName}(object: $object){
            id
            ${options?.fieldsGql || ""}
          }
        }
      `;
      doPost(postMutation, { object });
    },
    [__type, doPost, options?.fieldsGql, postName]
  );

  return [post, { loading, error }];
}