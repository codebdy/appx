import { useMemo } from 'react';
import { ID } from "../shared";
import { useQuery } from '../enthooks/hooks/useQuery';

export function useQueryOne<T>(key: string, id: ID) {
  const { data, error, loading, revalidating, refresh } = useQuery<T[]>(key)

  const obj = useMemo(() => data?.find(o => (o as any).id === id), [data, id])

  return { data: obj, loading, revalidating, error, refresh }
}