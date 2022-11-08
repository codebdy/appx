import { Tabs } from "antd"
import React from "react"
import { MaterialSearchWidget } from "./MaterialSearchWidget";
import "./style.less"
import { MaterialDialog } from "./MaterialDialog";
import { observer } from "@formily/reactive-react";
import { ResourceWidget } from "../ResourceWidget";
import { useTranslation } from "react-i18next";
import { useAppMaterialTabs, usePredefinedMaterialTab } from "~/material/context";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { createResource } from '@designable/core'

const { TabPane } = Tabs;

const TestSource = {
  icon: 'OpenPageButtonSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': "Dialog",
        'x-component-props': {
          title: "Dialog",
          type: "primary",
          footer: true
        },
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Dialog.Title',
            'x-component-props': {
              title: "Title",
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Dialog.Content',
            'x-component-props': {
            },
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Dialog.Footer',
            'x-component-props': {
            },
          },
          children: [
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'Button',
                'x-component-props': {
                  "title": "$inline:{\"zh-CN\":\"取消\"}",
                  "type": "default"
                },
              },
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'Button',
                'x-component-props': {
                  "title": "$inline:{\"zh-CN\":\"确定\"}",
                  "type": "primary"
                },
              },
            },
          ],
        },
      ],
    },
  ],
}

export const MaterialWidget = observer((
  props: {
    withFrameMaterials?: boolean
  }
) => {
  const { withFrameMaterials } = props;
  const { debugMaterialTab, uploadedMaterialTabs } = useAppMaterialTabs();
  const { basicTab, frameworkTab } = usePredefinedMaterialTab();
  const { t } = useTranslation();
  const p = useParseLangMessage();

  return (
    <div className="rx-material-panel">
      <MaterialSearchWidget />
      <Tabs defaultActiveKey={withFrameMaterials ? frameworkTab.uuid : basicTab.uuid}
        animated
        size="small"
        className="materail-tabs"
        tabBarExtraContent={
          <MaterialDialog />
        }
      >
        {
          withFrameMaterials && frameworkTab &&
          <TabPane tab={frameworkTab.title} key={frameworkTab.uuid}>
            {
              frameworkTab.groups?.map((groupData, gIndex) => {
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
          basicTab &&
          <TabPane tab={basicTab.title} key={basicTab.uuid}>
            {
              basicTab.groups?.map((groupData, gIndex) => {
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
          uploadedMaterialTabs?.map(tab => {
            return (
              <TabPane tab={p(tab.title)} key={tab.uuid}>
                {
                  tab.groups?.map((groupData, gIndex) => {
                    return (<ResourceWidget
                      key={gIndex + 1}
                      title={p(groupData.title)}
                      sources={groupData.materials.map(material => material.designer)}
                    />)
                  })
                }
              </TabPane>
            )
          })
        }
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

        <TabPane tab={"TEST"} key={"test"}>
          <ResourceWidget
            title={"test2"}
            sources={[createResource(TestSource)]}
          />
        </TabPane>
      </Tabs>
    </div>
  )
})