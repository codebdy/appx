import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MaterialTabs } from './MaterialTabs';
import { UploadDialog } from './UploadDialog';
import "./style.less";
import { IMaterialTab } from '../../../../material-sdk/model';

export const MaterialDialog = memo(() => {
  const [tabs, setTabs] = useState<IMaterialTab[]>([]);
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

  const handleTabsChange = useCallback((tabs: IMaterialTab[]) => {
    setTabs(tabs);
  }, []);

  return (
    <>
      <Button shape="circle" type="text" onClick={showModal}
        icon={<SettingOutlined style={{ fontSize: 14 }} />}
      />

      <Modal
        title={t("Materials.ModuleList")}
        className='material-module-modal'
        width={780}
        open={isModalVisible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className='material-dialog-content'>
          <div className='material-dialog-tabs right-border'>
            <MaterialTabs tabs={tabs} onTabsChange={handleTabsChange} />
          </div>
          <div className="material-dialog-coms right-border">
            <div className='content-title bottom-border'>
              {t("Materials.ComponentsForChoose")}
            </div>
          </div>
          <div className="material-dialog-materials">
            <div className='content-title bottom-border'>
              <span>{t("Materials.Cuszomized")}</span>
              <UploadDialog />
            </div>
            <div className='content'>
              <div>
                {t("Materials.All")}
              </div>
              <div>
                基础
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
})