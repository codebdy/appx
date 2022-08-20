import React from "react"
import { Button as AntdButton, ButtonProps } from "antd"
import { observer } from "@formily/reactive-react"

export type IButtonProps = ButtonProps &
  React.RefAttributes<HTMLElement> & {
    title?: React.ReactElement
  }

export const Button = observer((
  props: IButtonProps
) => {
  const { title, ...other } = props;
  return (
    <AntdButton {...other}>
      {title}
    </AntdButton>
  )
})
