import { Tabs } from 'antd';
import React, { useRef, useState } from 'react';
const initialItems = [
  {
    label: 'Tab 1',
    children: <div>
      Content of Tab 1<br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v 
      Content of Tab 1<br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v 
      Content of Tab 1<br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v 
      Content of Tab 1<br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v 
      Content of Tab 1<br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v 
      Content of Tab 1<br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v <br/>ff v 
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

export const MaterialTabs = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: 'New Tab',
      children: 'Content of new Tab',
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);

    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }

    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
    />
  );
};
