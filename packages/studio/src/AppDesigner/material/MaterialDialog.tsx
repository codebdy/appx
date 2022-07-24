import { ToolOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { MaterialDialogTable } from './MaterialDialogTable';
import { TextWidget } from "@designable/react"

export const MaterialDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        title={<TextWidget>materials.ModuleList</TextWidget>}
        className='material-module-modal'
        visible={isModalVisible}
        okText={<TextWidget>Confirm</TextWidget>}
        cancelText={<TextWidget>Cancel</TextWidget>}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <MaterialDialogTable />
      </Modal>
    </>
  );
})