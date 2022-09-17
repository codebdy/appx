import { createDesigner, KeyCode, Shortcut } from "@designable/core"
import { Button, Space } from "antd"
import React, { useMemo, useState } from "react"
import { memo } from "react"
import { DesignerRoutes } from "../AppDesigner/AppDesignerContent"
import { Designer } from "../AppDesigner/containers"
import { CompositePanel, StudioPanel } from "../AppDesigner/panels"
import { ActionsWidget } from "./ActionsWidget"
import { NavigationWidget } from "./NavigationWidget"

export const TemplateDesigner = memo(() => {
  const [activeKey, setActiveKey] = useState<string>(DesignerRoutes.Templates);
  
  const engine = useMemo(
    () => createDesigner({
      shortcuts: [
        new Shortcut({
          codes: [
            [KeyCode.Meta, KeyCode.S],
            [KeyCode.Control, KeyCode.S],
          ],
          handler(ctx) {
            //saveSchema(ctx.engine)
          },
        }),
      ],
      rootComponentName: 'Form',
    }),
    []
  )
  return (
    <Designer engine={engine}>
      <StudioPanel logo={<NavigationWidget/>}
        actions={
          <Space style={{ marginRight: 10 }}>
            <ActionsWidget />
          </Space>
        }
      >
        <CompositePanel showNavTitle activeKey={activeKey} onChange={hanclePannelChange}>
          <CompositePanel.Item
            key={DesignerRoutes.Pages}
            title={t("Panels.Page")} icon="Page"
          >
            <PageListWidget />
          </CompositePanel.Item>
          <CompositePanel.Item
            key={DesignerRoutes.Components}
            title={t("Panels.Component")}
            icon="Component"
          >
            <MaterialWidget />
          </CompositePanel.Item>
          <CompositePanel.Item
            key={DesignerRoutes.OutlinedTree}
            title={t("Panels.OutlinedTree")} icon="Outline"
          >
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item
            key={DesignerRoutes.Menu}
            title={t("Panels.Menu")}
            icon={
              <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 1024 1024">
                <path d="M912.051527 151.150632l-286.624817 780.499041c-5.753719 15.667798-23.118384 23.704707-38.786182 17.950989a30.220937 30.220937 0 0 1-19.305944-22.909364L498.23787 550.442426a30.220937 30.220937 0 0 0-24.265655-24.265655L97.723343 457.080057c-16.415729-3.014425-27.279412-18.766366-24.264987-35.182094a30.220937 30.220937 0 0 1 19.306612-22.910032L873.263342 112.363782c15.669134-5.753719 33.033799 2.28319 38.786849 17.951656a30.220937 30.220937 0 0 1 0 20.835194zM826.833582 205.907791a7.555234 7.555234 0 0 0-9.679684-9.650301l-573.559491 207.092476a7.555234 7.555234 0 0 0 1.149942 14.527205l297.554613 56.790594a7.555234 7.555234 0 0 1 6.020837 6.087616L603.515031 788.626754a7.555234 7.555234 0 0 0 14.549911 1.210044L826.83425 205.908459z" p-id="8853"></path>
              </svg>
            }>
            <MenuComponentsWidget />
          </CompositePanel.Item>
          <CompositePanel.Item
            key={DesignerRoutes.Settings}
            title={t("Panels.Settings")}
            icon={<SettingOutlined />}>
          </CompositePanel.Item>
        </CompositePanel>
        <TemplateWorkSpace />
      </StudioPanel>
    </Designer >
  )
})