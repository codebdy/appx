import { Modal, Tabs } from 'antd';
import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import "./style.less"

export const ManageDialog = memo((
  props: {
    open?: boolean,
    onClose?: () => void,
  }
) => {
  const { open, onClose } = props;
  const { t } = useTranslation();

  const handleOk = useCallback(() => {

  }, [])


  const handleCancel = useCallback(() => {
    onClose();
  }, [onClose])

  return (
    <Modal
      title={t("Designer.ManageTemplates")}
      className='template-module-modal'
      open={open}
      okText={t("Confirm")}
      cancelText={t("Cancel")}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        //loading: loading
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: t("Designer.PublicTemplates"),
            key: '1',
            children: `Content of Tab Pane 1`,
          },
          {
            label: t("Designer.LocaltTemplates"),
            key: '2',
            children: `Content of Tab Pane 2`,
          },
        ]}
      />
    </Modal>
  );
})