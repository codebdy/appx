import { Spin } from "antd";
import React from "react"
import { memo } from "react"
import { Outlet } from "react-router-dom"
import { useQueryMe } from "../enthooks/hooks/useQueryMe";
import { useLoginCheck } from "../hooks/useLoginCheck";
import { useShowError } from "../hooks/useShowError";
import { UserContext } from "./context";

export const LoggedInPanel = memo(() => {
  useLoginCheck();
  const { me, loading, error } = useQueryMe();
  useShowError(error);


  return (
    loading
      ?
      <Spin />
      :
      <UserContext.Provider value={me}>
        <Outlet />
      </UserContext.Provider>
  )
})