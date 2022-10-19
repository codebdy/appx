import { Spin } from "antd";
import React from "react"
import { memo } from "react"
import { Outlet } from "react-router-dom"
import { SYSTEM_APP_UUID, DESIGNER_TOKEN_NAME } from "../consts";
import AppRoot from "~/shared/AppRoot";
import { useQueryMe } from "../enthooks/hooks/useQueryMe";
import { useLoginCheck } from "../hooks/useLoginCheck";
import { useShowError } from "~/hooks/useShowError";
import { UserContext } from "@rxdrag/plugin-sdk/contexts/login";

export const LoggedInPanel = memo(() => {
  useLoginCheck();
  const { me, loading, error } = useQueryMe();
  useShowError(error);


  return (
    loading
      ?
      <Spin />
      :
      <AppRoot appUuid={SYSTEM_APP_UUID} tokenName={DESIGNER_TOKEN_NAME}>
        <UserContext.Provider value={me}>
          <Outlet />
        </UserContext.Provider>
      </AppRoot>
  )
})