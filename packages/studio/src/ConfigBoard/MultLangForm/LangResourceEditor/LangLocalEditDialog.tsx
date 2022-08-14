import { Form, Input, Modal } from "antd";
import { ILangLocalInput } from "../../../model/input";
import React from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useAppConfig } from "../../../shared/AppRoot/context";

const LangLocalEditDialog = memo((
  props: {
    langLocal?: ILangLocalInput,
    onClose: () => void,
  }
) => {
  const { langLocal, onClose } = props;
  const { t } = useTranslation()
  const appConfig = useAppConfig();
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
      okText={t("Confirm")}
      width={600}
      cancelText={t("Cancel")}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="edit-lang-local"
        labelCol={{ span: 6 }}
        labelWrap
        wrapperCol={{ span: 17 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label={t("Name")}
          name="name"
          rules={[{ required: true, message: t("Required") }]}
        >
          <Input />
        </Form.Item>

        {
          appConfig?.schemaJson?.multiLang?.langs.map((lang) => {
            return (
              <Form.Item
                label={t("Lang." + lang.key)}
                name={lang.key}
              >
                <Input.TextArea />
              </Form.Item>
            )
          })
        }

      </Form>
    </Modal>
  )
})

export default LangLocalEditDialog;