import { AutoComplete, Form, Input, Modal, Radio, RadioChangeEvent } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useAppConfig, useAppParams } from "../../shared/AppRoot/context";
import { useUpsertLangLocal } from "../../hooks/useUpsertLangLocal";
import { useShowError } from "../../hooks/useShowError";
import { LANG_INLINE_PREFIX } from "../../hooks/useParseLangMessage";
import { ID } from "..";

export enum MultilangType {
  Inline = "Inline",
  Resource = "Resource"
}

const ResourceEditDialog = memo((
  props: {
    multiline?: boolean,
    value?: string,
    visiable?: boolean,
    inline?: boolean,
    onClose: () => void,
    onChange: (value?: string) => void,
  }
) => {
  const { multiline, value, visiable, inline, onClose, onChange } = props;
  const [localResourceId, setLocalResourceId] = useState<ID>();
  const [searchText, setSearchText] = useState<string>();
  const [inputType, setInputType] = useState(MultilangType.Inline);
  const { t } = useTranslation()
  const appConfig = useAppConfig();
  const [form] = Form.useForm();
  const { langLocales } = useAppParams();

  const options = useMemo(() => {
    return langLocales?.filter(lang => {
      return lang.name?.indexOf(searchText) > -1
    }).map(lang => {
      return {
        label: lang.name,
        value: lang.name,
      }
    })
  }, [langLocales, searchText]);

  const resetForm = useCallback(() => {
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
    form.validateFields().then((formValues) => {
      if (inputType === MultilangType.Inline) {
        onChange(LANG_INLINE_PREFIX + JSON.stringify(formValues))
        onClose();
      } else {
        // if (langLocales.find(lang => lang.name === formValues.name && langLocal.id !== lang.id)) {
        //   setNameError(t("ErrorNameRepeat"))
        //   return;
        // }
      }
    })

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

  const onChangeType = ({ target: { value } }: RadioChangeEvent) => {
    setInputType(value);
  };

  const checkLocalId = useCallback((text:string)=>{
    const lang = langLocales.find(lang => lang.name === text);
    setLocalResourceId(lang?.id);
  }, [langLocales]);

  const handleSearchName = (searchText: string) => {
    setSearchText(searchText);
    checkLocalId(searchText)
  };

  const handleSelectName = (data: string) => {
    checkLocalId(data);
  };


  const InputCtrl = useMemo(() => multiline ? Input.TextArea : Input, [multiline]);
  return (
    <Modal
      title={t("MultiLang.LangInput")}
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
      {
        !inline &&
        <div style={{ paddingBottom: 16 }}>
          <Radio.Group
            onChange={onChangeType}
            options={[
              { label: t("MultiLang." + MultilangType.Inline), value: MultilangType.Inline },
              { label: t("MultiLang." + MultilangType.Resource), value: MultilangType.Resource }
            ]}
            value={inputType}
            optionType="button"
            buttonStyle="solid"
          />
        </div>
      }

      <div style={{ maxHeight: "calc(100vh - 400px)", overflow: "auto" }}>
        <Form
          name="edit-lang-local"
          form={form}
          labelCol={{ span: 6 }}
          labelWrap
          wrapperCol={{ span: 17 }}
          autoComplete="off"
        >
          {
            inputType === MultilangType.Resource &&
            <Form.Item
              label={t("Name")}
              name={"name"}
              rules={[{ required: true, message: t("Required") }]}
            >
              <AutoComplete
                options={options}
                onSelect={handleSelectName}
                onSearch={handleSearchName}
                placeholder={t("MultiLang.InputResourceName")}
              />
            </Form.Item>
          }
          {
            appConfig?.schemaJson?.multiLang?.langs.map((lang) => {
              return (
                <Form.Item
                  label={t("Lang." + lang.key)}
                  name={lang.key}
                >
                  <InputCtrl disabled={localResourceId && inputType === MultilangType.Resource} />
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