import { EditOutlined } from "@ant-design/icons"
import { Button, Form, Modal } from "antd"
import React, { useCallback, useEffect, useState } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useShowError } from "~/AppDesigner/hooks/useShowError"
import { useUpsertTemplate } from "~/AppDesigner/UiDesigner/hooks/useUpsertTemplate"
import { ITemplateInfo } from "~/model"
import { SaveTemplateForm } from "../../SaveTemplateWidget/SaveTemplateForm"

export const EditTemplateDialog = memo((
  props: {
    template: ITemplateInfo
  }
) => {
  const { template } = props;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(template);
  }, [template, form])

  const [upsert, { error, loading }] = useUpsertTemplate({
    onCompleted: () => {
      form.resetFields();
      setOpen(false);
    }
  });

  useShowError(error)

  const handleShowModal = useCallback(() => {
    setOpen(true);
  }, []);

  const handleOk = useCallback(() => {
    form.validateFields().then((values: any) => {
      upsert({
        ...template,
        ...values,
      })
    })

  }, [upsert, template]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setOpen(false);
  }, [form]);

  return (
    <>
      <Button type="text" shape="circle" icon={<EditOutlined />} onClick={handleShowModal}></Button>
      {
        open && <Modal
          title={t("Designer.EditTemplate")}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={t("Confirm")}
          cancelText={t("Cancel")}
          okButtonProps={{
            loading: loading
          }}
        >
          <SaveTemplateForm form={form} />
        </Modal>
      }

    </>
  )
})