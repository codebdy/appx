import { Collapse } from "antd"
import React, { memo } from "react"
import PagesTree from "./PagesTree";
const { Panel } = Collapse;

const MenuComponentsWidget = memo(() => {

  return (
    <div>
      <Collapse
        defaultActiveKey={[]}
        expandIconPosition="end"
        bordered={false}
      >
        <Panel header="辅助项" key="1">
          <p>折叠组</p>
          <p>分隔符</p>
        </Panel>
        <Panel header="页面" key="2">
          <PagesTree />
        </Panel>
      </Collapse>
    </div>
  )
})

export default MenuComponentsWidget