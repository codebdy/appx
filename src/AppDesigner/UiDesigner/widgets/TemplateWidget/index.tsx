import { Button, Dropdown, Menu, MenuProps, Tabs } from "antd"
import React, { useCallback, useMemo, useState } from "react"
import { TemplateSearchWidget } from "./TemplateSearchWidget";
import "./style.less"
import { observer } from "@formily/reactive-react";
import { useTranslation } from "react-i18next";
import { createResource } from '@designable/core'
import { ResourceNodeWidget } from "./ResourceNodeWidget";
import { ManageDialog } from "./ManageDialog";
import { ExportOutlined, ImportOutlined, MoreOutlined, SettingOutlined } from "@ant-design/icons";
import { CategoryType, ITemplateInfo, TemplateType } from "~/model";
import { useParseLangMessage } from "~/plugin-sdk";

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
    templates?: ITemplateInfo[]
  }
) => {
  const { templates } = props;
  const [manageDialogOpen, setManageDialogOpen] = useState(false);

  const { t } = useTranslation();
  const p = useParseLangMessage();

  const handleOpenManageDialog = useCallback(() => {
    setManageDialogOpen(true);
  }, [])

  const items: MenuProps['items'] = useMemo(() => [
    {
      label: t("Designer.ImportTemplates"),
      key: '0',
      icon: <ImportOutlined />
    },
    {
      label: t("Designer.ExportTemplates"),
      key: '1',
      icon: <ExportOutlined />
    },
    {
      label: t("Designer.ManageTemplates"),
      key: '3',
      icon: <SettingOutlined />,
      onClick: handleOpenManageDialog,
    },
  ], [t, handleOpenManageDialog]);

  const handleManageClose = useCallback(() => {
    setManageDialogOpen(false)
  }, [])

  return (
    <div className="rx-template-panel">
      <TemplateSearchWidget />
      <Tabs
        animated
        size="small"
        className="template-tabs"
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
          <div className={"template-resources"}>
            {
              templates?.filter(template => template.categoryType === CategoryType.Public).map(template => {
                return (
                  <ResourceNodeWidget source={createResource({
                    icon: 'OpenPageButtonSource',
                    title: p(template.name),
                    elements: template.schemaJson?.elements || []
                  })?.[0]} />
                )
              })
            }
          </div>
        </TabPane>
      </Tabs>
      <ManageDialog open={manageDialogOpen} onClose={handleManageClose} />
    </div>
  )
})