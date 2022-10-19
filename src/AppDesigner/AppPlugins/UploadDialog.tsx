import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Radio, RadioChangeEvent, UploadFile, UploadProps } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpsertPluginInfo } from './hooks/useUpsertPluginInfo';
import { useShowError } from '../hooks/useShowError';
import { IPluginInfo, PluginType } from '../model';
import { PluginStatus } from '../plugin/model';
import { useUploadPlugin } from './hooks/useUploadPlugin';
import Dragger from 'antd/lib/upload/Dragger';
import { useLoadPlugins, useLoadPlugin } from '../plugin/hooks';
import { useUpsertPluginInfos } from './hooks/useUpsertPluginInfos';

export const UploadDialog: React.FC = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [operationType, setOperationType] = useState(PluginType.uploaded);
  const [uploadedPlugins, setUploadedPlugins] = useState<IPluginInfo[]>([]);
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

  const [upsertMany, { loading: multiUpserting, error: multiError }] = useUpsertPluginInfos(
    {
      onCompleted: () => {
        setIsModalVisible(false);
      }
    }
  )

  const load = useLoadPlugin();
  const multipleLoad = useLoadPlugins();
  const upload = useUploadPlugin();

  useShowError(error || multiError);

  const handleOk = useCallback(() => {
    form.validateFields().then((formData) => {
      if (formData.type === PluginType.debug) {
        load(formData.url || "", PluginType.debug)
          .then((data) => {
            if (data?.pluginInfo && data.status !== PluginStatus.Error) {
              upsert(data?.pluginInfo)
            }
          })
          .catch((err) => {
            console.error(err);
            message.error("Load debug plugin error!");
          })
      } else {
        if (uploadedPlugins.length === 0) {
          return;
        }
        multipleLoad(uploadedPlugins).then(data => {
          const succedPlugins = data.filter(plugin => plugin.status !== PluginStatus.Error);
          if (succedPlugins.length) {
            upsertMany(succedPlugins.map(plugin => plugin.pluginInfo))
          }
        }).catch((err) => {
          console.error(err);
          message.error("Load plugin error!");
        })
      }
    }).catch((err) => {
      console.error("form validate error", err);
    });
  }, [form, load, upsert, multipleLoad, upsertMany]);

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

  const handleChange = useCallback(({ fileList }) => {
    setUploadedPlugins((fileList as UploadFile[]).filter(
      file => file.status === "done" && file.xhr?.responseURL
    ).map(file => {
      const url = file.xhr?.responseURL as string;
      return {
        url: url.substring(0, url.length - 4),
        type: PluginType.uploaded,
      }
    }))
  }, [])

  const normFile = useCallback((e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  }, []);

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
          loading: upserting || multiUpserting
        }}
      >
        <Form
          name="upload-customized"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          initialValues={
            {
              url: "http://127.0.0.1:4000/",
              type: PluginType.uploaded
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
              <Radio value={PluginType.uploaded}>{t("Plugins.Upload")}</Radio>
              <Radio value={PluginType.debug}>{t("Plugins.Debug")}</Radio>
              <Radio disabled value={PluginType.market}>{t("Plugins.Market")}</Radio>
            </Radio.Group>
          </Form.Item>
          {
            operationType === PluginType.uploaded &&
            < Form.Item
              label={t("Materials.UploadFile")}
              name="file"
              valuePropName="fileList"
              // 如果没有下面这一句会报错
              getValueFromEvent={normFile}
            >
              <Dragger
                name='file'
                action={upload}
                accept={".zip"}
                multiple
                headers={{
                  authorization: 'authorization-text',
                }}
                onChange={handleChange}>
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

