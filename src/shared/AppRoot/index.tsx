import 'antd/dist/antd.less'
import React, { memo } from 'react'
import { useParams } from 'react-router-dom'
import { SERVER_URL, SYSTEM_APP_UUID } from '../../consts'
import { EntiRoot } from '../../enthooks'
import { AppRootInner } from './AppRootInner'

const AppRoot = memo((
  props: {
    children: React.ReactNode,
    appUuid?: string,
  }
) => {
  const { appUuid } = useParams();

  return (
    <EntiRoot config={{ endpoint: SERVER_URL, appUuid: props.appUuid || appUuid }} >
      <AppRootInner>
        {props.children}
      </AppRootInner>
    </EntiRoot>
  )
})

export default AppRoot;



