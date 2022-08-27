import React from "react"
import clx from 'classnames'
import { IPageContainerProps } from "./IPageContainerProps"

export const PageContainerShell = (props: IPageContainerProps) => {
  const { children, className, ...other } = props
  return (
    <div className={clx(className, 'rx-page-container')} {...other}>{children}</div>
  )
}