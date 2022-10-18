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
    tokenName: string | undefined,
  }
) => {
  const { tokenName, appUuid } = useParams();
  const token = useToken();
  const config = useMemo(() => {
    const localStorageToken = localStorage.getItem(tokenName)
    return {
      endpoint: SERVER_URL,
      appUuid: props.appUuid || appUuid,
      token: token || localStorageToken,
      tokenName
    }
  }, [props.appUuid, token, tokenName])

  return (
    <EntiRoot config={config} >
      <AppRootInner>
        {props.children}
      </AppRootInner>
    </EntiRoot>
  )
})

export default AppRoot;



