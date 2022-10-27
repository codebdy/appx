import React from "react"
import { memo } from "react"
import { Outlet } from "react-router-dom"
import { useQueryMe } from "../enthooks/hooks/useQueryMe";
import { useLoginCheck } from "../AppDesigner/hooks/useLoginCheck";
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { UserContext } from "@rxdrag/plugin-sdk/contexts/login";
import { CenterSpin } from "~/common/CenterSpin";

export const LoggedInPanel = memo(() => {
  useLoginCheck();
  const { me, loading, error } = useQueryMe();
  useShowError(error);

  return (
    loading
      ?
      <CenterSpin loading={loading} />
      :
      <UserContext.Provider value={me}>
        <Outlet />
      </UserContext.Provider>
  )
})