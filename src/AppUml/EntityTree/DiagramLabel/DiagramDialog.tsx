import { Form, Modal } from "antd"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { PackageMeta, PackageStereoType } from "../../meta/PackageMeta"
import { MultiLangInput } from "../../../plugins/inputs/components/pc/MultiLangInput/view"
import { DiagramMeta } from "../../meta/DiagramMeta"

export const DiagramDialog = memo((
  props: {
    open?: boolean,
    diagram: DiagramMeta,
    onClose: () => void,
    onConfirm: (diagram: DiagramMeta) => void,
  }
) => {
  const { open, diagram: diagram, onClose, onConfirm } = props;
  const [form] = Form.useForm<PackageMeta>();
  useEffect(() => {
    form.setFieldsValue(diagram)
  }, [form, diagram])
  const { t } = useTranslation();

  const handleConfirm = useCallback(() => {
    form.validateFields().then(changeValues => {
      onConfirm({ ...diagram, ...changeValues })
    })
  }, [onConfirm, form])

  return (
    <Modal
      title={t("AppUml.PackageInfo")}
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
        name="editProcess"
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