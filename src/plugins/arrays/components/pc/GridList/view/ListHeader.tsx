import React from "react"
import clx from 'classnames'

export interface IListHeaderProps{
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  value?: any,
  onChange?: (value: any) => void //这个必须要过滤出来
}

export const ListHeader = (props: IListHeaderProps) => {
  const { children, className, onChange, value, ...other } = props
  return (
    <div className={clx(className, 'appx-grid-list-header')} {...other}>{children}</div>
  )
}