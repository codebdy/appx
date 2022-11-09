import { Button, Dropdown, Menu, MenuProps, Tabs } from "antd"
import React from "react"
import { TemplateSearchWidget } from "./TemplateSearchWidget";
import "./style.less"
import { observer } from "@formily/reactive-react";
import { useTranslation } from "react-i18next";
import { usePredefinedMaterialTab } from "~/material/context";
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage";
import { createResource } from '@designable/core'
import { usePrefix } from '@designable/react'
import { ResourceNodeWidget } from "./ResourceNodeWidget";
import { TemplateDialog } from "./TemplateDialog";
import { MoreOutlined } from "@ant-design/icons";

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
  const { basicTab, frameworkTab } = usePredefinedMaterialTab();
  const { t } = useTranslation();
  const p = useParseLangMessage();
  const prefix = usePrefix('resource')
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

  return (
    <div className="rx-material-panel">
      <TemplateSearchWidget />
      <Tabs defaultActiveKey={withFrameMaterials ? frameworkTab.uuid : basicTab.uuid}
        animated
        size="small"
        className="materail-tabs"
        tabBarExtraContent={
          <Dropdown overlay={
            <Menu
              items={items}
            />
          }
            trigger={['click']}>
            <Button type="text" shape="circle" icon={<MoreOutlined />} onClick={e => e.preventDefault()} />
          </Dropdown>
        }
      >
        <TabPane tab={t("Designer.PublicTemplates")} key={"public"}>
          <div className={"template-resources"}>
            <ResourceNodeWidget source={createResource(TestSource)[0]} />
          </div>
        </TabPane>
        <TabPane tab={t("Designer.LocaltTemplates")} key={"my"}>
          ddd
        </TabPane>
      </Tabs>
    </div>
  )
})