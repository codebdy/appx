import { Tabs } from "antd"
import React from "react"
import { TemplateSearchWidget } from "./TemplateSearchWidget";
import "./style.less"
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

export const TemplateWidget = observer((
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
      <TemplateSearchWidget />
      <Tabs defaultActiveKey={withFrameMaterials ? frameworkTab.uuid : basicTab.uuid}
        animated
        size="small"
        className="materail-tabs"
      >
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