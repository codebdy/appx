import { observer } from "@formily/reactive-react"
import React from "react"
import { List } from "antd"
import {
  TreeNodeWidget,
} from '@designable/react'
import { IListBodyProps } from "../../view/ListBody"

const data = [{}]
export const ListBodyDesigner = observer((props: IListBodyProps) => {
  const {gutter, grid, className, ...other} = props

  return (
    <List
      {...other}
      grid={{ gutter, ...grid }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          {
            otherChildrenNodes?.map((child) => {
              return (
                child && <TreeNodeWidget node={child} />
              )
            })
          }
          {
            !otherChildrenNodes?.length &&
            <div className="appx-grid-list-placeholder">
              Please drop here
            </div>
          }
        </List.Item>
      )}
    />
  )
})