import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, Modal, Select } from "antd"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { MultiLangInput } from "../../../plugins/inputs/components/pc/MultiLangInput/view"
import { IProcessInput, ProcessType } from "../../../model/process"
import { ID } from "../../../shared"

const { Option } = Select;

export const UpsertDialog = memo((
  props: {
    processId?: ID,
    processType?: ProcessType,
    onOpenChange?: (open?: boolean) => void,
  }
) => {
  const { processId, processType, onOpenChange } = props;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm<IProcessInput>();

  useEffect(()=>{
    form.setFieldValue("type", processType)
  }, [processType, form])

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
    onOpenChange(true);
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false);
    onOpenChange(false);
  }, []);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    onOpenChange(false);
  }, []);

  return (
    <>
      <Button
        shape="circle"
        type="text"
        size="small"
        icon={<PlusOutlined />}
        onClick={handleOpen}
      ></Button>

      <Modal
        title={t(processId ? "AppBpmn.EidtProcess" : "AppBpmn.AddProcess")}
        open={open}
        width={580}
        cancelText={t("Cancel")}
        okText={t("Confirm")}
        onCancel={handleClose}
        onOk={handleConfirm}
        confirmLoading={false}
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
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ title: "", description: "" }}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label={t("Name")}
            name="title"
            rules={[{ required: true, message: t("Required") }]}
          >
            <MultiLangInput inline title={t("Name")} />
          </Form.Item>

          < Form.Item
            label={t("Type")}
            name="type"
            rules={[{ required: true, message: t("Required") }]}
          >
            <Select>
              <Option value={ProcessType.approvalFlow}>{t("AppBpmn.ApprovalFlow")}</Option>
              <Option value={ProcessType.workFlow}>{t("AppBpmn.WorkFlow")}</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})