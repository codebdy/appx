import { IQueryResponse } from "./IQueryResponse";
import { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { mockQueryRequest } from "./query";
import { EVENT_DATA_CREATED, on, off, EVENT_DATA_REMOVED } from "./events";

export function useQuery<T>(key: string): IQueryResponse<T> {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>();
  const [revalidating, setRevalidating] = useState<boolean>();
  const [error, setError] = useState<Error>();

  const eventHandler = useCallback((event: CustomEvent) => {
    if (event.detail === key) {
      refresh()
    }
  }, []);

  const load = useCallback(() => {
    mockQueryRequest<T>(key)
      .then(data => {
        setData(data)
        setLoading(false)
        setRevalidating(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
        setRevalidating(false)
      })
  }, []);

  useEffect(() => {
    setLoading(true);
    load();
    on(EVENT_DATA_CREATED, eventHandler);
    on(EVENT_DATA_REMOVED, eventHandler);
    return () => {
      off(EVENT_DATA_CREATED, eventHandler);
      off(EVENT_DATA_REMOVED, eventHandler);
    }
  }, []);

  const refresh = useCallback(() => {
    setRevalidating(true)
    if (!loading) {
      load()
    }
  }, [])

  return { data, loading, revalidating, error, refresh }
}