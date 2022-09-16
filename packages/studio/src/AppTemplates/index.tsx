import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useCallback } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDevices } from "../hooks/useDevices";

export const AppTemplates = memo(() => {
  const { t } = useTranslation();
  const devices = useDevices();
  const navigate = useNavigate();

  const handleClick = useCallback((key: string) => {

  }, []);

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
                        style={{
                          cursor: "pointer",
                        }}
                        cover={
                          <img
                            alt={device.name}
                            src={device.imageUrl}
                          />
                        }
                        onClick={() => handleClick(device.key)}
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