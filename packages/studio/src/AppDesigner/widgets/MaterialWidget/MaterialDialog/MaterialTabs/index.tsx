import { Tabs } from 'antd';
import { IMaterialTab } from '../../../../../material-sdk/model';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { TabsEditDialog } from '../TabsEditDialog';
import { useParseLangMessage } from '../../../../../hooks/useParseLangMessage';
import { MaterialTab } from './MaterialTab';

export const MaterialTabs = memo((
  props: {
    tabs: IMaterialTab[],
    onTabsChange: (tabs: IMaterialTab[]) => void,
  }
) => {
  const { tabs, onTabsChange } = props;
  const p = useParseLangMessage();
  const [activeKey, setActiveKey] = useState(tabs[0]?.uuid);

  const handleTabChange = useCallback((tab: IMaterialTab) => {
    onTabsChange(tabs.map(tb => tb.title === tab.title ? tab : tb))
  }, [onTabsChange, tabs])

  console.log("哈哈", tabs)

  const items = useMemo(() => tabs.map(tab => {
    return {
      label: p(tab.title),
      children: <MaterialTab tab={tab} onChange={handleTabChange} />,
      key: tab.uuid,
    }
  }), [handleTabChange, p, tabs])

  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };

  return (
    <Tabs
      onChange={onChange}
      activeKey={activeKey}
      items={items}
      tabBarExtraContent={<TabsEditDialog tabs={tabs} onTabsChange={onTabsChange} />}
    />
  );
});
