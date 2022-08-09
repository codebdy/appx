import 'antd/dist/antd.less'
import React, { memo } from 'react'
import {
  setNpmCDNRegistry,
} from '@designable/react-settings-form'
import { useParams } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { useShowError } from '../hooks/useShowError'
import { Spin } from 'antd'
import { DesignerContext } from './context'
import { Device } from '../model'
import AppDesignerContent from './AppDesignerContent'
import MenuDragRoot from './menu/MenuDragRoot'

setNpmCDNRegistry('//unpkg.com')

const AppDesigner = memo(() => {
  const { appUuid, device } = useParams();
  const { app, loading, error } = useApp(appUuid)
  useShowError(error);

  /*
  Promise.all(
  Array.from({ length: 10 }).map((_, index) =>
    import(`/modules/module-${index}.js`)
  )import { haha } from './../../../plugins/first/src/index';

).then((modules) => modules.forEach((module) => module.load()));
*/


  return (
    app ?
      <DesignerContext.Provider value={{ app: app, device: device as Device }}>
        <Spin style={{ height: "100vh" }} spinning={loading}>
          <MenuDragRoot>
            <AppDesignerContent />
          </MenuDragRoot>
        </Spin>
      </DesignerContext.Provider>
      : <></>
  )
})

export default AppDesigner;



