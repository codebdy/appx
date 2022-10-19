import { useCallback, useEffect, useRef, useState } from "react";
import { GraphQLRequestError } from "../awesome-graphql-client";
import { useEndpoint } from "../context";
import { EVENT_DATA_POSTED, EVENT_DATA_REMOVED, EVENT_DATA_UPDATED, off, on } from "../events";
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
  error?: GraphQLRequestError;
}

export function useQueryOne<T>(input: IQueryInput): QueryOneResponse<T> {
  //const loadedRef = useRef(false);
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

  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  const errorRef = useRef(error);
  errorRef.current = error;

  const queryRef = useRef(query);
  queryRef.current = query;

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
    if (!errorRef.current && !loadingRef.current && input.gql && endpoint) {
      //loadedRef.current = true;
      queryRef.current && queryRef.current(input.gql, input.params);
    }
  }, [endpoint, input.gql, input.params]);

  useEffect(() => {
    on(EVENT_DATA_POSTED, eventHandler);
    on(EVENT_DATA_REMOVED, eventHandler);
    on(EVENT_DATA_UPDATED, eventHandler);
    return () => {
      off(EVENT_DATA_POSTED, eventHandler);
      off(EVENT_DATA_REMOVED, eventHandler);
      off(EVENT_DATA_UPDATED, eventHandler);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading: (revalidating ? false : loading), revalidating, error, refresh };
}
