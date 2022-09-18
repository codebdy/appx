import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { IMaterialTab } from '../../../../../material-sdk/model';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const TabsEditDialog = memo((
  props: {
    tabs: IMaterialTab[],
    onTabsChange: (tabs: IMaterialTab[]) => void,
  }
) => {
  const { tabs, onTabsChange } = props;
  const [items, setItems] = useState(tabs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setItems(tabs);
  }, [tabs])

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
        width={400}
        open={isModalOpen}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='tabs-edit-content'>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <Button type='dashed' block icon={<PlusOutlined />}>{t("Materials.Add")}</Button>
        </div>
      </Modal>
    </>
  );
});
