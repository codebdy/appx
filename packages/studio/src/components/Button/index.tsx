import React from "react"
import { Button as AntdButton, ButtonProps } from "antd"

export type IButtonProps = ButtonProps &
  React.RefAttributes<HTMLElement> & {
    title?: React.ReactElement
  }

const Button = (
  props: IButtonProps
) => {
  const { title, ...other } = props;
  return (
    <AntdButton {...other}>
      {title}
    </AntdButton>
  )
}

export default Button