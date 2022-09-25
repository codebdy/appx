import { createDesigner, KeyCode, Shortcut } from "@designable/core"
import { Space, Spin } from "antd"
import React, { useCallback, useMemo, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useShowError } from "../hooks/useShowError"
import { DesignerRoutes } from "../AppDesigner/AppDesignerContent"
import { Designer } from "../AppDesigner/containers"
import { CompositePanel, StudioPanel } from "../AppDesigner/panels"
import { OutlineTreeWidget } from "../AppDesigner/widgets"
import { MaterialWidget } from "../AppDesigner/widgets/MaterialWidget"
import { ID } from "../shared"
import { ActionsWidget } from "./ActionsWidget"
import { NavigationWidget } from "./NavigationWidget"
import { FrameListWidget } from "./FrameListWidget"
import { FrameWorkSpace } from "./FrameWorkSpace"
import { useQueryPageFrames } from "./hooks/useQueryPageFrames"

export const FrameDesignerInner = memo(() => {
  const [activeKey, setActiveKey] = useState<string>(DesignerRoutes.Templates);
  const [selectedId, setSeletedId] = useState<ID>();
  const { t } = useTranslation();
  const { pageFrames, error, loading } = useQueryPageFrames();
  useShowError(error);
  const hanclePannelChange = useCallback((activeKey: string) => {
    setActiveKey(activeKey)
  }, []);

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

  const handleSelect = useCallback((selectedId?: ID) => {
    setSeletedId(selectedId)
  }, [])
  return (
    <Spin spinning={loading}>
      <Designer engine={engine}>
        <StudioPanel logo={<NavigationWidget />}
          actions={
            <Space style={{ marginRight: 10 }}>
              <ActionsWidget templateId={selectedId} />
            </Space>
          }
        >
          <CompositePanel showNavTitle activeKey={activeKey} onChange={hanclePannelChange}>
            <CompositePanel.Item
              key={DesignerRoutes.Pages}
              title={t("Panels.Templates")} icon="Page"
            >
              <FrameListWidget
                templates={pageFrames || []}
                selectedId={selectedId}
                onSelected={handleSelect}
              />
            </CompositePanel.Item>
            <CompositePanel.Item
              key={DesignerRoutes.Components}
              title={t("Panels.Component")}
              icon="Component"
            >
              <MaterialWidget withFrameMaterials />
            </CompositePanel.Item>
            <CompositePanel.Item
              key={DesignerRoutes.OutlinedTree}
              title={t("Panels.OutlinedTree")} icon="Outline"
            >
              <OutlineTreeWidget />
            </CompositePanel.Item>
          </CompositePanel>
          {
            selectedId && <FrameWorkSpace frameId={selectedId} />
          }

        </StudioPanel>
      </Designer >
    </Spin>
  )
})