import React from 'react'
import { Space, Typography, Divider, TypographyProps } from 'antd'
import { observer } from '@formily/reactive-react'
import { useTreeNode, useSelected } from '@designable/react'
import cls from 'classnames'
import './styles.less'
import { usePrefix, IconWidget, TextWidget } from "@designable/react"

export interface INodeActionsWidgetProps {
  className?: string
  style?: React.CSSProperties
  activeShown?: boolean
}

export interface INodeActionsWidgetActionProps
  extends Omit<React.ComponentProps<'a'>, 'title' | 'type' | 'ref'>,
    Partial<TypographyProps['Link']> {
  className?: string
  style?: React.CSSProperties
  title: React.ReactNode
  icon?: React.ReactNode
}

export const NodeActionsWidget: React.FC<INodeActionsWidgetProps> & {
  Action?: React.FC<INodeActionsWidgetActionProps>
} = observer((props) => {
  const node = useTreeNode()
  const prefix = usePrefix('node-actions')
  const selected = useSelected()
  if (selected.indexOf(node.id) === -1 && props.activeShown) return null
  return (
    <div className={cls(prefix, props.className)} style={props.style}>
      <div className={prefix + '-content'}>
        <Space split={<Divider type="vertical" />}>{props.children}</Space>
      </div>
    </div>
  )
})

NodeActionsWidget.Action = ({ icon, title, ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prefix = usePrefix('node-actions-item')
  return (
    <Typography.Link
      {...props}
      className={cls(props.className, prefix)}
      data-click-stop-propagation="true"
    >
      <span className={prefix + '-text'}>
        <IconWidget infer={icon} />
        <TextWidget>{title}</TextWidget>
      </span>
    </Typography.Link>
  )
}
