import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Radio, RadioChangeEvent, UploadProps } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpsertPluginInfo } from '../plugin/hooks/useUpsertPluginInfo';
import { useShowError } from '../hooks/useShowError';
import { useLoadPlugin } from '../plugin/hooks/useLoadPlugin';
import { IPluginInfo, PluginType } from '../model';
import { PluginStatus } from '../plugin/model';
import { useUploadPlugin } from './hooks/useUploadPlugin';
import Dropzone from 'react-dropzone';
import { Dragger } from './Dragger';

export const UploadDialog: React.FC = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operationType, setOperationType] = useState(PluginType.normal)
  const [form] = Form.useForm<IPluginInfo>();
  const { t } = useTranslation();
  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const [upsert, { loading: upserting, error }] = useUpsertPluginInfo(
    {
      onCompleted: () => {
        setIsModalVisible(false);
      }
    }
  );

  const load = useLoadPlugin();

  const upload = useUploadPlugin();

  useShowError(error);

  const handleOk = useCallback(() => {
    form.validateFields().then((formData) => {
      if (formData.type === PluginType.debug) {
        load(formData.url, PluginType.debug)
          .then((data) => {
            if (data?.pluginInfo && data.status !== PluginStatus.Error) {
              upsert(data?.pluginInfo)
            }
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
  }, [form, load, upsert]);

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
    action: upload,
    accept: ".zip",
    maxCount: 1,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      console.log("哈哈", info, info.file.status)
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
        shape='round'
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        {t("Plugins.Install")}
      </Button>
      <Modal
        title={t("Plugins.InstallPlugin")}
        className='plugin-upoad-modal'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t("Confirm")}
        cancelText={t("Cancel")}
        okButtonProps={{
          loading: upserting
        }}
      >
        <Form
          name="upload-customized"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          initialValues={
            {
              url: "http://127.0.0.1:4000/",
              type: PluginType.normal
            }
          }
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={t("Plugins.OperationType")}
            name="type"
          >
            <Radio.Group
              onChange={onTypeChange}
            >
              <Radio value={PluginType.normal}>{t("Plugins.Upload")}</Radio>
              <Radio value={PluginType.debug}>{t("Plugins.Debug")}</Radio>
              <Radio disabled value={PluginType.market}>{t("Plugins.Market")}</Radio>
            </Radio.Group>
          </Form.Item>
          {
            operationType === PluginType.normal &&
            < Form.Item
              label={t("Materials.UploadFile")}
              name="file"
              valuePropName="fileList"
              // 如果没有下面这一句会报错
              getValueFromEvent={normFile}
            >
              <Dragger/>
            </Form.Item>
          }
          {
            operationType === PluginType.debug &&
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
