import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, UploadProps, Form, Modal, message } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateApp } from '../hooks/useCreateApp';
import { IAppInput } from '../model/input';
import { createUuid } from '../shared';
import MultiLangInput from '../shared/MultiLangInput';
import { useShowError } from './../hooks/useShowError';

const CreateDialog = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm<IAppInput>();
  const { t } = useTranslation();

  const [create, { loading, error }] = useCreateApp({
    onCompleted: () => {
      message.success(t("OperateSuccess"))
      setIsModalVisible(false);
    }
  });

  useShowError(error);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((formData) => {
      console.log("uuid:", createUuid())
      create({ title: formData.title, uuid: createUuid() })
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
        {t("AppManager.CreateApp")}
      </Button>
      <Modal
        title={t("AppManager.CreateApp")}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
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
            label={t("AppName")}
            name="title"
            rules={[{ required: true, message: t("Required") }]}
          >
            <MultiLangInput inline title={t("AppName")}/>
          </Form.Item>

          {/* <Form.Item
            label={t("Description")}
            name="description"
          >
            <Input.TextArea />
          </Form.Item> */}

          < Form.Item
            label={t("Image")}
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
                {t("UploadHint1")}
                <Button type="link">{t("UploadHint2")}</Button>
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default CreateDialog;