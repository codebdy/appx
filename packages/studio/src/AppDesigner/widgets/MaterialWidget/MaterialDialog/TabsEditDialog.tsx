import { EditOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const TabsEditDialog = memo(() => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation();

  const handleShowModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Button size='small' type="text" shape='circle' icon={<EditOutlined />} style={{ marginRight: 8 }} onClick={handleShowModal} />
      <Modal
        title={t("Materials.TabsEdit")}
        open={isModalOpen}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div  className='tabs-edit-content'>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <Button type='dashed' block>{t("Materials.Add")}</Button>
        </div>
      </Modal>
    </>
  );
});
