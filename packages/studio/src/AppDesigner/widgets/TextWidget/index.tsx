import React, { Fragment } from 'react'
import { IDesignerMiniLocales } from '@designable/core'
import { observer } from '@formily/reactive-react'
import { takeMessage } from '../../../locales/getMessage'

export interface ITextWidgetProps {
  componentName?: string
  sourceName?: string
  token?: string | IDesignerMiniLocales
  defaultMessage?: string | IDesignerMiniLocales
}

export const TextWidget: React.FC<ITextWidgetProps> = observer((props) => {

  return (
    <Fragment>
      {takeMessage(props.children) ||
        takeMessage(props.token) ||
        takeMessage(props.defaultMessage)}
    </Fragment>
  )
})
