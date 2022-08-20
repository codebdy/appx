import { Tabs } from "antd"
import React from "react"
import { MaterialSearchWidget } from "./MaterialSearchWidget";
import "./index.less"
import { MaterialDialog } from "./MaterialDialog";
import { observer } from "@formily/reactive-react";
import { materialStore } from "./global";
import { ResourceWidget } from "../ResourceWidget";

const { TabPane } = Tabs;

export const MaterialWidget: React.FC = observer(() => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="rx-material-panel">
      <MaterialSearchWidget />
      <Tabs defaultActiveKey="1"
        animated
        size="small"
        className="materail-tabs"
        tabBarExtraContent={
          <MaterialDialog />
        }
        onChange={onChange}
      >
        {
          materialStore.modules.map((tabData, index) => {
            return (
              <TabPane tab={tabData.name} key={index + 1}>
                {
                  tabData.groups?.map((groupData, gIndex) => {
                    return (<ResourceWidget
                      key={gIndex + 1}
                      title={groupData.title}
                      sources={groupData.materials.map(material => material.designer)}
                    />)
                  })
                }
              </TabPane>
            )
          })
        }
      </Tabs>
    </div>
  )
})