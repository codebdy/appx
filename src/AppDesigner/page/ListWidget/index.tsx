import { MoreOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PageFrameList } from './PageFrameList';
import PageList from './PageList';
import { PagesMenu } from './PageList/PagesMenu';
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
        tabBarExtraContent={
          <PagesMenu />
        }
      >
        <Tabs.TabPane tab={t("Pages.Title")} key="pages">
          <PageList />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("Frameworks.Title")} key="frameworks">
          <PageFrameList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
});

export default ListWidget;