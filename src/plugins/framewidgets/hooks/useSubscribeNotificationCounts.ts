import { useCallback, useEffect, useState } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { DESIGNER_TOKEN_NAME, HEADER_APPX_APPID, HEADER_AUTHORIZATION, SERVER_SUBSCRIPTION_URL, TOKEN_PREFIX } from '~/consts';
import { useToken } from '~/enthooks';
import { useAppParams } from '~/plugin-sdk/contexts/app';
const sClident = new SubscriptionClient(SERVER_SUBSCRIPTION_URL, {
  connectionParams: {
    headers: {
      [HEADER_AUTHORIZATION]: localStorage.getItem(DESIGNER_TOKEN_NAME) ? `${TOKEN_PREFIX}${localStorage.getItem(DESIGNER_TOKEN_NAME)}` : "",
      [HEADER_APPX_APPID]: "1",
    }
  }
})
export function useSubscribeNotificationCounts() {
  const [error, setError] = useState<Error>();
  const [count, setCount] = useState<number>();
  const { app } = useAppParams();
  const token = useToken();

  const handleError = useCallback((error) => {
    setError(new Error("Subscribe error:" + error?.message))
  }, [])

  const handleComplate = useCallback(() => {
    console.log("subscription unreadNoticationCounts complated")
  }, [])

  useEffect(() => {
    if (!app || !token) {
      return
    }

    const { unsubscribe } = sClident.request({
      query: 'subscription { unreadNoticationCounts }',
    }).subscribe({
      next: (value:any) => { 
        setCount(value?.unreadNoticationCounts)
       },
      error: (error: Error) => { 
        setError(error)
       },
      complete: () => { 
        console.log("useSubscribeNotificationCounts complete") 
      },
    })

    return () => unsubscribe()
  }, [handleError, handleComplate, app, token])

  return { count, error }
}
