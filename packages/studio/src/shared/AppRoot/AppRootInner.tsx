import { Spin } from 'antd'
import 'antd/dist/antd.less'
import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../hooks/useApp'
import { useQueryLangLocales } from '../../hooks/useQueryLangLocales'
import { useQueryAppConfig } from '../../hooks/useQueryAppConfig'
import { useShowError } from '../../hooks/useShowError'
import { Device } from '../../model'
import { AppContext } from './context'
import { SYSTEM_APP_UUID } from '../../consts'
import { useQueryAppDeviceConfig } from '../../hooks/useQueryAppDeviceConfig'
import { useMe } from '../../Login/context'
import { useQueryUserConfig } from './hooks/useQueryUserConfig'


export const AppRootInner = memo((
  props: {
    children: React.ReactNode
  }
) => {
  const { appUuid = SYSTEM_APP_UUID, device = Device.PC } = useParams();
  const me = useMe();
  const { app, loading, error } = useApp(appUuid)
  const { config, loading: configLoading, error: configError } = useQueryAppConfig(appUuid);
  const { deviceConfig, loading: deviceLoading, error: deviceError } = useQueryAppDeviceConfig(appUuid, device as any)
  const { langLocales, loading: localLoading, error: localError } = useQueryLangLocales(appUuid);
  const { userConfig, loading: useConfigLoading, error: useConfigError } = useQueryUserConfig(appUuid, device as any, me?.id)
  useShowError(error || configError || localError || deviceError || useConfigError);

  const realApp = useMemo(() => {
    return appUuid === SYSTEM_APP_UUID ? { id: "System", uuid: SYSTEM_APP_UUID, title: "System" } : app
  }, [app, appUuid])

  return (
    realApp ?
      <AppContext.Provider
        value={{
          app: realApp,
          device: device as Device,
          config,
          langLocales,
          deviceConfig: deviceConfig,
          userConfig
        }}
      >
        <Spin style={{ height: "100vh" }} spinning={loading || configLoading || localLoading || deviceLoading || useConfigLoading}>
          {props.children}
        </Spin>
      </AppContext.Provider>
      : <></>
  )
})



