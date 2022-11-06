import { Device } from "@rxdrag/appx-plugin-sdk";
import React, { memo, useMemo } from "react"
import { useParams } from "react-router-dom";
import { CenterSpin } from "~/common/CenterSpin";
import { DESIGNER_TOKEN_NAME, SERVER_URL } from "~/consts";
import { EntiRoot, useToken } from "~/enthooks";
import { IApp } from "~/model";
import { useMe } from "~/plugin-sdk";
import { AppContext } from "~/plugin-sdk/contexts/app";
import { useFrameUuid } from "../hooks/useFrameUuid";
import { usePluginComponents } from "../hooks/usePluginComponents";
import { useQueryComponentAuthConfigs } from "../hooks/useQueryComponentAuthConfigs";
import { useQueryMenuAuthConfigs } from "../hooks/useQueryMenuAuthConfigs";
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
  const { menuAuthConfigs, loading: menuAuthLoading, error: menuAuthError } = useQueryMenuAuthConfigs(app.id, device as Device);
  const { comAuthConfigs, loading: comAuthLoading, error: comAuthError } = useQueryComponentAuthConfigs(app.id, device as Device);
  const frameUuid = useFrameUuid(app, device as Device);
  const { uiFrame, error, loading } = useQueryUiFrame(frameUuid, app.id);
  const components = usePluginComponents(app, device as Device);
  useShowError(error || userConfigError)
  const token = useToken();
  const appParams = useMemo(() => {
    return {
      app: app,
      device: device as Device,
      userConfig: userConfig,
      uiFrame: uiFrame,
      components: components,
      pageCache: pageCache,
      menuAuthConfigs,
      componentAuthConfigs:comAuthConfigs
    }
  }, [app, device, userConfig, uiFrame, components, pageCache, menuAuthConfigs, comAuthConfigs])
  const config = useMemo(() => {
    const localStorageToken = localStorage.getItem(DESIGNER_TOKEN_NAME)
    return {
      endpoint: SERVER_URL,
      appId: app.id,
      token: token || localStorageToken,
      tokenName: DESIGNER_TOKEN_NAME,
    }
  }, [app, SERVER_URL, token])


  const isLoading = useMemo(() => loading || userConfigLoading, [loading, userConfigLoading])
  return (
    isLoading ?
      <CenterSpin />
      :
      <EntiRoot config={config} >
        <AppContext.Provider value={appParams}>
          {
            children
          }
        </AppContext.Provider>
      </EntiRoot>

  )
})