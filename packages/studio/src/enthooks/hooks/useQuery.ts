import { useRef, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useLazyRequest } from "./useLazyRequest";
import { useEndpoint } from "../context";
import { EVENT_DATA_POSTED_ONE, EVENT_DATA_REMOVED, off, on } from "../events";
import { MutateFn } from './useQueryOne';

export interface QueryResult<T> {
  [key: string]: T[] | undefined;
}

export type QueryResponse<T> = {
  data?: QueryResult<T>;
  refresh: MutateFn<T>;
  loading?: boolean;
  revalidating?: boolean;
  error?: Error;
}

export function useQuery<T>(gql: string | undefined, params: any = {}, entityNames?: string[]): QueryResponse<T> {
  const [revalidating, setRevalidating] = useState<boolean>();
  const loadedRef = useRef(false);
  const endpoint = useEndpoint();
  const refreshRef = useRef<() => void>();

  const [doLoad, { error, data, loading }] = useLazyRequest({
    onCompleted: () => {
      setRevalidating(false)
    },
    onError: () => {
      setRevalidating(false)
    }
  })

  const load = useCallback(() => {
    if (!gql || !endpoint || loadedRef.current) {
      return
    }
    loadedRef.current = true;
    doLoad(gql, params)
  }, [doLoad, endpoint, gql, params]);

  const refresh = useCallback(() => {
    setRevalidating(true)
    doLoad(gql, params)
  }, [doLoad, gql, params])

  refreshRef.current = refresh;

  const eventHandler = useCallback((event: CustomEvent) => {
    if (entityNames?.find(entity => entity === event.detail?.entity)) {
      if (refreshRef.current) {
        refreshRef.current();
      }
    }
  }, [entityNames]);

  useEffect(() => {
    load();
    on(EVENT_DATA_POSTED_ONE, eventHandler);
    on(EVENT_DATA_REMOVED, eventHandler);
    return () => {
      off(EVENT_DATA_POSTED_ONE, eventHandler);
      off(EVENT_DATA_REMOVED, eventHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading: (revalidating ? false : loading), revalidating, error, refresh }
}