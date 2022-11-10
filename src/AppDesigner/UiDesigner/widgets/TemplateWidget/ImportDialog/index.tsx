import { Modal } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType, ITemplateInfo } from '~/model';
import { ID } from '~/shared';
import "../ExportDialog/style.less"
import { TemplateList } from '../ExportDialog/TemplateList';


export const ExportDialog = memo((
  props: {
    templates?: ITemplateInfo[],
    open?: boolean,
    onClose?: () => void,
  }
) => {
  const { templates, open, onClose } = props;
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);
  const [importing, setImporting] = useState(false);
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
      title={t("Designer.ExportTemplates")}
      className='template-export-modal'
      open={open}
      okText={t("Export")}
      cancelText={t("Cancel")}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        disabled: selectedIds.length === 0,
        loading: importing,
      }}
    >
      <TemplateList
        templates={locales}
        selectedIds={publicSelects}
      />
    </Modal>
  );
})