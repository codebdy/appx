import { Tabs } from "antd"
import React from "react"
import { MaterialSearchWidget } from "./MaterialSearchWidget";
import "./style.less"
import { MaterialDialog } from "./MaterialDialog";
import { observer } from "@formily/reactive-react";
import { materialStore } from "../../../shared/global";
import { ResourceWidget } from "../ResourceWidget";
import { usePredefinedTabs } from "./hooks/usePredefinedTabs";

const { TabPane } = Tabs;

export const MaterialWidget: React.FC = observer(() => {
  const predefinedTabs = usePredefinedTabs();

  return (
    <div className="rx-material-panel">
      <MaterialSearchWidget />
      <Tabs defaultActiveKey={predefinedTabs?.[0].uuid}
        animated
        size="small"
        className="materail-tabs"
        tabBarExtraContent={
          <MaterialDialog />
        }
      >
        {
          predefinedTabs.map((tab, index) => {
            return (
              <TabPane tab={tab.title} key={tab.uuid}>
                {
                  tab.collopsesItems?.map((groupData, gIndex) => {
                    return (<ResourceWidget
                      key={gIndex + 1}
                      title={groupData.title}
                      sources={[]}
                    />)
                  })
                }
              </TabPane>
            )
          })
        }
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