import { SettingOutlined } from "@ant-design/icons"
import { Button, Card, List, Tabs } from "antd"
import React from "react"

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

export const NotificationBox = () => {
  return (
    <Card
      className="notificaiton-box float"
      actions={[
        <div className="actions">
          <Button type="text" icon={<SettingOutlined />}>设置</Button>
          <Button type="text" >查看更多消息</Button>
        </div>
      ]}
    >
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            {item.title}
            <List.Item.Meta
              description="20分钟前"
            />
          </List.Item>
        )}
      />
    </Card>
  )
}