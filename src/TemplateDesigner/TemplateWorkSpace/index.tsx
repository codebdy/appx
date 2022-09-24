import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { useDesigner } from '@designable/react'
import { transformToTreeNode } from "../../AppDesigner/transformer";
import { Field, ObjectContainer } from "@designable/formily-antd";
import { FormDesigner } from "../../components/pc";
import { ComponentTreeWidget, DesignerToolsWidget, PreviewWidget, SchemaEditorWidget, ViewToolsWidget } from "../../AppDesigner/widgets";
import { useLazyQueryTemplate } from "../hooks/useLazyQueryTemplate";
import { useShowError } from "../../hooks/useShowError";
import { ID } from "../../shared";
import { Workspace } from "../../AppDesigner/containers";
import { SettingsPanel, ToolbarPanel, ViewPanel, ViewportPanel, WorkspacePanel } from "../../AppDesigner/panels";
import { SettingsForm } from "../../AppDesigner/SettingsForm";
import { useMaterialDesigners } from "../../material/hooks/useMaterialDesigners";

export const TemplateWorkSpace = (props: {
  templateId: ID
}) => {
  const { templateId } = props;
  const designer = useDesigner();
  const [query, { template, loading, error }] = useLazyQueryTemplate();
  const materailDesigners = useMaterialDesigners();
  
  useEffect(() => {
    query(templateId)
  }, [templateId, query]);

  const { t } = useTranslation();

  useEffect(() => {
    designer.setCurrentTree(
      transformToTreeNode(template?.schemaJson || {})
    )
  }, [designer, template?.schemaJson])

  useShowError(error);

  return (
    loading ?
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
                      //...convertMaterialsToComponentDesigners(materialStore.modules)
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
}
