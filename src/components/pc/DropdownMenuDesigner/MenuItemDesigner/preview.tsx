import React, { } from 'react'
import {
  DnFC,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import clx from "classnames";
import { IDropdownMenuItemProps } from '../../DropdownMenu/MenuItem'
import { IconView } from '../../../../plugin-sdk/icon/IconView'
import { useParseLangMessage } from '../../../../hooks/useParseLangMessage';

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
