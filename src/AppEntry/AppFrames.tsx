import { Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useCallback } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDevices } from "../hooks/useDevices";

export const AppFrames = memo(() => {
  const { t } = useTranslation();
  const devices = useDevices();
  const navigate = useNavigate();
  const { appUuid } = useParams();
  
  const handleClick = useCallback((key: string) => {
    navigate(`/design-frame/${key}/${appUuid}/`)
  }, [navigate]);

  return (
    <div className='content-inner'>
      <div className="content-show-block">
        <div className="config-content" style={{ marginTop: 16 }}>
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