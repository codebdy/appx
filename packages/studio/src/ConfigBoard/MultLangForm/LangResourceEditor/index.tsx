import { FormOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const LangResourceEditor = memo(() => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const handleOpen = useCallback(() => {
    setVisible(true)
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false)
  }, []);

  return (
    <>
      <Button icon={<FormOutlined />} onClick={handleOpen}>
        {t("Edit")}
      </Button>
      <Modal
        title={t("Config.MultiLang.LangResourcesEdit")}
        centered
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  )
})

export default LangResourceEditor;