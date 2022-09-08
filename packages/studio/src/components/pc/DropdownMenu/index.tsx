import { observer } from "@formily/reactive-react"
import { IIcon } from '../../../shared/icon/model'
import React, { CSSProperties, useState } from "react"
import { IDropdownMenuItemProps, MenuItem } from "./MenuItem"
import { IconView } from "../../../shared/icon/IconView"
import { Button, Dropdown, Menu } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { useParseLangMessage } from "../../../hooks/useParseLangMessage"
import { DropdownContext } from "./context"

export interface IDropdownMenuProps {
  title?: string,
  icon?: IIcon,
  style?: CSSProperties,
  showDropdownIcon?: boolean,
  placement?: "bottom" | "bottomLeft" | "bottomRight" | "top" | "topLeft" | "topRight",
  trigger?: Array<"click" | "hover" | "contextMenu">,
  children?: React.ReactNode,
}

export const DropdownMenu: React.FC<IDropdownMenuProps> & {
  Item?: React.FC<IDropdownMenuItemProps>
} = observer((props) => {
  const { style, icon, title, showDropdownIcon, placement, trigger, children, ...other } = props;
  const [loading, setLoading] = useState(false);
  const p = useParseLangMessage();

  return (
    <DropdownContext.Provider value={{ loading, setLoading }}>
      <Dropdown overlay={<Menu>{children}</Menu>} placement={placement} trigger={trigger}>
        <Button
          icon={icon && <IconView icon={icon} />}
          style={{ ...style, position: "relative" }}
          {...other}
          loading = {loading}
        >
          {
            p(title)
          }
          {
            showDropdownIcon &&
            <DownOutlined />
          }
        </Button>
      </Dropdown>
    </DropdownContext.Provider>
  )
})

DropdownMenu.Item = MenuItem