import { useRef, useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useEndpoint } from '../../enthooks';
import { EVENT_DATA_POSTED_ONE, EVENT_DATA_REMOVED, off, on } from '../../enthooks/events';
import { useLazyRequest } from '../../enthooks/hooks/useLazyRequest';
import { MutateFn } from '../../enthooks/hooks/useQueryOne';
import { IQueryParams } from './useQueryParams';

export type QueryResponse = {
  data?: any;
  refresh: MutateFn<any>;
  loading?: boolean;
  revalidating?: boolean;
  error?: Error;
}

export function useDataQuery(params: IQueryParams): QueryResponse {
  const [revalidating, setRevalidating] = useState<boolean>();
  const loadedRef = useRef(false);
  const endpoint = useEndpoint();
  const refreshRef = useRef<() => void>();

  const [doLoad, { error, data, loading }] = useLazyRequest({
    onCompleted: (data) => {
      setRevalidating(false)
    },
    onError: () => {
      setRevalidating(false)
    }
  })

  const load = useCallback(() => {
    if (!params.gql || !endpoint || loadedRef.current) {
      return
    }
    loadedRef.current = true;
    doLoad(params.gql, params.variables)
  }, [doLoad, endpoint, params.gql, params.variables]);

  const refresh = useCallback(() => {
    setRevalidating(true)
    doLoad(params.gql, params.variables)
  }, [doLoad, params.gql, params.variables])

  refreshRef.current = refresh;

  const eventHandler = useCallback((event: CustomEvent) => {
    if (params.entityName === event.detail?.entity) {
      if (refreshRef.current) {
        refreshRef.current();
      }
    }
  }, [params.entityName]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    on(EVENT_DATA_POSTED_ONE, eventHandler);
    on(EVENT_DATA_REMOVED, eventHandler);
    return () => {
      off(EVENT_DATA_POSTED_ONE, eventHandler);
      off(EVENT_DATA_REMOVED, eventHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data: data?.[params.rootFieldName],
    loading: (revalidating ? false : loading),
    revalidating,
    error,
    refresh
  }
}