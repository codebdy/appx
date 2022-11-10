import { Button, Modal, Space } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
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
  const { t } = useTranslation();
  const open = useMemo(() => !!uploadedUrl, [uploadedUrl])
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose])


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
      //okText={t("Designer.Import")}
      //cancelText={t("Cancel")}
      //onOk={handleOk}
      //onCancel={handleCancel}
      // okButtonProps={{
      //   disabled: selectedIds.length === 0,
      //   loading: importing,
      // }}
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>选中5条</div>
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
      <TemplateList
        templates={templates}
        selectedIds={selectedIds}
      />
    </Modal>
  );
})