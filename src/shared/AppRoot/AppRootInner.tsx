import { Spin } from 'antd'
import 'antd/dist/antd.less'
import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryLangLocales } from '../../hooks/useQueryLangLocales'
import { useQueryAppConfig } from '../../hooks/useQueryAppConfig'
import { useShowError } from '~/hooks/useShowError'
import { AppContext } from '@rxdrag/plugin-sdk/contexts/appRoot'
import { useQueryAppDeviceConfig } from '../../hooks/useQueryAppDeviceConfig'
import { useMe } from '@rxdrag/plugin-sdk/contexts/login'
import { useQueryUserConfig } from './hooks/useQueryUserConfig'
import { Device } from '@rxdrag/appx-plugin-sdk'
import { useQueryMaterialConfig } from './hooks/useQueryMaterialConfig'
import { useIntalledPlugins } from '../../plugin/hooks/useIntalledPlugins'
import { IApp, PluginType } from '~/model'
import { MaterialTabRoot } from '~/material/MaterialTabRoot'

export const AppRootInner = memo((
  props: {
    app: IApp,
    children: React.ReactNode
  }
) => {
  const { app } = props;
  const { device = Device.PC } = useParams();
  const me = useMe();
  const appId = app.id;
  const { config, loading: configLoading, error: configError } = useQueryAppConfig(appId);
  const { deviceConfig, loading: deviceLoading, error: deviceError } = useQueryAppDeviceConfig(appId, device as any)
  const { langLocales, loading: localLoading, error: localError } = useQueryLangLocales(appId);
  const { userConfig, loading: userConfigLoading, error: userConfigError } = useQueryUserConfig(appId, device as any, me?.id)
  const { materialConfig, loading: materialConfigLoading, error: materialConfigError } = useQueryMaterialConfig(appId, device as any)
  const { plugins, loading: pluginLoading, error: pluginError } = useIntalledPlugins(appId);
  useShowError(configError || localError || deviceError || userConfigError || materialConfigError || pluginError);

  const debugPlugins = useMemo(
    () => plugins?.filter(plugin => plugin.pluginInfo?.type === PluginType.debug) || [],
    [plugins]);

  const contextValue = useMemo(() => {
    return {
      app: app,
      device: device as Device,
      config,
      langLocales,
      deviceConfig: deviceConfig,
      userConfig,
      uploadedPlugins: plugins?.filter(plugin => plugin.pluginInfo?.type === PluginType.uploaded) || [],
      debugPlugins: debugPlugins,
      materialConfig
    }
  }, [config, debugPlugins, device, deviceConfig, langLocales, materialConfig, plugins, app, userConfig])


  return (
    app ?
      <AppContext.Provider
        value={contextValue}
      >
        <MaterialTabRoot>
          <Spin
            style={{ height: "100vh" }}
            spinning={
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



