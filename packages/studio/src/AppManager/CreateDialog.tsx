import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, UploadProps, Form, Input, Modal, message } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { memo, useState } from 'react';
import { getMessage, TextWidget } from '../AppDesigner/widgets';
import { useCreateApp } from '../hooks/useCreateApp';
import { IAppInput } from '../model/input';
import { useShowError } from './../hooks/useShowError';

const CreateDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm<IAppInput>();

  const [create, { loading, error }] = useCreateApp(() => {
    setIsModalVisible(false);
  });

  useShowError(error);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((formData) => {
      create(formData)
      form.setFieldsValue({ title: "", description: "" })
    }).catch((err) => {
      console.error("form validate error", err);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Button
        className="hover-float"
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        <TextWidget>appManager.CreateApp</TextWidget>
      </Button>
      <Modal
        title={<TextWidget>appManager.CreateApp</TextWidget>}
        okText={<TextWidget>Confirm</TextWidget>}
        cancelText={<TextWidget>Cancel</TextWidget>}
        okButtonProps={{
          loading: loading
        }}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="createApp"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ title: "", description: "" }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={getMessage("AppName")}
            name="title"
            rules={[{ required: true, message: getMessage("Required") }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label={getMessage("Description")}
            name="description"
          >
            <Input.TextArea />
          </Form.Item> */}

          < Form.Item
            label={getMessage("Image")}
            name="image"
            valuePropName="fileList"
            // 如果没有下面这一句会报错
            getValueFromEvent={normFile}
          >
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-hint">
                <TextWidget>UploadHint1</TextWidget>
                <a><TextWidget>UploadHint2</TextWidget></a>
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default CreateDialog;