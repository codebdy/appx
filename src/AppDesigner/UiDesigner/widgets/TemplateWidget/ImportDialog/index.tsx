import { Button, Modal, Space, Spin } from 'antd';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITemplateInfo } from '~/model';
import { ID } from '~/shared';
import "../ExportDialog/style.less"
import { TemplateList } from '../ExportDialog/TemplateList';

export const ImportDialog = memo((
  props: {
    uploadedUrl?: string,
    onClose?: () => void,
  }
) => {
  const { uploadedUrl, onClose } = props;
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);
  const [importing, setImporting] = useState(false);
  const [templates, setTemplates] = useState<ITemplateInfo[]>([]);
  const [fetching, setFetching] = useState(false);
  const { t } = useTranslation();
  const open = useMemo(() => !!uploadedUrl, [uploadedUrl])
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose])

  useEffect(() => {
    if (uploadedUrl) {
      setFetching(true)
      const url = uploadedUrl.substring(0, uploadedUrl.length - 4)
      fetch(url + "/templates.json").then((resp) => {
        resp.json().then(value => {
          const templates: ITemplateInfo[] = value?.templates || [];
          for (const template of templates) {
            template.imageUrl = url + "/" + template.imageUrl;
          }

          setTemplates(templates)
          setFetching(false)
        }).catch(err => {
          setFetching(false)
          console.error(err)
        })
      }).catch(err => {
        setFetching(false)
        console.error(err)
      })
    }
  }, [uploadedUrl])

  const handleOk = useCallback(() => {
    setImporting(true);
    // const zip = new JSZip();
    // const temps = selectedIds.map(id => {
    //   const template = templates?.find(template => template.id === id);
    //   const newTemplate: ITemplateInfo = JSON.parse(JSON.stringify(template));
    //   delete newTemplate.id;
    //   newTemplate.categoryType = CategoryType.Public;
    //   return newTemplate
    // })

    // getAllFiles(temps, zip).then(() => {
    //   zip.file("templates.json", JSON.stringify({ templates: temps }, null, 2))
    //   zip.generateAsync({ type: "blob" })
    //     .then(function (content) {
    //       save("templates", content);
    //     });
    // }).catch((err) => {
    //   setImporting(false);
    //   console.error(err)
    // })
  }, [selectedIds, templates])

  const handleSelectChange = useCallback((id: ID, checked?: boolean) => {
    setSelectedIds(ids => {
      const newIds = ids.filter(aId => aId !== id);
      if (checked) {
        newIds.push(id);
      }
      return newIds;
    })
  }, [])

  return (
    <Modal
      title={t("Designer.ImportTemplates")}
      className='template-export-modal'
      open={open}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>{selectedIds.length > 0 && t("Designer.SelecteMessage", { count: selectedIds.length })}</div>
          <Space>
            <Button onClick={handleCancel}>
              {t("Cancel")}
            </Button>
            <Button
              type="primary"
              disabled={selectedIds.length === 0}
              loading={importing}
              onClick={handleOk}
            >
              {t("Designer.Import")}
            </Button>
          </Space>
        </div>
      }
    >
      <Spin spinning={fetching}>
        <TemplateList
          templates={templates}
          selectedIds={selectedIds}
          onSelectChange={handleSelectChange}
        />
      </Spin>
    </Modal>
  );
})