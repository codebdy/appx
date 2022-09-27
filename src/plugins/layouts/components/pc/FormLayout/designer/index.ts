import React from 'react'
import { FormLayout as FormilyFormLayout } from '@formily/antd'
import { DnFC } from '@designable/react'
import { withContainer } from '@designable/formily-antd/lib/common/Container'

const FormLayoutDesigner: DnFC<React.ComponentProps<typeof FormilyFormLayout>> =
  withContainer(FormilyFormLayout)

export default FormLayoutDesigner;
