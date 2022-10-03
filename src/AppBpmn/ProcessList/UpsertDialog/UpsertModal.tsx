import { Form, Modal, Select } from "antd"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { MultiLangInput } from "../../../plugins/inputs/components/pc/MultiLangInput/view"
import { IProcess, IProcessInput, ProcessType } from "../../../model/process"
import { useUpsertProcess } from "../../hooks/useUpsertProcess"
import { useShowError } from "../../../hooks/useShowError"

const { Option } = Select;

const empertyBpmn = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1"/>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`

export const UpsertModal = memo((
  props: {
    open?: boolean,
    process?: IProcess,
    processType?: ProcessType,
    onOpenChange?: (open?: boolean) => void,
  }
) => {
  const { open, process, processType, onOpenChange } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm<IProcessInput>();
  const [upsert, { error, loading }] = useUpsertProcess({
    onCompleted: () => {
      onOpenChange(false);
    }
  });

  useShowError(error);

  useEffect(() => {
    form.setFieldValue("type", processType);
    if (process) {
      form.setFieldsValue(process)
    }
  }, [processType, process, form])

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, []);

  const handleConfirm = useCallback(() => {
    form.validateFields().then((values) => {
      upsert({
        ...process || {},
        ...values,
        xml: process?.xml || empertyBpmn,
      })
    })
  }, []);

  return (
    <Modal
      title={t(process ? "AppBpmn.EidtProcess" : "AppBpmn.AddProcess")}
      open={open}
      width={580}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={handleClose}
      onOk={handleConfirm}
      confirmLoading={loading}
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
          name="name"
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
  )
})