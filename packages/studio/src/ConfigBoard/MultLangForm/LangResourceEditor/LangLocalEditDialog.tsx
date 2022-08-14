import { Modal } from "antd";
import { ILangLocalInput } from "../../../model/input";
import React from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";

const LangLocalEditDialog = memo((
  props: {
    langLocal?: ILangLocalInput,
    onClose: () => void,
  }
) => {
  const { langLocal, onClose } = props;
  const { t } = useTranslation()
  const handleOk = () => {
    //setIsModalVisible(false);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={langLocal?.id ? t("Config.MultiLang.LangResourcesEdit") : t("Config.MultiLang.NewLangResource")}
      visible={!!langLocal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
})

export default LangLocalEditDialog;