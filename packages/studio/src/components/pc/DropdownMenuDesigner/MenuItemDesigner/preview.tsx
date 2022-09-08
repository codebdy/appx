import React, { } from 'react'
import {
  DnFC,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import { Menu, MenuItemProps } from 'antd'
import { IIcon } from '../../../../shared/icon/model'
import { IDropdownMenuItemProps } from '../../DropdownMenu'

export const MenuItemDesigner: DnFC<IDropdownMenuItemProps> = observer((props) => {
  const { icon, title, ...other } = props;

  return (
    <div {...other}>
      xxxxx
      {title}
    </div>
  )
})
