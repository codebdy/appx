import { observer } from "@formily/reactive-react"
import { IIcon } from '../../../plugin-sdk/icon/model'
import React, { CSSProperties, useMemo, useState } from "react"
import { IDropdownMenuItemProps, MenuItem } from "./MenuItem"
import { IconView } from "../../../plugin-sdk/icon/IconView"
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
  const { icon, title, showDropdownIcon, placement, trigger, children, ...other } = props;
  const [loading, setLoading] = useState(false);
  const p = useParseLangMessage();
  
  const contextValue = useMemo(() => {
    return { loading, setLoading }
  }, [loading])

  return (
    <DropdownContext.Provider value={contextValue}>
      <Dropdown overlay={<Menu>{children}</Menu>} placement={placement} trigger={trigger}>
        {
          showDropdownIcon
            ?
            <Button
              icon={icon && <IconView icon={icon} />}
              {...other}
              loading={loading}
            >
              {
                p(title)
              }
              <DownOutlined />
            </Button>
            :
            <Button
              icon={icon && <IconView icon={icon} />}
              {...other}
              loading={loading}
            >
              {
                p(title)
              }
            </Button>
        }

      </Dropdown>
    </DropdownContext.Provider>
  )
})

DropdownMenu.Item = MenuItem