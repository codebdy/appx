import { Form, Input, Modal } from "antd";
import { ILangLocalInput } from "../../model/input";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useAppConfig, useAppParams } from "../../shared/AppRoot/context";
import { useUpsertLangLocal } from "../../hooks/useUpsertLangLocal";
import { useShowError } from "../../hooks/useShowError";

const ResourceEditDialog = memo((
  props: {
    value?: string,
    visiable?: boolean,
    onClose: () => void,
  }
) => {
  const { value, visiable, onClose } = props;
  const [nameError, setNameError] = useState<string>();
  const { t } = useTranslation()
  const appConfig = useAppConfig();
  const [form] = Form.useForm();
  const { langLocales } = useAppParams();

  const resetForm = useCallback(() => {
    setNameError("");
    form.resetFields();
    form.setFieldsValue({

    })
  }, [form])

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
    // form.validateFields().then((formValues) => {
    //   if (langLocales.find(lang => lang.name === formValues.name && langLocal.id !== lang.id)) {
    //     setNameError(t("ErrorNameRepeat"))
    //     return;
    //   }
    //   const { name, ...schemaJson } = formValues
    //   upsert({
    //     name: formValues.name,
    //     schemaJson: schemaJson
    //   })
    // })

  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal
      title={t("Config.MultiLang.LangInput")}
      visible={visiable}
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
            help={nameError}
            validateStatus={nameError ? "error" : undefined}
          >
            <Input onChange={() => { setNameError(""); }} />
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

export default ResourceEditDialog;