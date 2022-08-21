import React from "react"
import { Button as AntdButton, ButtonProps } from "antd"
import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import { IconView } from "../../../../shared/icon/IconView"

export type IButtonProps = ButtonProps &
  React.RefAttributes<HTMLElement> & {
    title?: React.ReactElement,
    icon?: IIcon
  }

export const Button = observer((
  props: IButtonProps
) => {
  const { title, icon, ...other } = props;
  return (
    <AntdButton {...other} icon={<IconView icon={icon} />}>
      {title}
    </AntdButton>
  )
})
