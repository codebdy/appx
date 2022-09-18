import { PlusOutlined } from '@ant-design/icons';
import { Button, Collapse, Tabs } from 'antd';
import { IMaterialTab } from '../../../../material-sdk/model';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TabsEditDialog } from './TabsEditDialog';
const { Panel } = Collapse;

export const MaterialTabs = memo((
  props: {
    tabs: IMaterialTab[],
    onTabsChange: (tabs: IMaterialTab[]) => void,
  }
) => {
  const { tabs, onTabsChange } = props;
  const { t } = useTranslation();
  const initialItems = [
    {
      label: 'Tab 1',
      children:
        <div style={{ paddingRight: 16 }}>
          <Collapse defaultActiveKey={['1']} ghost bordered={false}>
            <Panel header="This is panel header 1" key="1">
              <p>43434</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>34343434</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>vvvv</p>
            </Panel>
          </Collapse>
          <Button type='dashed' block icon={<PlusOutlined />}>{t("Materials.Add")}</Button>
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
