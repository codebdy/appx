import { Button, message, Modal, Space, Spin } from 'antd';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useShowError } from '~/AppDesigner/hooks/useShowError';
import { useUpsertTemplates } from '~/AppDesigner/UiDesigner/hooks/useUpsertTemplates';
import { ITemplateInfo, TemplateType } from '~/model';
import { ID } from '~/shared';
import "../ExportDialog/style.less"
import { TemplateList } from '../ExportDialog/TemplateList';

export const ImportDialog = memo((
  props: {
    uploadedUrl?: string,
    onClose?: () => void,
    templateType: TemplateType
  }
) => {
  const { uploadedUrl, onClose, templateType } = props;
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);
  const [templates, setTemplates] = useState<ITemplateInfo[]>([]);
  const [fetching, setFetching] = useState(false);
  const { t } = useTranslation();
  const open = useMemo(() => !!uploadedUrl, [uploadedUrl]);
  const [save, { error, loading: importing }] = useUpsertTemplates({
    onCompleted: () => {
      onClose && onClose()
    }
  });
  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose])

  useShowError(error);

  useEffect(() => {
    if (uploadedUrl) {
      setFetching(true)
      const url = uploadedUrl.substring(0, uploadedUrl.length - 4)
      fetch(url + "/templates.json").then((resp) => {
        resp.json().then(value => {
          const templates: ITemplateInfo[] = value?.templates || [];
          for (let i = 0; i < templates.length; i++) {
            const template = templates[i]
            template.imageUrl = url + "/" + template.imageUrl;
            template.id = "" + i
            if (template.templateType !== templateType) {
              message.error(t("Designer.TemplateTypeError"))
              onClose();
              return;
            }
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
  }, [uploadedUrl, templateType, onClose, t])

  const handleOk = useCallback(() => {
    save(selectedIds.map(id => templates.find(template => template.id === id)).map(template => ({ ...template, id: undefined })), templateType)
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
      onCancel={handleCancel}
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