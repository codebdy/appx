import { IQueryResponse } from "./IQueryResponse";
import { useState, useMemo } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { mockQueryRequest } from "./query";
import { once, EVENT_DATA_CREATED, on, off, EVENT_DATA_REMOVED } from "./events";
import { ID } from "../shared";
import { useQuery } from './useQuery';

export function useQueryOne<T>(key: string, id: ID): IQueryResponse<T> {
  const{data, error, loading, revalidating, refresh} = useQuery<T[]>(key)

  const obj = useMemo(()=>data?.find(o=>(o as any).id === id), [data])

  return { data:obj, loading, revalidating, error, refresh }
}