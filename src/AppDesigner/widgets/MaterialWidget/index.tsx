import { Tabs } from "antd"
import React from "react"
import { MaterialSearchWidget } from "./MaterialSearchWidget";
import "./style.less"
import { MaterialDialog } from "./MaterialDialog";
import { observer } from "@formily/reactive-react";
import { materialStore } from "../../../shared/global";
import { ResourceWidget } from "../ResourceWidget";
import { useTranslation } from "react-i18next";
import { useAppMaterialTabs, usePredefinedMaterialTab } from "../../../material/context";
const { TabPane } = Tabs;

export const MaterialWidget: React.FC = observer(() => {
  const { debugMaterialTab } = useAppMaterialTabs();
  const predefinedTab = usePredefinedMaterialTab();
  const { t } = useTranslation();

  return (
    <div className="rx-material-panel">
      <MaterialSearchWidget />
      <Tabs defaultActiveKey={predefinedTab.uuid}
        animated
        size="small"
        className="materail-tabs"
        tabBarExtraContent={
          <MaterialDialog />
        }
      >
        {
          predefinedTab &&
          <TabPane tab={predefinedTab.title} key={predefinedTab.uuid}>
            {
              predefinedTab.groups?.map((groupData, gIndex) => {
                return (<ResourceWidget
                  key={gIndex + 1}
                  title={groupData.title}
                  sources={groupData.materials.map(material => material.designer)}
                />)
              })
            }
          </TabPane>
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
        {
          debugMaterialTab &&
          <TabPane tab={debugMaterialTab.title} key={debugMaterialTab.uuid}>
            {
              debugMaterialTab.groups?.map((groupData, gIndex) => {
                return (<ResourceWidget
                  key={gIndex + 1}
                  title={groupData.title}
                  sources={groupData.materials.map(material => material.designer)}
                />)
              })
            }
          </TabPane>
        }
      </Tabs>
    </div>
  )
})