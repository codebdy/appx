import { Button, Form, Input, Modal } from "antd";
import SvgIcon from "../../../common/SvgIcon";
import { getLocalMessage } from "../../../locales/getLocalMessage";
import React, { useCallback, useState } from "react";
import { memo } from "react";
import { useForm } from "antd/lib/form/Form";
import { useCreateCategory } from "./hooks/useCreateCategory";
import { useShowError } from "../../../hooks/useShowError";
import { IPageList } from "../../../model";
import { useInit } from "./hooks/useInit";

const CreateCategoryDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = useForm()
  const init = useInit();
  const [create, { loading, error }] = useCreateCategory({
    onCompleted:(data:IPageList)=>{
      init(data);
      form.resetFields();
      setIsModalVisible(false);
    }
  });

  useShowError(error);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setIsModalVisible(false);
  }, [form]);

  const handleConfirm = useCallback((values: any) => {
    form.validateFields().then((values) => {
      create(values.name)
    });
  }, [create, form]);

  return (
    <>
      <Button
        icon={
          <SvgIcon>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M13 19C13 19.34 13.04 19.67 13.09 20H4C2.9 20 2 19.11 2 18V6C2 4.89 2.89 4 4 4H10L12 6H20C21.1 6 22 6.89 22 8V13.81C21.39 13.46 20.72 13.22 20 13.09V8H4V18H13.09C13.04 18.33 13 18.66 13 19M20 18V15H18V18H15V20H18V23H20V20H23V18H20Z" />
            </svg>
          </SvgIcon>
        }
        onClick={showModal}
      >
        {getLocalMessage("pages.NewCategory")}
      </Button>
      <Modal
        title={getLocalMessage("pages.NewCategory")}
        visible={isModalVisible}
        width={400}
        cancelText={getLocalMessage("Cancel")}
        okText={getLocalMessage("Confirm")}
        onCancel={handleCancel}
        onOk={handleConfirm}
        confirmLoading={loading}
      >
        <Form
          name="addCategory"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label={getLocalMessage("pages.CagegoryName")}
            name="name"
            rules={[{ required: true, message: getLocalMessage("Required") }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default CreateCategoryDialog;