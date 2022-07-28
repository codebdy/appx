import { Button, Card, Checkbox, Form, Input, Space } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../consts';
import { getLocalMessage } from '../locales/getLocalMessage';

const Install = memo(() => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate()
  
  const next = useCallback(() => {
    setCurrent(current => current + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrent(current => current - 1);
  }, []);

  const handleFinished = useCallback(()=>{
    navigate(LOGIN_URL);
  }, [navigate])

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      background: "url(/public/img/background1.jpg)",
      height: "100vh",
      backgroundPosition: " 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}>
      <Card
        title={getLocalMessage("install.Title")}
      >
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
              labelCol={{ span: 7 }}
              wrapperCol={{ span: 14 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label={getLocalMessage("install.Account")}
                name="username"
                rules={[{ required: true, message: getLocalMessage("Requried") }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={getLocalMessage("install.Password")}
                name="password"
                rules={[{ required: true, message: getLocalMessage("Requried") }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="withDemo" valuePropName="checked" wrapperCol={{ offset: 7, span: 16 }}>
                <Checkbox>{getLocalMessage("install.WithDemo")}</Checkbox>
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
                {getLocalMessage("install.Previous")}
              </Button>
            }

            {
              current === 0 &&
              <Button type="primary" onClick={next}>
                {getLocalMessage("install.next")}
              </Button>
            }

            {
              current === 1 &&
              <Button type="primary" onClick={next}>
                {getLocalMessage("install.Install")}
              </Button>
            }
            {
              current === 2 &&
              <Button type="primary" onClick = {handleFinished}>
                {getLocalMessage("install.Finished")}
              </Button>
            }
          </Space>
        </div>
      </Card>
    </div>
  );
});

export default Install;