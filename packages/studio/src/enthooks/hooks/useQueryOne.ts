import { useCallback, useEffect } from "react";
import { useLazyRequest } from "./useLazyRequest";

export type MutateFn<T> = (data?: T) => void;

export interface QueryOneResult<T> {
  [key: string]: T | undefined;
}

export function useQueryOne<T>(gql: string): {
  data?: QueryOneResult<T>;
  mutate: MutateFn<T>;
  loading?: boolean;
  revalidating?: boolean;
  error?: Error;
} {

  const [query, { data, error, loading }] = useLazyRequest()
  useEffect(() => {
    if (gql) {
      query(gql);
    }
  }, [gql, query]);

  const mutate = useCallback((data?: T) => {
    console.log("执行Mutate");
    query(gql)
  }, [gql, query]);

  return { data, loading, error, mutate };
}
