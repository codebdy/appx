import 'antd/dist/antd.less'
import React, { memo, useMemo } from 'react'
import { SERVER_URL, SYSTEM_APP_ID } from '~/consts'
import { EntiRoot, useToken } from '~/enthooks'
import { IApp } from '~/model'
import { AppRootInner } from './AppRootInner'

const AppRoot = memo((
  props: {
    children: React.ReactNode,
    app: IApp,
    tokenName: string | undefined,
  }
) => {
  const { app, tokenName } = props;
  const token = useToken();
  const config = useMemo(() => {
    const localStorageToken = localStorage.getItem(tokenName)
    return {
      endpoint: SERVER_URL,
      appId: app.id,
      token: token || localStorageToken,
      tokenName
    }
  }, [app, token, tokenName])

  return (
    <EntiRoot config={config} >
      <AppRootInner app={app}>
        {props.children}
      </AppRootInner>
    </EntiRoot>
  )
})

export default AppRoot;



