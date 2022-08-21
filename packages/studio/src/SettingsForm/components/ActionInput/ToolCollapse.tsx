import { Collapse } from 'antd';
import React, { memo } from 'react';
const { Panel } = Collapse;

export const ToolCollapse = memo(() => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Collapse
      defaultActiveKey={['1']}
      ghost
      accordion
      bordered={false}
      onChange={onChange}
    >
      <Panel header="数据操作" key="1">
        <div>
          删除记录
        </div>
        <div>
          更新记录
        </div>
        <div>
          提交数据
        </div>
      </Panel>
      <Panel header="页面操作" key="2">
        <div>
          打开页面
        </div>
        <div>
          关闭页面
        </div>
        <div>
          打开对话框
        </div>
        <div>
          关闭对话框
        </div>
        <div>
          打开抽屉
        </div>
        <div>
          关闭抽屉
        </div>
        <div>
          确认框
        </div>
        <div>
          成功消息
        </div>
      </Panel>
    </Collapse>
  );
});
