import { Button, Card, Space } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { getLocalMessage } from '../locales/getLocalMessage';

const Install = memo(() => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(current + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrent(current - 1);
  }, []);

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
          minHeight: 200,
          width: 400
        }}>
          {
            current === 0 &&
            <>
              <p>Appx 低代码平台，强大、高效！</p>
              <p>请点击“下一步”，开始安装。</p>
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
              <Button onClick={() => next()}>
                {getLocalMessage("install.Previous")}
              </Button>
            }

            <Button type="primary" onClick={() => next()}>
              {getLocalMessage("install.next")}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
});

export default Install;