import { createDesigner, KeyCode, Shortcut } from "@designable/core"
import { Space, Spin } from "antd"
import React, { useCallback, useMemo, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useShowError } from "~/hooks/useShowError"
import { DesignerRoutes } from "../UiDesigner/UiDesignerContent"
import { Designer } from "../UiDesigner/containers"
import { CompositePanel, StudioPanel } from "../UiDesigner/panels"
import { OutlineTreeWidget } from "../UiDesigner/widgets"
import { MaterialWidget } from "../UiDesigner/widgets/MaterialWidget"
import { ID } from "~/shared"
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
              title={t("Panels.PageFrames")} icon={
                <svg style={{ width: "28px", height: "28px" }} fill="currentColor" viewBox="0 0 1024 1024">
                  <path d="M426.666667 426.666667v384H384v-384H256V384h554.666667v42.666667h-384zM213.333333 213.333333h640v640H213.333333V213.333333z m42.666667 42.666667v554.666667h554.666667V256H256z" ></path>
                </svg>
              }
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
