import { IQueryResponse } from "../../hooks/IQueryResponse";
import { useRef, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { EVENT_DATA_CREATED, on, off, EVENT_DATA_REMOVED } from "../../hooks/events";
import { useLazyRequest } from "./useLazyRequest";
import { useEndpoint } from "../context";

export interface QueryResult<T> {
  [key: string]: T[] | undefined;
}

export function useQuery<T>(gql: string | undefined, entityName?: string): IQueryResponse<T> {
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
    doLoad(gql)
  }, [doLoad, endpoint, gql]);

  const refresh = useCallback(() => {
    setRevalidating(true)
    doLoad(gql)
  }, [doLoad, gql])

  const eventHandler = useCallback((event: CustomEvent) => {
    if (event.detail?.entity === entityName) {
      refresh()
    }
  }, [entityName, refresh]);

  useEffect(() => {
    load();
    on(EVENT_DATA_CREATED, eventHandler);
    on(EVENT_DATA_REMOVED, eventHandler);
    return () => {
      off(EVENT_DATA_CREATED, eventHandler);
      off(EVENT_DATA_REMOVED, eventHandler);
    }
  }, [eventHandler, gql, load]);

  return { data, loading, revalidating, error, refresh }
}