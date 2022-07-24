import React, { useContext } from 'react'
import { Layout, usePrefix, usePosition } from "@designable/react"
import {
  useCurrentNode,
  useWorkbench,
} from '@designable/react'

import cls from 'classnames'
export interface IStudioPanelProps {
  style?: React.CSSProperties
  className?: string
  logo?: React.ReactNode
  actions?: React.ReactNode
  prefixCls?: string
  theme?: string
  position?: React.ComponentProps<typeof Layout>['position']
}

const StudioPanelInternal: React.FC<IStudioPanelProps> = ({
  logo,
  actions,
  ...props
}) => {
  const prefix = usePrefix('main-panel')
  const position = usePosition()
  const workbench = useWorkbench()
  const currentWorkspace =
    workbench?.activeWorkspace || workbench?.currentWorkspace
  const currentWorkspaceId = currentWorkspace?.id
  const node = useCurrentNode(currentWorkspaceId)
  const classNameBase = cls('root', position, props.className)
  if (logo || actions) {
    return (
      <div
        {...props}
        className={cls(`${prefix}-container`, classNameBase)}
      >
        <div className={prefix + '-header'}>
          <div className={prefix + '-header-logo'}>{logo}</div>
          <div className={prefix + '-header-actions'}>{actions}</div>
        </div>
        <div className={prefix}>{props.children}</div>
      </div>
    )
  }
  return (
    <div {...props} className={cls(prefix, classNameBase)}>
      {props.children}
    </div>
  )
}

export const StudioPanel: React.FC<IStudioPanelProps> = (props) => {
  return (
    <Layout
      theme={props.theme}
      prefixCls={props.prefixCls}
      position={props.position}
    >
      <StudioPanelInternal {...props} />
    </Layout>
  )
}
