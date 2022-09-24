import { Form, message, Modal, Select } from "antd"
import React, { useCallback, useEffect } from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { ImageUploader } from "../../components/ImageUploader";
import { MultiLangInput } from "../../components/pc";
import { useUpsertApp } from "../../hooks/useUpsertApp";
import { useShowError } from "../../hooks/useShowError";
import { IAppInput } from "../../model/input";
import { createUuid } from "../../shared";
import { IApp } from "../../model";
import { useDevices } from "../../hooks/useDevices";
import { useParseLangMessage } from "../../hooks/useParseLangMessage";
import { useQueryAllTemplates } from "../../hooks/useQueryAllTemplates";
const { Option } = Select;

const TEMPLATE_PREFIX = "template-";

export const UpsertAppModel = memo((
  props: {
    app?: IApp,
    visible?: boolean,
    onClose?: () => void,
  }
) => {
  const { app, visible, onClose } = props;
  const [form] = Form.useForm<IAppInput>();
  const { t } = useTranslation();
  const devices = useDevices();
  const p = useParseLangMessage();
  const { data, error: queryError, loading: quering } = useQueryAllTemplates();

  const reset = useCallback(() => {
    form.setFieldsValue({ title: app?.title || "", description: app?.description || "", imageUrl: app?.imageUrl || "" })
    for (const device of devices) {
      form.setFieldValue(TEMPLATE_PREFIX + device.key, app?.templates?.find(tmp => tmp.device === device.key)?.id)
    }
  }, [app?.description, app?.imageUrl, app?.templates, app?.title, devices, form])

  useEffect(() => {
    reset();
  }, [form, reset])

  const [upsert, { loading, error }] = useUpsertApp({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
      onClose();
    }
  });

  useShowError(error || queryError);

  const handleOk = useCallback(() => {
    form.validateFields().then((formData) => {
      const templates = [];
      for (const key of Object.keys(formData)) {
        if (key.startsWith(TEMPLATE_PREFIX) && formData[key]) {
          templates.push({ id: formData[key] })
        }
      }

      if (templates.length === 0) {
        message.error(t("AppManager.AtLeastOneTemplate"))
        return;
      }
      const { title, imageUrl } = formData;
      upsert({ title, imageUrl, uuid: app?.uuid || createUuid(), id: app?.id, templates: { sync: templates } })
      !app && reset();
    }).catch((err) => {
      console.error("form validate error", err);
    });
  }, [app, upsert, form, reset, t]);

  return (
    <Modal
      title={app ? t("AppManager.UpdateApp") : t("AppManager.CreateApp")}
      okText={t("Confirm")}
      cancelText={t("Cancel")}
      okButtonProps={{
        loading: loading
      }}
      open={visible}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form
        name="createApp"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ title: "", description: "" }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label={t("AppName")}
          name="title"
          rules={[{ required: true, message: t("Required") }]}
        >
          <MultiLangInput inline title={t("AppName")} />
        </Form.Item>

        {/* <Form.Item
        label={t("Description")}
        name="description"
      >
        <Input.TextArea />
      </Form.Item> */}

        < Form.Item
          label={t("Image")}
          name="imageUrl"
        >
          <ImageUploader title={t("Upload")} maxCount={1} />
        </Form.Item>
        {
          devices.map(device => {
            return (
              < Form.Item
                label={t("AppManager.TemplateSelect", { name: device.name })}
                name={TEMPLATE_PREFIX + device.key}
              >
                <Select allowClear loading={quering}>
                  {
                    data?.template?.nodes?.map(template => {
                      return (
                        <Option value={template.id}>{p(template.title)}</Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            )
          })
        }
      </Form>
    </Modal>
  )
})