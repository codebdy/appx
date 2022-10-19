import { Form, Modal } from "antd"
import React, { memo, useCallback, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view"
import { CodeMeta } from "../../meta/CodeMeta"

export const CodeDialog = memo((
  props: {
    open?: boolean,
    code: CodeMeta,
    onClose: () => void,
    onConfirm: (code: CodeMeta) => void,
  }
) => {
  const { open, code, onClose, onConfirm } = props;
  const [form] = Form.useForm<CodeMeta>();
  useEffect(() => {
    form.setFieldsValue(code)
  }, [form, code])
  const { t } = useTranslation();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm({ ...code, ...changeValues })
    })
  }, [onConfirm, form])

  return (
    <Modal
      title={t("AppUml.CodeInfo")}
      open={open}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={onClose}
      onOk={handleConfirm}
      centered
      wrapProps={
        {
          onClick: (e) => {
            e.stopPropagation()
          },
        }
      }
    >
      <Form
        name="editCode"
        labelWrap
        initialValues={{ title: "", description: "" }}
        form={form}
        autoComplete="off"
      >
        <Form.Item
          label={t("Name")}
          name="name"
          rules={[{ required: true, message: t("Required") }]}
        >
          <MultiLangInput inline title={t("Name")} />
        </Form.Item>
      </Form>
    </Modal>
  )
})