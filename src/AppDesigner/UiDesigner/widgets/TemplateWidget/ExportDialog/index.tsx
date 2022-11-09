import { Modal, Tabs } from 'antd';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType, ITemplateInfo } from '~/model';
import { ID } from '~/shared';
import "./style.less"
import { TemplateList } from './TemplateList';

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

  const handleOk = useCallback(() => {
  }, [])
  return (
    <Modal
      title={t("Designer.ManageTemplates")}
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
            label: t("Designer.PublicTemplates") + ` (0/${publics.length})`,
            key: '1',
            children: <TemplateList
              templates={publics}
              selectedIds={selectedIds}
            />,
          },
          {
            label: t("Designer.LocaltTemplates") + ` (0/${locales.length})`,
            key: '2',
            children: <TemplateList
              templates={locales}
              selectedIds={selectedIds}
            />,
          },
        ]}
      />
    </Modal>
  );
})