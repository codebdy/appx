import GraphiQL from "graphiql";
import "graphiql/graphiql.css";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { memo, useMemo } from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import React from "react";
import { HEADER_AUTHORIZATION, SERVER_SUBSCRIPTION_URL, SERVER_URL, TOKEN_PREFIX, HEADER_APPX_APPUUID } from "../consts";
import { useSelectedAppUuid } from '../ModelBoard/hooks/useSelectedAppUuid';
import { SYSTEM_APP_UUID } from "../ModelBoard/recoil/atoms";
import "./index.less";
import { useToken } from "../enthooks";

//例子連接
//https://github.com/graphql/graphiql/blob/main/packages/graphiql-toolkit/docs/create-fetcher.md#subscriptionurl
const ApiBoard = memo(() => {
  const appId = useSelectedAppUuid();
  const token = useToken();
  const fetcher = useMemo(() => {
    const fetcher = createGraphiQLFetcher({
      url: SERVER_URL,
      legacyWsClient: new SubscriptionClient(SERVER_SUBSCRIPTION_URL),
      headers: {
        [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "",
        [HEADER_APPX_APPUUID]: SYSTEM_APP_UUID !== appId ? appId : undefined,
      }
    });

    return fetcher;
  }, [appId, token]);

  return (
    <div className="api-board">
      {fetcher && (
        <GraphiQL
          headerEditorEnabled
          fetcher={fetcher}
        // query=""
        />
      )}
    </div>
  );
});

export default ApiBoard;