import 'antd/dist/antd.less'
import React, { memo } from 'react'
import {
  setNpmCDNRegistry,
} from '@designable/react-settings-form'
import AppDesignerContent from './AppDesignerContent'
import AppRoot from '../shared/AppRoot'
import { DESIGNER_TOKEN_NAME } from '../consts'

setNpmCDNRegistry('//unpkg.com')

const AppDesigner = memo(() => {

  return (
    <AppRoot tokenName={DESIGNER_TOKEN_NAME}>
      <AppDesignerContent />
    </AppRoot>
  )
})

export default AppDesigner;



