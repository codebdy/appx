import { Form, Input, Modal, Radio, RadioChangeEvent } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useAppConfig, useAppParams } from "../../shared/AppRoot/context";
import { useUpsertLangLocal } from "../../hooks/useUpsertLangLocal";
import { useShowError } from "../../hooks/useShowError";

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

const ResourceEditDialog = memo((
  props: {
    multiline?: boolean,
    value?: string,
    visiable?: boolean,
    onClose: () => void,
  }
) => {
  const { multiline, value, visiable, onClose } = props;
  const [nameError, setNameError] = useState<string>();
  const [value4, setValue4] = useState('Apple');
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

  const onChange4 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio4 checked', value);
    setValue4(value);
  };

  const InputCtrl = useMemo(() => multiline ? Input.TextArea : Input, [multiline]);
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
      <div style={{ paddingBottom: 16 }}>
        <Radio.Group
          onChange={onChange4}
          options={options}
          value={value4}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div style={{ height: "calc(100vh - 400px)", overflow: "auto" }}>
        <Form
          name="edit-lang-local"
          form={form}
          labelCol={{ span: 6 }}
          labelWrap
          wrapperCol={{ span: 17 }}
          autoComplete="off"
        >
          {
            appConfig?.schemaJson?.multiLang?.langs.map((lang) => {
              return (
                <Form.Item
                  label={t("Lang." + lang.key)}
                  name={lang.key}
                >
                  <InputCtrl />
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