import React from "react"
import clx from 'classnames'

export interface IListHeaderProps{
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ListHeader = (props: IListHeaderProps) => {
  const { children, className, ...other } = props
  return (
    <div className={clx(className, 'appx-grid-list-header')} {...other}>{children}</div>
  )
}