import { observer } from "@formily/reactive-react"
import React from "react"
import { List } from "antd"
import { IListBodyProps } from "../../view/ListBody"
import './styles.less'

const data = [{}]
export const ListBodyDesigner = observer((props: IListBodyProps) => {
  const { gutter, grid, className, children, ...other } = props

  return (
    <List
      {...other}
      grid={{ gutter, ...grid }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          {
            children ? children : <div className="appx-grid-list-placeholder">Drop here</div>
          }
        </List.Item>
      )}
    />
  )
})