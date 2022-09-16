import { Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDevices } from "../hooks/useDevices";

export const AppTemplates = memo(() => {
  const { t } = useTranslation();
  const devices = useDevices();
  const navigate = useNavigate();
  
  return (
    <div className='content-inner'>
      <div className="content-show-block">
        <div className="config-content">
          {
            <Row className="app-row" gutter={24}>
              {
                devices.map((device) => {
                  return (
                    <Col span={6}>
                      <Card
                        className="hover-float"
                        cover={
                          <img
                            alt={device.name}
                            src={device.imageUrl}
                          />
                        }
                        actions={[
                          <Button
                            key="design"
                            shape="round"
                            type="primary"
                            onClick={() => { navigate(`/design-app/${device.key}`) }}
                          >
                            {t("AppManager.ToDesign")}
                          </Button>,
                          <Button
                            key="preview"
                            shape="round"
                            onClick={() => { window.open(`/app/${device.key}`) }}
                          >
                            {t("AppManager.ToPreview")}
                          </Button>,
                        ]}
                      >
                        <Meta
                          title={device.name + t("Templates.Title")}
                        />
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
          }
        </div>
      </div>
    </div>
  )
})