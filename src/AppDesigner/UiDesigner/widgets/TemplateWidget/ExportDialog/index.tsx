import { Modal, Tabs } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType, ITemplateInfo } from '~/model';
import { ID } from '~/shared';
import "./style.less"
import { TemplateList } from './TemplateList';
import { useSave } from './useSave';

export const ExportDialog = memo((
  props: {
    templates?: ITemplateInfo[],
    open?: boolean,
    onClose?: () => void,
  }
) => {
  const { templates, open, onClose } = props;
  const [selectedIds, setSelectedIds] = useState<ID[]>([]);
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

  const save = useSave()

  const handleOk = useCallback(() => {
    save();
  }, [save])

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
    //okButtonProps={{
    //loading: loading
    //}}
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