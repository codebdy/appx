import { Tabs } from "antd"
import React from "react"
import { MaterialSearchWidget } from "./MaterialSearchWidget";
import "./style.less"
import { MaterialDialog } from "./MaterialDialog";
import { observer } from "@formily/reactive-react";
import { materialStore } from "../../../shared/global";
import { ResourceWidget } from "../ResourceWidget";
import { usePredefinedTabs } from "./hooks/usePredefinedTabs";
import { useTranslation } from "react-i18next";
import { convertMaterialsToSources } from "./hooks/convertMaterialsToSources";
const { TabPane } = Tabs;

export const MaterialWidget: React.FC = observer(() => {
  const predefinedTabs = usePredefinedTabs();
  const { t } = useTranslation();

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
                  tab.collopsesItems?.map((group) => {
                    console.log("哈哈", group?.components, convertMaterialsToSources(group?.components||[]))
                    return (<ResourceWidget
                      key={group.uuid}
                      title={group.title}
                      sources={convertMaterialsToSources(group?.components||[])}
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
        <TabPane tab={t("Materials.Other")} key={"TAB-OTHER"}>

        </TabPane>
        <TabPane tab={t("Materials.Debug")} key={"TAB-DEBUG"}>

        </TabPane>
      </Tabs>
    </div>
  )
})