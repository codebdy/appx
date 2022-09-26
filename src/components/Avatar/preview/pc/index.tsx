import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../plugin-sdk/icon/model"
import React from "react"
import { Avatar as AntdAvatar } from "antd"
import { IconView } from "../../../../plugin-sdk/icon/IconView"
import { UserOutlined } from "@ant-design/icons"

export interface IAvatarProps {
  icon?: IIcon,
  value?: string,
  size?: number,
  shape?: "circle" | "square",
}

export const Avatar = observer((props: IAvatarProps) => {
  const { icon, value, size, ...other } = props;
  return (
    <AntdAvatar
      {...other}
      size={size ? size : undefined}
      icon={(icon && <IconView icon={icon} />) || <UserOutlined />}
      src={value}
    >
    </AntdAvatar>
  )
})