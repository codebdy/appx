import { useCallback, useState } from "react";
import { ID } from "../shared";

type RemoveFn = (id:ID) => void;

export function useRemove<T>(key: string, onComplate?: (data: T) => void): [remove: RemoveFn, response: IMutationResponse<T>] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<Error>();

  const remove = useCallback((id: ID) => {
    setLoading(true);
    mockRemoveRequest<T>(key, id)
      .then((data) => {
        setLoading(false);
        setData(data)
        onComplate && onComplate(data)
        trigger(EVENT_DATA_REMOVED, key)
      })
  }, [key, onComplate])

  return [remove, { data, loading, error }];
}