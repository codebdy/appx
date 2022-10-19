import { Form, Modal, Select } from "antd"
import React, { memo, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { MultiLangInput } from "~/plugins/inputs/components/pc/MultiLangInput/view"
import { IProcess, IProcessInput, ProcessType } from "~/model/process"
import { useShowError } from "~/hooks/useShowError"
import { createUuid } from "~/shared"
import { useUpsertProcess } from "../../hooks/useUpsertProcess"

const { Option } = Select;

const empertyBpmn = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Web Modeler" exporterVersion="59c8727" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.0.0" camunda:diagramRelationId="ea0ce2e3-b302-4fb4-941a-2ce99ea8b1aa">
  <bpmn:process id="$processId" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="$processId">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="150" y="100" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`

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
        id: process?.id,
        ...values,
        xml: !process?.id ? empertyBpmn.replace("$processId", "Process_" + createUuid()) : undefined,
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
            <Option value={ProcessType.workFlow}>{t("AppBpmn.BusinessFlow")}</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})