import { useCallback, useEffect, useRef, useState } from "react";
import { useEndpoint } from "../context";
import { EVENT_DATA_POSTED_ONE, EVENT_DATA_REMOVED, off, on } from "../events";
import { IQueryInput } from "./IQueryInput";
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

export function useQueryOne<T>(input: IQueryInput): QueryOneResponse<T> {
  const loadedRef = useRef(false);
  const endpoint = useEndpoint();
  const [revalidating, setRevalidating] = useState<boolean>();
  const refreshRef = useRef<() => void>();
  const [query, { data, error, loading }] = useLazyRequest({
    onCompleted: () => {
      setRevalidating(false)
    },
    onError: () => {
      setRevalidating(false)
    }
  })


  const refresh = useCallback((data?: T) => {
    setRevalidating(true);
    query(input.gql, input.params)
  }, [input.gql, input.params, query]);

  refreshRef.current = refresh;

  const eventHandler = useCallback((event: CustomEvent) => {
    if (input.depEntityNames?.find(entity => entity === event.detail?.entity)) {
      if (refreshRef.current) {
        refreshRef.current();
      }
    }
  }, [input.depEntityNames]);

  useEffect(() => {
    if (!error && !loading && input.gql && !loadedRef.current && endpoint) {
      loadedRef.current = true;
      query(input.gql, input.params);
    }
  }, [endpoint, error, eventHandler, input.gql, input.params, loading, query]);

  useEffect(() => {
    on(EVENT_DATA_POSTED_ONE, eventHandler);
    on(EVENT_DATA_REMOVED, eventHandler);
    return () => {
      off(EVENT_DATA_POSTED_ONE, eventHandler);
      off(EVENT_DATA_REMOVED, eventHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading: (revalidating ? false : loading), revalidating, error, refresh };
}
