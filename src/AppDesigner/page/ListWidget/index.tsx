import { MoreOutlined } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageFrameList } from './PageFrameList';
import CreatePageFrameDialog from './PageFrameList/CreatePageFrameDialog';
import PageList from './PageList';
import { PagesMenu } from './PageList/PagesMenu';
import "./style.less"

const ListWidget = memo((
  props: {
  }
) => {
  const [activeKey, setActiveKey] = useState("pages");
  const { t } = useTranslation();
  const hancleChange = useCallback((key: string) => {
    setActiveKey(key);
  }, [])
  return (
    <div className='list-shell'>
      <Tabs
        activeKey={activeKey}
        size='small'
        tabBarExtraContent={
          activeKey === "pages"
            ?
            <PagesMenu />
            :
            <CreatePageFrameDialog />
        }
        onChange={hancleChange}
      >
        <Tabs.TabPane tab={t("Pages.Title")} key="pages">
          <PageList />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t("PageFrames.Title")} key="frameworks">
          <PageFrameList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
});

export default ListWidget;