import { createClient } from 'graphql-ws';
import { useCallback, useEffect, useState } from 'react';
import { HEADER_APPX_APPID, HEADER_AUTHORIZATION, SERVER_SUBSCRIPTION_URL, TOKEN_PREFIX } from '~/consts';
import { useToken } from '~/enthooks';
import { useAppParams } from '~/plugin-sdk/contexts/app';

export function useSubscribeNotificationCounts() {
  const [error, setError] = useState<Error>();
  const [count, setCount] = useState<number>();
  const { app } = useAppParams();
  const token = useToken();

  const onNext = useCallback((value) => {
    setCount(value)
  }, [])

  const handleError = useCallback((error) => {
    setError(new Error("Subscribe error:" + error?.message))
  }, [])

  const handleComplate = useCallback(() => {
    console.log("subscription unreadNoticationCounts complated")
  }, [])

  useEffect(() => {
    if (!app ||!token){
      return
    }
    
    const client = createClient({
      url: SERVER_SUBSCRIPTION_URL,
      connectionParams: async () => {
        return {
          headers: {
            [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "",
            [HEADER_APPX_APPID]: app.id,
          },
        };
      },
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
  }, [onNext, handleError, handleComplate, app, token])

  return { count, error }
}
