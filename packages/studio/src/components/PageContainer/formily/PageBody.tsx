import React from "react"
import clx from 'classnames'
import { IComponentProps } from "../common"

export interface IPageBodyProps extends IComponentProps{
  children?: React.ReactNode
}

export const PageBody = (props: IPageBodyProps) => {
  const { children, className, ...other } = props
  return (
    <div className={clx(className, 'rx_page_body')} {...other}>{children}</div>
  )
}