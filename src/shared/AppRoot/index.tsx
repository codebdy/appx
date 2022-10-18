import 'antd/dist/antd.less'
import React, { memo, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER_URL, SYSTEM_APP_UUID } from '../../consts'
import { EntiRoot, useToken } from '../../enthooks'
import { AppRootInner } from './AppRootInner'

const AppRoot = memo((
  props: {
    children: React.ReactNode,
    appUuid?: string,
  }
) => {
  const { appUuid } = useParams();
  const token = useToken();
  const config = useMemo(() => {
    return { endpoint: SERVER_URL, appUuid: props.appUuid || appUuid, token }
  }, [props.appUuid, token])

  return (
    <EntiRoot config={config} >
      <AppRootInner>
        {props.children}
      </AppRootInner>
    </EntiRoot>
  )
})

export default AppRoot;



