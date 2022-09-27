import React, { } from 'react'
import {
  DnFC,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import clx from "classnames";
import { IconView, useParseLangMessage } from '../../../../../../../plugin-sdk'
import { IDropdownMenuItemProps } from '../../view/MenuItem';

export const MenuItemDesigner: DnFC<IDropdownMenuItemProps> = observer((props) => {
  const { className, icon, title, onClick, ...other } = props;
  const p = useParseLangMessage();
  return (
    <div className={clx('menu-item', className)} {...other}>
      {
        icon &&
        <div className='dropdown-menu-item-icon'>
          <IconView icon={icon} />
        </div>
      }
      <div className='menu-item-text'>
        {p(title)}
      </div>
    </div>
  )
})
