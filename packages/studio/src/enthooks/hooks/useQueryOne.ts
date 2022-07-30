import { useCallback, useEffect, useRef } from "react";
import { useEndpoint } from "../context";
import { useLazyRequest } from "./useLazyRequest";

export type MutateFn<T> = (data?: T) => void;

export interface QueryOneResult<T> {
  [key: string]: T | undefined;
}

export type QueryOneResponse<T> = {
  data?: QueryOneResult<T>;
  refresh: MutateFn<T>;
  loading?: boolean;
  revalidating?: boolean;
  error?: Error;
}

export function useQueryOne<T>(gql: string, params:any = {} ,entityName?: string): QueryOneResponse<T> {
  const loadedRef = useRef(false);
  const endpoint = useEndpoint();

  const [query, { data, error, loading }] = useLazyRequest()
  useEffect(() => {
    if (!error && !loading && gql && !loadedRef.current && endpoint) {
      loadedRef.current = true;
      query(gql);
    }
  }, [endpoint, error, gql, loading, query]);

  const refresh = useCallback((data?: T) => {
    console.log("执行 refresh");
    query(gql, params)
  }, [gql, params, query]);

  return { data, loading, error, refresh };
}
