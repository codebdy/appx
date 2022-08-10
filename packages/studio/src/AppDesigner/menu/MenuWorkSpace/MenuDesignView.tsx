import { Collapse } from "antd";
import React from "react";
import { memo } from "react";
const { Panel } = Collapse;

const MenuDesignView = memo(() => {
  return (

    <div className="design-view">
      <Collapse>
        <Panel header="This is panel header 1" key="1">
          <Collapse defaultActiveKey="1">
            <Panel header="This is panel nest panel" key="1">
              <p>text</p>
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="This is panel header 2" key="2">
          <p>text</p>
        </Panel>
        <Panel header="This is panel header 3" key="3">
          <p>text</p>
        </Panel>
      </Collapse>
    </div>

  )
})

export default MenuDesignView;