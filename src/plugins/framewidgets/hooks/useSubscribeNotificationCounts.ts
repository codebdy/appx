import { createClient } from 'graphql-ws';
import { useCallback, useEffect } from 'react';

export function useSubscribeNotificationCounts() {

  const onNext = useCallback((value) => {

  }, [])

  const client = createClient({
    url: 'ws://localhost:4000/graphql',
  });

  const handleError = useCallback((error) => {

  }, [])

  const handleComplate = useCallback(() => {

  }, [])

  useEffect(() => {
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

}
