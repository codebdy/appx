import { Device } from "@rxdrag/appx-plugin-sdk";
import { Spin } from "antd";
import React, { memo, useMemo } from "react"
import { useParams } from "react-router-dom";
import { CenterSpin } from "~/common/CenterSpin";
import { IApp } from "~/model";
import { useMe } from "~/plugin-sdk";
import { AppContext } from "~/plugin-sdk/contexts/app";
import { useFrameUuid } from "../hooks/useFrameUuid";
import { usePluginComponents } from "../hooks/usePluginComponents";
import { useQueryUiFrame } from "../hooks/useQueryUiFrame";
import { useQueryUserConfig } from "../hooks/useQueryUserConfig";
import { useShowError } from "../hooks/useShowError";

export const AppRoot = memo((
  props: {
    app: IApp,
    children?: React.ReactNode,
    pageCache?: boolean,
  }
) => {
  const { app, children, pageCache } = props;
  const { device = Device.PC } = useParams();
  const me = useMe();
  const { userConfig, loading: userConfigLoading, error: userConfigError } = useQueryUserConfig(app.id, device as any, me?.id)
  const frameUuid = useFrameUuid(app, device as Device);
  const { uiFrame, error, loading } = useQueryUiFrame(frameUuid);
  const components = usePluginComponents(app, device as Device);
  useShowError(error || userConfigError)
  const appParams = useMemo(() => {
    return {
      app: app,
      device: device as Device,
      userConfig: userConfig,
      uiFrame: uiFrame,
      components: components,
      pageCache: pageCache,
    }
  }, [app, device, userConfig, uiFrame, components, pageCache])
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