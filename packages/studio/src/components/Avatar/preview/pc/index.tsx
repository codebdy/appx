import { observer } from "@formily/reactive-react"
import { IIcon } from "../../../../shared/icon/model"
import React from "react"
import { Avatar as AntdAvatar } from "antd"
import { IconView } from "../../../../shared/icon/IconView"
import { UserOutlined } from "@ant-design/icons"

export interface IAvatarProps {
  icon?: IIcon,
  value?: string,
}

export const Avatar = observer((props: IAvatarProps) => {
  const { icon, value, ...other } = props;
  return (
    <AntdAvatar {...other} icon={(icon && <IconView icon={icon} />) || <UserOutlined />} src={value}>
    </AntdAvatar>
  )
})