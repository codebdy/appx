import React, { memo } from 'react'
import { Button } from 'antd'
import {
  usePrefix,
  IconWidget,
} from "@designable/react"
import cls from 'classnames'
import './styles.less'

export type IMenuToolsWidgetProps = {
  className?: string
  style?: React.CSSProperties
}

export const MenuToolsWidget: React.FC<IMenuToolsWidgetProps> =
  memo((props) => {
    const prefix = usePrefix('menu-tools')

    return (
      <div style={props.style} className={cls(prefix, props.className)}>
        <Button.Group size="small" style={{ marginRight: 20 }}>
          <Button
            size="small"
            disabled={false}
            onClick={() => {

            }}
          >
            <IconWidget infer="Undo" />
          </Button>
          <Button
            size="small"
            disabled={false}
            onClick={() => {
            }}
          >
            <IconWidget infer="Redo" />
          </Button>
        </Button.Group>
        <Button.Group size="small" style={{ marginRight: 20 }}>
          <Button
            size="small"
            disabled={false}
            onClick={() => {
              
            }}
          >
            <IconWidget infer="Remove" />
          </Button>
        </Button.Group>
      </div>
    )
  })
