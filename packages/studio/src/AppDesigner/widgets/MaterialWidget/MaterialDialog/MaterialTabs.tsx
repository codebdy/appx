import { Tabs } from 'antd';
import React, { memo, useState } from 'react';
import { TabsEditDialog } from './TabsEditDialog';
const initialItems = [
  {
    label: 'Tab 1',
    children: <div>
      Content of Tab 1<br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v
      Content of Tab 1<br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v
      Content of Tab 1<br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v
      Content of Tab 1<br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v
      Content of Tab 1<br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v
      Content of Tab 1<br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v <br />ff v
    </div>,
    key: '1',
  },
  {
    label: 'Tab 2',
    children: 'Content of Tab 2',
    key: '2',
  },
  {
    label: 'Tab 3',
    children: 'Content of Tab 3',
    key: '3',
  },
  {
    label: 'Tab 4',
    children: 'Content of Tab 3',
    key: '4',
  },
];

export const MaterialTabs = memo(() => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  return (
    <Tabs
      onChange={onChange}
      activeKey={activeKey}
      items={items}
      tabBarExtraContent={<TabsEditDialog />}
    />
  );
});
