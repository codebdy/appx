import { Form, Input, Modal } from "antd";
import { ILangLocalInput } from "../../../model/input";
import React, { useCallback, useEffect } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useAppConfig } from "../../../shared/AppRoot/context";
import { useUpsertLangLocal } from "../../../hooks/useUpsertLangLocal";
import { useShowError } from "../../../hooks/useShowError";

const LangLocalEditDialog = memo((
  props: {
    langLocal?: ILangLocalInput,
    onClose: () => void,
  }
) => {
  const { langLocal, onClose } = props;
  const { t } = useTranslation()
  const appConfig = useAppConfig();
  const [form] = Form.useForm();
  const resetForm = useCallback(() => {
    form.resetFields();
    form.setFieldsValue({
      name: langLocal?.name,
      ...langLocal?.schemaJson
    })
  }, [form, langLocal?.name, langLocal?.schemaJson])

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const [upsert, { loading, error }] = useUpsertLangLocal(
    {
      onCompleted: () => {
        onClose();
        resetForm();
      }
    }
  );

  useShowError(error);

  const handleOk = () => {
    form.validateFields().then((formValues) => {
      const { name, ...schemaJson } = formValues
      upsert({
        name: formValues.name,
        schemaJson: schemaJson
      })
    })

  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      title={langLocal?.id ? t("Config.MultiLang.LangResourcesEdit") : t("Config.MultiLang.NewLangResource")}
      visible={!!langLocal}
      okText={t("Confirm")}
      width={600}
      cancelText={t("Cancel")}
      okButtonProps={{
        loading: loading
      }}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div style={{ height: "calc(100vh - 300px)", overflow: "auto" }}>
        <Form
          name="edit-lang-local"
          form={form}
          labelCol={{ span: 6 }}
          labelWrap
          wrapperCol={{ span: 17 }}
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
      </div>
    </Modal>
  )
})

export default LangLocalEditDialog;