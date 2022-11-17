import { gql, QueryResult, useLazyRequest } from "~/enthooks";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useMe } from "~/plugin-sdk";
import { useAppParams } from "~/plugin-sdk/contexts/app";
import { EVENT_DATA_POSTED, EVENT_DATA_REMOVED, EVENT_DATA_UPDATED, off, on } from "~/enthooks/events";
import { INotification } from "~/model";

const notificationsGql = gql`
query ($appId:ID!, $userId:ID!){
  notifications(where:{
    _and:[
      {
        app:{
          id:{
            _eq:$appId
          }
        }
      },
      {
        user:{
          id:{
            _eq:$userId
          }
        }
      },
    ]
  },
  orderBy:{
    id:desc
  },
  limit:20
 ){
    nodes{
      id
      text
      createdAt
      read
      noticeType
    }
  }
}
`

export function useLayzyQueryRecentNotifications(): [
  () => void,
  {
    notifications?: INotification[],
    loading?: boolean,
    error?: Error,
  }
] {
  const appParams = useAppParams();
  const me = useMe();

  const [doQuery, { data, error, loading }] = useLazyRequest<QueryResult<INotification>>()

  const query = useCallback(() => {
    doQuery(notificationsGql, { userId: me?.id, appId: appParams?.app?.id })
  }, [doQuery])

  const queryRef = useRef(query);
  queryRef.current = query

  const eventHandler = useCallback((event: CustomEvent) => {
    if (event.detail?.entity === "Notification") {
      queryRef.current()
    }
  }, [query]);

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

  return [query, { notifications: data?.notifications?.nodes, error, loading }]
}