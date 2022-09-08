import React, { } from 'react'
import {
  DnFC,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import { Menu, MenuItemProps } from 'antd'
import { IIcon } from '../../../../shared/icon/model'
import clx from "classnames";
import { IDropdownMenuItemProps } from '../../DropdownMenu/MenuItem'

export const MenuItemDesigner: DnFC<IDropdownMenuItemProps> = observer((props) => {
  const { className, icon, title, ...other } = props;

  return (
    <div className={clx('menu-item', className)} {...other}>
      {title}
    </div>
  )
})
