import React from "react"
import { Button as AntdButton, ButtonProps } from "antd"

export type IButtonProps = ButtonProps & React.RefAttributes<HTMLElement> & { title?: string }

const Button = (
  props: IButtonProps
) => {
  const { title, children, ...other } = props;
  return (
    <AntdButton {...other}>
      {title} {children}
    </AntdButton>
  )
}

export default Button