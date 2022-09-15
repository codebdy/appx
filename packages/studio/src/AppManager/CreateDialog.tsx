import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, message } from 'antd';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCreateApp } from '../hooks/useCreateApp';
import { IAppInput } from '../model/input';
import { createUuid } from '../shared';
import { MultiLangInput } from '../components/pc/MultiLangInput';
import { useShowError } from './../hooks/useShowError';
import { ImageUploader } from '../components/ImageUploader';

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
      create({ ...formData, uuid: createUuid() })
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
            <MultiLangInput inline title={t("AppName")} />
          </Form.Item>

          {/* <Form.Item
            label={t("Description")}
            name="description"
          >
            <Input.TextArea />
          </Form.Item> */}

          < Form.Item
            label={t("Image")}
            name="imageUrl"
          >
            <ImageUploader title={t("Upload")} maxCount={1} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default CreateDialog;