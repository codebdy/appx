import { MoreOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PageList from './PageList';
import "./style.less"

const ListWidget = memo((
  props: {
  }
) => {
  const { t } = useTranslation();
  return (
    <div className='list-shell'>
      <Tabs
        defaultActiveKey="pages"
        size='small'
        tabBarExtraContent={<Button type="text" shape='circle' size='small' icon={<MoreOutlined />} />}
      >
        <Tabs.TabPane tab={t("Pages.Title")} key="pages">
          <PageList />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("Frameworks.Title")} key="frameworks">
          Content of Tab Pane 2
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
});

export default ListWidget;