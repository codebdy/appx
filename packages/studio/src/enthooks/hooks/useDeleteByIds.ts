import { gql } from "awesome-graphql-client";
import { useCallback, useMemo } from "react";
import { ID } from "../../shared";
import { EVENT_DATA_REMOVED, trigger } from "../events";
import { useLazyRequest } from "./useLazyRequest";

export interface IDeleteOptions<T> {
  onCompleted?: (data: T[]) => void;
  onError?: (error: Error) => void;
  noRefresh?: boolean;
}

export type DeleteByIdsResponse = [
  (ids: ID[]) => void,
  { loading?: boolean; error?: Error }
]

export function useDeleteByIds<T>(__type: string, options?: IDeleteOptions<T>): DeleteByIdsResponse {
  const methodName = useMemo(() => (`delete${__type}`), [__type]);

  const [doRemove, { error, loading }] = useLazyRequest({
    onCompleted: (data) => {
      const deletedObj = data[methodName];
      trigger(EVENT_DATA_REMOVED, { entity: __type, ids: deletedObj?.map(obj => obj?.id) || [] })
      options?.onCompleted && data && options?.onCompleted(deletedObj);
    },
    onError: options?.onError
  })

  const remove = useCallback(
    (ids: ID[]) => {
      const deleteGql = gql`
        mutation ($ids: [ID]!) {
          ${methodName}(
            where: id:{
              _in: $ids
            }
          ){
            nodes{
              id
            }
            total
          }
        }
      `;
      doRemove(deleteGql, { ids });
    },
    [doRemove, methodName]
  );

  return [remove, { error, loading }]
}