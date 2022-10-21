import { Spin } from 'antd'
import 'antd/dist/antd.less'
import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryApp } from '../../hooks/useQueryApp'
import { useQueryLangLocales } from '../../hooks/useQueryLangLocales'
import { useQueryAppConfig } from '../../hooks/useQueryAppConfig'
import { useShowError } from '~/hooks/useShowError'
import { AppContext } from '@rxdrag/plugin-sdk/contexts/appRoot'
import { SYSTEM_APP_ID } from '~/consts'
import { useQueryAppDeviceConfig } from '../../hooks/useQueryAppDeviceConfig'
import { useMe } from '@rxdrag/plugin-sdk/contexts/login'
import { useQueryUserConfig } from './hooks/useQueryUserConfig'
import { Device } from '@rxdrag/appx-plugin-sdk'
import { useQueryMaterialConfig } from './hooks/useQueryMaterialConfig'
import { useIntalledPlugins } from '../../plugin/hooks/useIntalledPlugins'
import { PluginType } from '~/model'
import { MaterialTabRoot } from '~/material/MaterialTabRoot'

export const AppRootInner = memo((
  props: {
    children: React.ReactNode
  }
) => {
  const { appUuid = SYSTEM_APP_ID, device = Device.PC } = useParams();
  const me = useMe();
  const { app, loading, error } = useQueryApp(appUuid)
  const { config, loading: configLoading, error: configError } = useQueryAppConfig(appUuid);
  const { deviceConfig, loading: deviceLoading, error: deviceError } = useQueryAppDeviceConfig(appUuid, device as any)
  const { langLocales, loading: localLoading, error: localError } = useQueryLangLocales(appUuid);
  const { userConfig, loading: userConfigLoading, error: userConfigError } = useQueryUserConfig(appUuid, device as any, me?.id)
  const { materialConfig, loading: materialConfigLoading, error: materialConfigError } = useQueryMaterialConfig(appUuid, device as any)
  const { plugins, loading: pluginLoading, error: pluginError } = useIntalledPlugins(appUuid);
  useShowError(error || configError || localError || deviceError || userConfigError || materialConfigError || pluginError);

  const realApp = useMemo(() => {
    return appUuid === SYSTEM_APP_ID ? { id: "System", uuid: SYSTEM_APP_ID, title: "System" } : app
  }, [app, appUuid])

  const debugPlugins = useMemo(
    () => plugins?.filter(plugin => plugin.pluginInfo?.type === PluginType.debug) || [],
    [plugins]);

  const contextValue = useMemo(() => {
    return {
      app: realApp,
      device: device as Device,
      config,
      langLocales,
      deviceConfig: deviceConfig,
      userConfig,
      uploadedPlugins: plugins?.filter(plugin => plugin.pluginInfo?.type === PluginType.uploaded) || [],
      debugPlugins: debugPlugins,
      materialConfig
    }
  }, [config, debugPlugins, device, deviceConfig, langLocales, materialConfig, plugins, realApp, userConfig])


  return (
    realApp ?
      <AppContext.Provider
        value={contextValue}
      >
        <MaterialTabRoot>
          <Spin
            style={{ height: "100vh" }}
            spinning={
              loading ||
              configLoading ||
              localLoading ||
              deviceLoading ||
              userConfigLoading ||
              materialConfigLoading ||
              pluginLoading
            }
          >
            {props.children}
          </Spin>
        </MaterialTabRoot>
      </AppContext.Provider>
      : <></>
  )
})



