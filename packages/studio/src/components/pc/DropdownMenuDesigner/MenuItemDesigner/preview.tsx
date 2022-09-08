import React, { } from 'react'
import {
  DnFC,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import clx from "classnames";
import { IDropdownMenuItemProps } from '../../DropdownMenu/MenuItem'
import { IconView } from '../../../../shared/icon/IconView'

export const MenuItemDesigner: DnFC<IDropdownMenuItemProps> = observer((props) => {
  const { className, icon, title, onClick, ...other } = props;

  return (
    <div className={clx('menu-item', className)} {...other}>
      {
        icon &&
        <div className='dropdown-menu-item-icon'>
          <IconView icon={icon} />
        </div>
      }
      <div className='menu-item-text'>
        {title}
      </div>
    </div>
  )
})
