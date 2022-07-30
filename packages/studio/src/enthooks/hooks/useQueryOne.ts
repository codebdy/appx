import { useCallback, useEffect, useRef, useState } from "react";
import { useEndpoint } from "../context";
import { EVENT_DATA_POSTED_ONE, EVENT_DATA_REMOVED, off, on } from "../events";
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

export function useQueryOne<T>(gql: string, params: any = {}, entityNames?: string[]): QueryOneResponse<T> {
  const loadedRef = useRef(false);
  const endpoint = useEndpoint();
  const [revalidating, setRevalidating] = useState<boolean>();

  const [query, { data, error, loading }] = useLazyRequest({
    onCompleted: () => {
      setRevalidating(false)
    },
    onError: () => {
      setRevalidating(false)
    }
  })

  const refresh = useCallback((data?: T) => {
    console.log("执行 refresh");
    setRevalidating(true);
    query(gql, params)
  }, [gql, params, query]);

  const eventHandler = useCallback((event: CustomEvent) => {
    if (entityNames?.find(entity => entity === event.detail?.entity)) {
      refresh()
    }
  }, [entityNames, refresh]);

  useEffect(() => {
    if (!error && !loading && gql && !loadedRef.current && endpoint) {
      loadedRef.current = true;
      query(gql);
    }
    on(EVENT_DATA_POSTED_ONE, eventHandler);
    on(EVENT_DATA_REMOVED, eventHandler);
    return () => {
      off(EVENT_DATA_POSTED_ONE, eventHandler);
      off(EVENT_DATA_REMOVED, eventHandler);
    }
  }, [endpoint, error, eventHandler, gql, loading, query]);

  return { data, loading: (revalidating ? false : loading), revalidating, error, refresh };
}
