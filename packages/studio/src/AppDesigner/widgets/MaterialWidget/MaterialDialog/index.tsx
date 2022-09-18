import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialTabs } from './MaterialTabs';
import { UploadDialog } from './UploadDialog';

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
      <Button shape="circle" type="text" onClick={showModal}
        icon={<SettingOutlined style={{ fontSize: 14 }} />}
      />

      <Modal
        title={t("Materials.ModuleList")}
        className='material-module-modal'
        width={900}
        open={isModalVisible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='material-dialog-content'>
          <div className='material-dialog-tabs right-border'>
            <MaterialTabs />
          </div>
          <div className="material-dialog-coms right-border">
            right
          </div>
          <div className="material-dialog-materials">
            <div className='upload-title bottom-border'>
              <span>上传管理</span>
              <UploadDialog />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
})