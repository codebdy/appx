import { Button, Checkbox, Form, Input, Space } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../consts';
import { useInstall } from '../enthooks/hooks/useInstall';
import { useShowError } from '../hooks/useShowError';
import { getLocalMessage } from '../locales/getLocalMessage';
import * as meta from './data.json';

const InstallForm = memo(() => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [install, { loading, error }] = useInstall({
    onCompleted: (data) => {
      if (data?.install) {
        next()
      }
    }
  })

  useShowError(error)

  const next = useCallback(() => {
    setCurrent(current => current + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrent(current => current - 1);
  }, []);

  const handleInstall = useCallback(() => {
    form.validateFields().then((values) => {
      install({
        meta,
        ...values
      })
    })

  }, [form, install])

  const handleFinished = useCallback(() => {
    navigate(LOGIN_URL);
  }, [navigate])

  return (
    <>
      <div style={{
        minHeight: 160,
        width: 400
      }}>
        {
          current === 0 &&
          <>
            <p>Appx 低代码平台，强大、高效！</p>
            <p>请点击“下一步”，开始安装。</p>
          </>
        }
        {
          current === 1 &&
          <Form
            name="install"
            form={form}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ admin: "admin", password: "123456", withDemo: true }}
            autoComplete="off"
          >
            <Form.Item
              label={t("install.Account")}
              name="admin"
              rules={[{ required: true, message: t("Requried") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("install.Password")}
              name="password"
              rules={[{ required: true, message: t("Requried") }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name="withDemo" valuePropName="checked" wrapperCol={{ offset: 7, span: 16 }}>
              <Checkbox>{t("install.WithDemo")}</Checkbox>
            </Form.Item>
          </Form>
        }
        {
          current === 2 &&
          <>
            <p>您已经成功安装Appx</p>
            <p>马上开启神奇之旅吧！</p>
          </>
        }
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Space>
          {
            current === 1 &&
            <Button onClick={prev}>
              {t("install.Previous")}
            </Button>
          }

          {
            current === 0 &&
            <Button type="primary" onClick={next}>
              {t("install.next")}
            </Button>
          }

          {
            current === 1 &&
            <Button type="primary" onClick={handleInstall} loading={loading}>
              {t("install.Install")}
            </Button>
          }
          {
            current === 2 &&
            <Button type="primary" onClick={handleFinished}>
              {t("install.Finished")}
            </Button>
          }
        </Space>
      </div>
    </>
  );
});

export default InstallForm;