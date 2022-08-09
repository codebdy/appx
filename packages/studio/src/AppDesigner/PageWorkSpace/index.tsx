import React, { useEffect } from "react";
import {
  PreviewWidget,
  SchemaEditorWidget,
  ViewToolsWidget,
  DesignerToolsWidget,
  ComponentTreeWidget,
} from '../widgets'
import {
  Form,
} from '@designable/formily-antd'
import { ViewPanel, WorkspacePanel, ToolbarPanel, ViewportPanel, SettingsPanel } from '../panels'
import { convertMaterialsToComponents } from '../widgets/MaterialWidget/model'
import { materialStore } from '../widgets/MaterialWidget/global'
import { Workspace } from '../containers'
import { SettingsForm } from '../../SettingsForm'
import { Field } from '../../components/Field'
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { ID } from "../../shared";
import { usePage } from "../../hooks/usePage";
import { useShowError } from "../../hooks/useShowError";
import { transformToTreeNode } from "../transformer";
import { useDesigner } from '@designable/react'

const PageWorkSpace = (props: {
  pageId: ID
}) => {
  const { pageId } = props;
  const designer = useDesigner();
  const { page, loading, error } = usePage(pageId);
  const { t } = useTranslation();

  useEffect(() => {
    designer.setCurrentTree(
      transformToTreeNode(page?.schemaJson || {})
    )
  }, [designer, page?.schemaJson])

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
                      Form,
                      Field,
                      ...convertMaterialsToComponents(materialStore.modules)
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

export default PageWorkSpace;