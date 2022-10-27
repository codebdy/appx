import 'antd/dist/antd.less'
import React, { memo, useMemo } from 'react'
import { DESIGNER_TOKEN_NAME, SERVER_URL, SYSTEM_APP_ID } from '~/consts'
import { EntiRoot, useToken } from '~/enthooks'
import { IApp } from '~/model'
import { DesignerRootInner } from './DesignerRootInner'

const AppDesignerRoot = memo((
  props: {
    children: React.ReactNode,
    app: IApp,
  }
) => {
  const { app } = props;
  const token = useToken();
  const config = useMemo(() => {
    const localStorageToken = localStorage.getItem(DESIGNER_TOKEN_NAME)
    return {
      endpoint: SERVER_URL,
      appId: app.id,
      token: token || localStorageToken,
      tokenName: DESIGNER_TOKEN_NAME,
    }
  }, [app, SERVER_URL, token])

  return (
    <EntiRoot config={config} >
      <DesignerRootInner app={app}>
        {props.children}
      </DesignerRootInner>
    </EntiRoot>
  )
})

export default AppDesignerRoot;



