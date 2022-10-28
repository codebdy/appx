import React from 'react'
import { Space as FormilySpace } from '@formily/antd'
import { DnFC } from '@designable/react'
import { withContainer } from '@designable/formily-antd/lib/common/Container'

const ComponentDesigner: DnFC<React.ComponentProps<typeof FormilySpace>> =
  withContainer(FormilySpace)

export default ComponentDesigner;
