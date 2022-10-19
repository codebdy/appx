import 'antd/dist/antd.less'
import React, { memo } from 'react'
import {
  setNpmCDNRegistry,
} from '@designable/react-settings-form'
import UiDesignerContent from './UiDesignerContent'
import AppRoot from '../shared/AppRoot'
import { DESIGNER_TOKEN_NAME } from '../consts'

setNpmCDNRegistry('//unpkg.com')

const UiDesigner = memo(() => {

  return (
    <AppRoot tokenName={DESIGNER_TOKEN_NAME}>
      <UiDesignerContent />
    </AppRoot>
  )
})

export default UiDesigner;



