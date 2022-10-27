import { Device } from "@rxdrag/appx-plugin-sdk";
import { Spin } from "antd";
import React, { memo, useMemo } from "react"
import { useParams } from "react-router-dom";
import { CenterSpin } from "~/common/CenterSpin";
import { IApp } from "~/model";
import { useMe } from "~/plugin-sdk";
import { AppContext } from "~/plugin-sdk/contexts/app";
import { useFrameUuid } from "../hooks/useFrameUuid";
import { useQueryUiFrame } from "../hooks/useQueryUiFrame";
import { useQueryUserConfig } from "../hooks/useQueryUserConfig";
import { useShowError } from "../hooks/useShowError";

export const AppRoot = memo((
  props: {
    app: IApp,
    children?: React.ReactNode
  }
) => {
  const { app, children } = props;
  const { device = Device.PC } = useParams();
  const me = useMe();
  const { userConfig, loading: userConfigLoading, error: userConfigError } = useQueryUserConfig(app.id, device as any, me?.id)
  const frameUuid = useFrameUuid(app, device as Device);
  const { uiFrame, error, loading } = useQueryUiFrame(frameUuid);
  useShowError(error || userConfigError)
  const appParams = useMemo(() => {
    return {
      app: app,
      device: device as Device,
      userConfig: userConfig,
      uiFrame: uiFrame,
    }
  }, [app, device, userConfig, uiFrame])
  const isLoading = useMemo(() => loading || userConfigLoading, [loading, userConfigLoading])
  return (
    isLoading ?
      <CenterSpin />
      :
      <AppContext.Provider value={appParams}>
        {
          children
        }
      </AppContext.Provider>

  )
})