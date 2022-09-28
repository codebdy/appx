import { observer } from "@formily/reactive-react"
import { Menu, message } from "antd"
import React, { useCallback } from "react"
import { useDoActions } from "../../../../../../shared/action"
import { IIcon, IconView, useParseLangMessage, IAppxAction } from '../../../../../../plugin-sdk'
import { useDropdownParams } from "./context"

export interface IDropdownMenuItemProps {
  title?: string,
  icon?: IIcon,
  className?: string,
  onClick?: IAppxAction[],
}
export const MenuItem = observer((props: IDropdownMenuItemProps) => {
  const { title, icon, onClick, ...other } = props
  const { setLoading } = useDropdownParams();
  const p = useParseLangMessage();

  const doActions = useDoActions();

  const handleClick = useCallback(() => {
    if (!onClick) {
      return;
    }
    setLoading(true)
    doActions(onClick)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        error?.message && message.error(error?.message);
        error && console.error(error);
      })
      ;
  }, [doActions, onClick, setLoading])

  return (
    <Menu.Item
      icon={icon && <div style={{ marginRight: 8 }}><IconView icon={icon} /></div>}
      {...other}
      onClick={handleClick}
    >
      {p(title)}
    </Menu.Item>
  )
})