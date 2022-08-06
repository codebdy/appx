import React from "react"
import clx from 'classnames'
import { IComponentProps } from "../common"

export interface IPageContainerProps extends IComponentProps{
  children?: React.ReactNode
}

export const PageContainer = (props: IPageContainerProps) => {
  const { children, className, ...other } = props
  return (
    <div className={clx(className, 'rx_page_container')} {...other}>{children}</div>
  )
}