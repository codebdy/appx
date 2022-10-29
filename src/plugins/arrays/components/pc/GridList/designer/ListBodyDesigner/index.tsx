import { observer } from "@formily/reactive-react"
import React from "react"
import { List } from "antd"
import { IListBodyProps } from "../../view/ListBody"
import './styles.less'
import {
  useTreeNode,
  TreeNodeWidget
} from '@designable/react'

const data = [{}]
export const ListBodyDesigner = observer((props: IListBodyProps) => {
  const { gutter, grid, className, children, ...other } = props
  const node = useTreeNode();
  return (
    <List
      {...other}
      grid={{ gutter, ...grid }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          {
            node.children
              ? node.children?.map((node) => {
                return <TreeNodeWidget node={node} />;
              })
              : <div className="appx-grid-list-placeholder">Drop here</div>
          }
        </List.Item>
      )}
    />
  )
})