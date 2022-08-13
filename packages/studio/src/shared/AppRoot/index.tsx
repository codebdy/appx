import { Spin } from 'antd'
import 'antd/dist/antd.less'
import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../hooks/useApp'
import { useShowError } from '../../hooks/useShowError'
import { Device } from '../../model'
import { AppContext } from './context'
import { AppConfigContext } from './context/config'

const AppRoot = memo((
  props: {
    children: React.ReactNode
  }
) => {
  const { appUuid, device } = useParams();
  const { app, loading, error } = useApp(appUuid)
  useShowError(error);

  return (
    app ?
      <AppContext.Provider value={{ app: app, device: device as Device }}>
        <AppConfigContext.Provider value={app.config}>
          <Spin style={{ height: "100vh" }} spinning={loading}>
            {app && props.children}
          </Spin>
        </AppConfigContext.Provider>
      </AppContext.Provider>
      : <></>
  )
})

export default AppRoot;



