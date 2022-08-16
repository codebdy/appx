import { Button, Modal } from "antd";
import React, { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const DataSourceInput = memo((
  props: {

  }
) => {
  const { t } = useTranslation();
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
      <Button
        block
        onClick={showModal}
      >
        {t("SettingsForm.ConfigDataSource")}
      </Button>
      <Modal title={t("SettingsForm.ConfigDataSource")} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
})

export default DataSourceInput;