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

  const eventHandler = useCallback((event: CustomEvent) => {
    console.log("呵呵", entityNames ,event.detail?.entity)
    if (entityNames?.find(entity => entity === event.detail?.entity)) {
      console.log("哈哈", entityNames ,event.detail?.entity)
      refresh()
    }
  }, [entityNames, refresh]);

  useEffect(() => {
    load();
    on(EVENT_DATA_POSTED_ONE, eventHandler);
    on(EVENT_DATA_REMOVED, eventHandler);
    return () => {
      off(EVENT_DATA_POSTED_ONE, eventHandler);
      off(EVENT_DATA_REMOVED, eventHandler);
    }
  }, [eventHandler, gql, load]);

  return { data, loading: (revalidating ? false : loading), revalidating, error, refresh }
}