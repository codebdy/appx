import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Radio, RadioChangeEvent, UploadProps } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import Dragger from 'antd/lib/upload/Dragger';
import { MaterialModule, OperationType } from './model';
import { loadDebugModule, transMaterialGroups } from '../../../material/load';
import { materialStore } from '../../../shared/global';
import { useTranslation } from 'react-i18next';

export interface IUploadModalProps {
  onAdded: (module: MaterialModule) => void
}

export const UploadDialog: React.FC<IUploadModalProps> = memo((props: IUploadModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operationType, setOperationType] = useState(OperationType.Upload)
  const [form] = Form.useForm<MaterialModule>();
  const { t } = useTranslation();
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);


  const handleOk = useCallback(() => {
    form.validateFields().then((formData) => {
      if (formData.operationType === OperationType.Debug) {
        loadDebugModule(formData.url)
          .then((data) => {
            materialStore.modules = [
              ...materialStore.modules,
              {
                ...form.getFieldsValue(),
                groups: transMaterialGroups(data.categories),
              },
            ];
            setIsModalVisible(false);
          })
          .catch((err) => {
            console.error(err);
            message.error("Load js error!");
          })
      }

    }).catch((err) => {
      console.error("form validate error", err);
    });

    //setIsModalVisible(false);
  }, [form]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onFinish = useCallback((values: any) => {
    console.log('Success:', values);
  }, []);

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }, []);

  const onTypeChange = useCallback((e: RadioChangeEvent) => {
    setOperationType(e.target.value)
  }, []);

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
        type="dashed"
        className='material-module-add-button'
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        {t("Materials.Add")}
      </Button>
      <Modal
        title={t("Materials.Cuszomized")}
        className='material-upoad-modal'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
      >
        <Form
          name="upload-customized"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          initialValues={
            {
              name: "",
              url: "http://localhost:4000/",
              operationType: OperationType.Upload
            }
          }
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={t("Materials.ComponentTypeName")}
            name="name"
            rules={[{ required: true, message: t("aterials.RequiredName") }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={t("Materials.OperationType")}
            name="operationType"
          >
            <Radio.Group
              onChange={onTypeChange}
            >
              <Radio value={OperationType.Upload}>{t("Materials.Upload")}</Radio>
              <Radio value={OperationType.Debug}>{t("Materials.Debug")}</Radio>
            </Radio.Group>
          </Form.Item>
          {
            operationType === OperationType.Upload &&
            < Form.Item
              label={t("Materials.UploadFile")}
              name="file"
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
          }
          {
            operationType === OperationType.Debug &&
            <Form.Item
              label={t("Materials.LinkAddress")}
              name="url"
              rules={[{ required: true, message: t("Materials.RequiredUrl") }]}
            >
              <Input />
            </Form.Item>
          }

        </Form>
      </Modal>
    </>
  );
})

