import { Modal, Tabs } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { CategoryType, ITemplateInfo } from '~/model';
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
  const { t } = useTranslation();

  // const handleOk = useCallback(() => {
  //   onClose();
  // }, [])


  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose])

  return (
    <Modal
      title={t("Designer.ManageTemplates")}
      className='template-export-modal'
      open={open}
      footer={false}
      //okText={t("Close")}
      //cancelText={t("Cancel")}
      //onOk={handleOk}
      onCancel={handleCancel}
    //okButtonProps={{
    //loading: loading
    //}}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: t("Designer.PublicTemplates"),
            key: '1',
            children: <TemplateList templates={templates.filter(template => template.categoryType === CategoryType.Public)} />,
          },
          {
            label: t("Designer.LocaltTemplates"),
            key: '2',
            children: <TemplateList templates={templates.filter(template => template.categoryType === CategoryType.Local)} />,
          },
        ]}
      />
    </Modal>
  );
})