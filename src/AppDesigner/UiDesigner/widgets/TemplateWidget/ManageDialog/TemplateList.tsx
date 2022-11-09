import { List } from "antd";
import React from "react";
import { memo } from "react"

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
export const TemplateList = memo(() => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item
          actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
        >
          <List.Item.Meta
            //avatar={<Avatar src={item.picture.large} />}
            title={item.title}
          />
        </List.Item>
      )}
    />
  )
})