import { Button, Col, Dropdown, Menu, MenuProps, Row, Tabs } from "antd"
import React, { useCallback, useMemo, useState } from "react"
import { TemplateSearchWidget } from "./TemplateSearchWidget";
import "./style.less"
import { observer } from "@formily/reactive-react";
import { useTranslation } from "react-i18next";
import { createResource } from '@designable/core'
import { TemplateNodeWidget } from "./TemplateNodeWidget";
import { ManageDialog } from "./ManageDialog";
import { ExportOutlined, ImportOutlined, MoreOutlined, SettingOutlined } from "@ant-design/icons";
import { CategoryType, ITemplateInfo, TemplateType } from "~/model";
import { useParseLangMessage } from "~/plugin-sdk";
import { ExportDialog } from "./ExportDialog";
import { useUploadTempltes } from "./hooks/useUploadTempltes";
import { ImportDialog } from "./ImportDialog";

const { TabPane } = Tabs;

export const TemplateWidget = observer((
  props: {
    templates: ITemplateInfo[],
    templateType: TemplateType,
  }
) => {
  const { templates, templateType } = props;
  const [manageDialogOpen, setManageDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadeUrl] = useState<string>()
  const { t } = useTranslation();
  const p = useParseLangMessage();

  const upload = useUploadTempltes();

  const doImport = useCallback(() => {
    setUploading(true)
    upload().then(url => {
      setUploadeUrl(url)
      setUploading(false)
    }).catch(err => {
      console.error(err)
      setUploading(false)
    })
  }, [upload])

  const handleOpenManageDialog = useCallback(() => {
    setManageDialogOpen(true);
  }, [])
  const handleOpenExportDialog = useCallback(() => {
    setExportDialogOpen(true);
  }, [])
  const items: MenuProps['items'] = useMemo(() => [
    {
      label: t("Designer.ImportTemplates"),
      key: '0',
      icon: <ImportOutlined />,
      onClick: doImport,
    },
    {
      label: t("Designer.ExportTemplates"),
      key: '1',
      icon: <ExportOutlined />,
      onClick: handleOpenExportDialog,
    },
    {
      label: t("Designer.ManageTemplates"),
      key: '3',
      icon: <SettingOutlined />,
      onClick: handleOpenManageDialog,
    },
  ], [t, handleOpenExportDialog, handleOpenManageDialog, upload]);

  const handleManageClose = useCallback(() => {
    setManageDialogOpen(false)
  }, [])
  const handleExportClose = useCallback(() => {
    setExportDialogOpen(false)
  }, [])

  const handelImportClose = useCallback(() => {
    setUploadeUrl(undefined)
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
            <Button type="text" shape="circle" icon={<MoreOutlined />} loading={uploading} onClick={e => e.preventDefault()} />
          </Dropdown>
        }
      >
        <TabPane tab={t("Designer.PublicTemplates")} className="templates-panel" key={"public"}>
          <Row gutter={8}>
            {
              templates?.filter(template => template.categoryType === CategoryType.Public).map(template => {
                return (
                  <Col key={template.id} xs={12}>
                    <TemplateNodeWidget imageUrl={template.imageUrl} source={createResource({
                      title: p(template.name),
                      elements: template.schemaJson?.elements || []
                    })?.[0]} />
                  </Col>
                )
              })
            }
          </Row>
        </TabPane>
        <TabPane tab={t("Designer.LocaltTemplates")} className="templates-panel" key={"local"}>
          <Row gutter={8}>
            {
              templates?.filter(template => template.categoryType === CategoryType.Local).map(template => {
                return (
                  <Col key={template.id} xs={12}>
                    <TemplateNodeWidget imageUrl={template.imageUrl} source={createResource({
                      title: p(template.name),
                      elements: template.schemaJson?.elements || []
                    })?.[0]} />
                  </Col>
                )
              })
            }
          </Row>
        </TabPane>
      </Tabs>
      <ManageDialog open={manageDialogOpen} onClose={handleManageClose} templates={templates} />
      <ExportDialog open={exportDialogOpen} onClose={handleExportClose} templates={templates} />
      <ImportDialog uploadedUrl={uploadedUrl} onClose={handelImportClose} templateType={templateType} />
    </div>
  )
})