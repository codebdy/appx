import { Tabs } from 'antd';
import React from 'react';

export const MaterialTabs: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </Tabs.TabPane>
    </Tabs>
  )
};