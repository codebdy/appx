import 'antd/dist/antd.less'
import React, { memo } from 'react'
import {
  setNpmCDNRegistry,
} from '@designable/react-settings-form'
import AppDesignerContent from './AppDesignerContent'
import AppRoot from '../shared/AppRoot'

setNpmCDNRegistry('//unpkg.com')

const AppDesigner = memo(() => {

  return (
    <AppRoot>
      <AppDesignerContent />
    </AppRoot>
  )
})

export default AppDesigner;



