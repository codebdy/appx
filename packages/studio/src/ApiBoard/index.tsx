import GraphiQL from "graphiql";
import "graphiql/graphiql.css";
import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { memo, useMemo } from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import React from "react";
import { useToken } from "@appx/enthooks";
import { HEADER_AUTHORIZATION, HEADER_APPX_APP_ID, SERVER_SUBSCRIPTION_URL, SERVER_URL, TOKEN_PREFIX } from "../consts";
import { useSelectedAppId } from './../ModelBoard/hooks/useSelectedAppId';
import { NON_APP_ID } from "../ModelBoard/recoil/atoms";
import "./index.less";

//例子連接
//https://github.com/graphql/graphiql/blob/main/packages/graphiql-toolkit/docs/create-fetcher.md#subscriptionurl
const ApiBoard = memo(() => {
  const appId = useSelectedAppId();
  const token = useToken();
  const fetcher = useMemo(() => {
    const fetcher = createGraphiQLFetcher({
      url: SERVER_URL,
      legacyWsClient: new SubscriptionClient(SERVER_SUBSCRIPTION_URL),
      headers: {
        [HEADER_AUTHORIZATION]: token ? `${TOKEN_PREFIX}${token}` : "",
        [HEADER_APPX_APP_ID]: NON_APP_ID !== appId ? appId : undefined,
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