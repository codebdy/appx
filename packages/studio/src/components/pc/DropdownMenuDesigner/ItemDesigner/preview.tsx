import React, {  } from 'react'
import {
  DnFC,
} from '@designable/react'
import { observer } from '@formily/reactive-react'
import { Menu, MenuItemProps } from 'antd'

export const ItemDesigner: DnFC<MenuItemProps> = observer((props) => {
  const { icon, ...other } = props;

  return (
    <Menu.Item {...other} />
  )
})
