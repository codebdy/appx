import { message, Modal, Tabs } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType, ITemplateInfo } from '~/model';
import { ID } from '~/shared';
import "./style.less"
import { TemplateList } from './TemplateList';
import { useSave } from './useSave';
var JSZip = require("jszip")

async function getFile(template: ITemplateInfo, zip: any) {
  const respo = await fetch(template.imageUrl);
  const buffer = await respo.arrayBuffer();
  const tArray = template.imageUrl?.split("/")
  const fileName = tArray[tArray.length - 1]
  template.imageUrl = fileName;
  zip.file(fileName, buffer, { binary: true })
}

async function getAllFiles(templates: ITemplateInfo[], zip: any) {
  for (const template of templates) {
    await getFile(template, zip)
  }
}

export const ExportDialog = memo((
  props: {
    templates?: ITemplateInfo[],
    open?: boolean,
    onClose?: () => void,
  }
) => {
  const { templates, open, onClose } = props;
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);
  const [exporting, setExporting] = useState(false);
  const { t } = useTranslation();

  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose])

  const publics = useMemo(() => templates.filter(template => template.categoryType === CategoryType.Public), [templates])
  const locales = useMemo(() => templates.filter(template => template.categoryType === CategoryType.Local), [templates])

  const publicSelects = useMemo(() => {
    return selectedIds.filter(id => publics.find(template => template.id === id))
  }, [selectedIds, publics])

  const localeSelects = useMemo(() => {
    return selectedIds.filter(id => locales.find(template => template.id === id))
  }, [selectedIds, locales])

  const save = useSave(() => {
    message.success(t("OperateSuccess"));
    setExporting(false);
    setSelectedIds([]);
    onClose();
  })

  const handleOk = useCallback(() => {
    setExporting(true);
    const zip = new JSZip();
    const temps = selectedIds.map(id => {
      const template = templates?.find(template => template.id === id);
      const newTemplate: ITemplateInfo = JSON.parse(JSON.stringify(template));
      delete newTemplate.id;
      newTemplate.categoryType = CategoryType.Public;
      return newTemplate
    })

    getAllFiles(temps, zip).then(() => {
      zip.file("templates.json", JSON.stringify({ templates: temps }, null, 2))
      zip.generateAsync({ type: "blob" })
        .then(function (content) {
          save("templates", content);
        });
    }).catch((err) => {
      setExporting(false);
      console.error(err)
    })
  }, [save, onClose, selectedIds, templates])

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
      title={t("Designer.ExportTemplates")}
      className='template-export-modal'
      open={open}
      okText={t("Designer.Export")}
      cancelText={t("Cancel")}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        disabled: selectedIds.length === 0,
        loading: exporting,
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: t("Designer.PublicTemplates") + ` (${publicSelects.length}/${publics.length})`,
            key: '1',
            children: <TemplateList
              templates={publics}
              selectedIds={publicSelects}
            />,
          },
          {
            label: t("Designer.LocaltTemplates") + ` (${localeSelects.length}/${locales.length})`,
            key: '2',
            children: <TemplateList
              templates={locales}
              selectedIds={localeSelects}
              onSelectChange={handleSelectChange}
            />,
          },
        ]}
      />
    </Modal>
  );
})