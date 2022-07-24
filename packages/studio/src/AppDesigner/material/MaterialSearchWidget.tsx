import { Input, MenuProps } from "antd"
import React from "react"
import "./index.less"

const handleMenuClick: MenuProps['onClick'] = e => {
  console.log('click', e);
};

const { Search } = Input;

export const MaterialSearchWidget: React.FC = () => {
  return (
    <div className="search-widget">
      <Search allowClear style={{ flex: 1 }} size="middle" />
    </div>
  )
}