import { useCallback, useEffect, useRef } from "react";
import { useEndpoint } from "../context";
import { useLazyRequest } from "./useLazyRequest";

export type MutateFn<T> = (data?: T) => void;

export interface QueryOneResult<T> {
  [key: string]: T | undefined;
}

export function useQueryOne<T>(gql: string, entityName?:string): {
  data?: QueryOneResult<T>;
  mutate: MutateFn<T>;
  loading?: boolean;
  revalidating?: boolean;
  error?: Error;
} {
  const loadedRef = useRef(false);
  const endpoint = useEndpoint();
  
  const [query, { data, error, loading }] = useLazyRequest()
  useEffect(() => {
    if (!error && !loading && gql && !loadedRef.current && endpoint) {
      loadedRef.current = true;
      query(gql);
    }
  }, [endpoint, error, gql, loading, query]);

  const mutate = useCallback((data?: T) => {
    console.log("执行Mutate");
    query(gql)
  }, [gql, query]);

  return { data, loading, error, mutate };
}
