import { useCallback, useState } from "react";
import { createUuid } from "../shared";
import { EVENT_DATA_CREATED, trigger } from "./events";
import { IMutationResponse } from "./IMutationResponse";
import { mockCreateRequest } from "./mutation";

type CreateFn<T> = (app: T) => void;

export function useCreate<T1, T2>(key: string, onComplate?: (data: T2) => void): [create: CreateFn<T1>, response: IMutationResponse<T2>] {
  const [data, setData] = useState<T2>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();

  const create = useCallback((obj: T1) => {
    setLoading(true);
    (obj as any).uuid = createUuid();
    mockCreateRequest<T1, T2>(key, obj)
      .then((data) => {
        setLoading(false);
        setData(data)
        onComplate && onComplate(data)
        trigger(EVENT_DATA_CREATED, key)
      })
  }, [])

  return [create, { data, loading, error }];
}