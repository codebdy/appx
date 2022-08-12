import { Spin } from 'antd'
import 'antd/dist/antd.less'
import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useApp } from '../../hooks/useApp'
import { useShowError } from '../../hooks/useShowError'
import { Device } from '../../model'
import { AppContext } from './context'

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
        <Spin style={{ height: "100vh" }} spinning={loading}>
          {app && props.children}
        </Spin>
      </AppContext.Provider>
      : <></>
  )
})

export default AppRoot;



