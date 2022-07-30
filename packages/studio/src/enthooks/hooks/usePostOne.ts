import { gql } from "awesome-graphql-client";
import { useCallback, useMemo } from "react";
import { CONST_ID } from "../../ModelBoard/meta/Meta";
import { EVENT_DATA_POSTED_ONE, trigger } from "../events";
import { useLazyRequest } from "./useLazyRequest";

export interface IPostOptions<T> {
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
            ${Object.keys(object)
          .filter((key) => key !== CONST_ID && key !== "__type")
          .join("\n")}
          }
        }
      `;
      doPost(postMutation, { object });
    },
    [__type, doPost, postName]
  );

  return [post, { loading, error }];
}
