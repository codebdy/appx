import { createClient } from 'graphql-ws';
import { useCallback, useEffect, useState } from 'react';
import { SERVER_SUBSCRIPTION_URL } from '~/consts';

export function useSubscribeNotificationCounts() {
  const [error, setError] = useState<Error>();
  const [count, setCount] = useState<number>();
  const onNext = useCallback((value) => {
    setCount(value)
  }, [])

  const handleError = useCallback((error) => {
    setError(error)
  }, [])

  const handleComplate = useCallback(() => {
    console.log("subscription unreadNoticationCounts complated")
  }, [])

  useEffect(() => {
    const client = createClient({
      url: SERVER_SUBSCRIPTION_URL,
    });

    const unsubscribe = client.subscribe(
      {
        query: 'subscription { unreadNoticationCounts }',
      },
      {
        next: onNext,
        error: handleError,
        complete: handleComplate,
      },
    );
    return unsubscribe
  }, [onNext, handleError, handleComplate])


  return {count, error}
}
