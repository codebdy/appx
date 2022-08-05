import { ToolOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialDialogTable } from './MaterialDialogTable';

export const MaterialDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t } = useTranslation();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);


  return (
    <>
      <Button shape="circle" style={{ border: 0 }} onClick={showModal}
        icon={<ToolOutlined style={{ fontSize: 14, transform: "rotateY(180deg)" }} />}
      />

      <Modal
        title={t("materials.ModuleList")}
        className='material-module-modal'
        visible={isModalVisible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <MaterialDialogTable />
      </Modal>
    </>
  );
})