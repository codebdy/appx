import { Tabs } from 'antd';
import React, { memo, useCallback } from 'react';
import "./style.less"

const ListWidget = memo((
  props: {
  }
) => {

  return (
    <div className='list-shell'>
      <Tabs defaultActiveKey="1" size='small'>
        <Tabs.TabPane tab="页面" key="1">
          Content of Tab Pane 1
        </Tabs.TabPane>
        <Tabs.TabPane tab="框架" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
});

export default ListWidget;