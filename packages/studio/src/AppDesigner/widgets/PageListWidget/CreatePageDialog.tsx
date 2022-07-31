import { Button, Col, Form, Input, Modal, Row, Tabs } from "antd";
import SvgIcon from "../../../common/SvgIcon";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useForm } from "antd/lib/form/Form";
import FormTemplates from "./FormTemplates";
const { TabPane } = Tabs;

const CreateCategoryDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm()
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);


  const handleConfirm = useCallback((values: any) => {
    form.validateFields();
  }, [form]);

  const onChange =  useCallback((key: string) => {
    console.log(key);
  }, []);
  return (
    <>
      <Button
        type='primary'
        icon={
          <SvgIcon>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H14L20 8V13.09C19.67 13.04 19.34 13 19 13S18.33 13.04 18 13.09V9H13V4H6V20H13.09C13.21 20.72 13.46 21.39 13.81 22M23 18H20V15H18V18H15V20H18V23H20V20H23V18Z" />
            </svg>
          </SvgIcon>
        }
        onClick={showModal}
      >
        {getLocalMessage("pages.NewPage")}
      </Button>
      <Modal
        title={getLocalMessage("pages.NewPage")}
        visible={isModalVisible}
        width={580}
        cancelText={getLocalMessage("Cancel")}
        okText={getLocalMessage("Confirm")}
        onCancel={handleCancel}
        onOk={handleConfirm}
      >
        <Form
          name="addPage"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          autoComplete="off"
        >
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item
                label={getLocalMessage("pages.PageName")}
                name="name"
                rules={[{ required: true, message: getLocalMessage("Required") }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={getLocalMessage("pages.SelectCategory")}
                name="name"
                rules={[{ required: true, message: getLocalMessage("Required") }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="表单类" key="1">
              <FormTemplates />
            </TabPane>
            <TabPane tab="门户类" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="流程类" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </>
  )
})

export default CreateCategoryDialog;