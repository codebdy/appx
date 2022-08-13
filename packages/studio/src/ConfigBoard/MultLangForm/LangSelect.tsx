import { FormOutlined } from "@ant-design/icons";
import { Button, Modal, Tag } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const LangSelect = memo(() => {
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
      <Button onClick={showModal}>
        <div>
          <Tag>中文</Tag>
          <Tag>English</Tag>
          <Tag>日本语</Tag>
          <FormOutlined style={{ marginLeft: 8 }} />
        </div>
      </Button>
      <Modal
        title={t("Config.MultiLang.LangsEdit")}
        width={700}
        visible={isModalVisible}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
})

export default LangSelect;