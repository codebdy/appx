import React from "react"
import clx from 'classnames'
import { IPageContainerProps } from "./IPageContainerProps"

export const PageContainer = (props: IPageContainerProps) => {
  const { children, className, ...other } = props
  return (
    <div className={clx(className, 'rx_page_container')} {...other}>{children}</div>
  )
}