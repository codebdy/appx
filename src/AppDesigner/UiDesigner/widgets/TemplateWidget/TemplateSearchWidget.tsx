import { Input } from "antd"
import React from "react"

const { Search } = Input;

export const TemplateSearchWidget: React.FC = () => {
  return (
    <div className="search-widget">
      <Search allowClear style={{ flex: 1 }} size="middle" />
    </div>
  )
}