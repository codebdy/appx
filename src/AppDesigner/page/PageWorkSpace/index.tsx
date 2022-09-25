import React, { useEffect } from "react";
import {
  PreviewWidget,
  SchemaEditorWidget,
  ViewToolsWidget,
  DesignerToolsWidget,
  ComponentTreeWidget,
} from '../../widgets'
import { ViewPanel, WorkspacePanel, ToolbarPanel, ViewportPanel, SettingsPanel } from '../../panels'
import { convertMaterialsToComponentDesigners } from '../../widgets/MaterialWidget/model'
import { materialStore } from '../../../shared/global'
import { Workspace } from '../../containers'
import { SettingsForm } from '../../SettingsForm'
import { Field } from '../../../components/common/Field'
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { ID } from "../../../shared";
import { useShowError } from "../../../hooks/useShowError";
import { transformToTreeNode } from "../../transformer";
import { useDesigner } from '@designable/react'
import { useLazyQueryPage } from "../../../hooks/useLazyQueryPage";
import { FormDesigner } from "../../../components/pc/FormDesigner";
import { ObjectContainer } from "@designable/formily-antd";
import { useMaterialDesigners } from "../../../material/hooks/useMaterialDesigners";
import { DesignerRoutes } from "../../AppDesignerContent";
import { useLazyQueryPageFrame } from "../../hooks/useLazyQueryPageFrame";

const PageWorkSpace = (props: {
  activeKey?: string,
  pageOrFrameId: ID,
  visable: boolean | undefined,
}) => {
  const { activeKey, pageOrFrameId, visable } = props;
  const designer = useDesigner();
  const [query, { page, loading, error }] = useLazyQueryPage();
  const [queryFrame, { pageFrame, loading: frameLoading, error: frameError }] = useLazyQueryPageFrame();
  const materailDesigners = useMaterialDesigners();

  useEffect(() => {
    if (activeKey === DesignerRoutes.Pages) {
      query(pageOrFrameId)
    }
  }, [pageOrFrameId, query]);

  useEffect(() => {
    if (activeKey === DesignerRoutes.PageFrames) {
      queryFrame(pageOrFrameId)
    }
  }, [pageOrFrameId, queryFrame]);

  const { t } = useTranslation();

  useEffect(() => {
    if (activeKey === DesignerRoutes.PageFrames) {
      designer.setCurrentTree(
        transformToTreeNode(pageFrame?.schemaJson || {})
      )
    } else {
      designer.setCurrentTree(
        transformToTreeNode(page?.schemaJson || {})
      )
    }
  }, [designer, page?.schemaJson, activeKey, pageFrame?.schemaJson])

  useShowError(error || frameError);

  return (
    visable && (
      loading || frameLoading ?
        <Spin>
          <div style={{ width: "calc(100vw - 280px)", height: "calc(100vh - 64px)" }}>
          </div>
        </Spin>
        :
        <>
          <Workspace id="form">
            <WorkspacePanel>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <ViewToolsWidget
                  use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']}
                />
              </ToolbarPanel>
              <ViewportPanel style={{ height: '100%' }}>
                <ViewPanel type="DESIGNABLE">
                  {() => (
                    <ComponentTreeWidget
                      components={{
                        Form: FormDesigner,
                        Field,
                        ObjectContainer,
                        ...materailDesigners,
                        ...convertMaterialsToComponentDesigners(materialStore.modules)
                      }}
                    />
                  )}
                </ViewPanel>
                <ViewPanel type="JSONTREE" scrollable={false}>
                  {(tree, onChange) => (
                    <SchemaEditorWidget tree={tree} onChange={onChange} />
                  )}
                </ViewPanel>
                <ViewPanel type="PREVIEW">
                  {(tree) => <PreviewWidget tree={tree} />}
                </ViewPanel>
              </ViewportPanel>
            </WorkspacePanel>
          </Workspace>
          <SettingsPanel title={t("Panels.PropertySettings")}>
            <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
          </SettingsPanel>
        </>
    )
  )
}

export default PageWorkSpace;