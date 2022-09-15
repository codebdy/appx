import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import React from "react"
import { Avatar as AntdAvatar } from "antd"
import { IconView } from "../../../../shared/icon/IconView"
import { UserOutlined } from "@ant-design/icons"

export interface IAvatarProps {
  icon?: IIcon,
  value?: string,
  size?: number,
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