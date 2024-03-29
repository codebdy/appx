import { observer } from "@formily/reactive-react"
import AppxButton, { IButtonProps } from "../../Button/view"
import React from "react"
import { DownOutlined } from "@ant-design/icons"

export type ButtonProps = IButtonProps & {
  showDropdownIcon?: boolean,
}

export const Button = observer((props: ButtonProps) => {
  const { showDropdownIcon, ...other } = props;
  return (
    <AppxButton {...other}>
      {
        showDropdownIcon && <DownOutlined />
      }
    </AppxButton>
  )
})