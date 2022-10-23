import { Button, Card, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useCallback } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { DESIGN, DESIGN_FRAME } from "~/consts";
import Container from "~/plugins/framelayouts/pc/Container/view";
import { useDevices } from "../../hooks/useDevices";

export const AppFrames = memo(() => {
  const { t } = useTranslation();
  const devices = useDevices();
  const navigate = useNavigate();
  const { appId } = useParams();

  const handleClick = useCallback((key: string) => {
    navigate(`${DESIGN}/${appId}/${DESIGN_FRAME}/${key}`)
  }, [navigate]);

  return (
    <div className='content-inner'>
      <div className="content-show-block">
        <Container style={{ marginTop: 16 }}>
          {
            <Row className="app-row" gutter={24}>
              {
                devices.map((device) => {
                  return (
                    <Col span={8}>
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
                        actions={[
                          <Button
                            key="design"
                            shape="round"
                            type="primary"
                            onClick={() => handleClick(device.key)}
                          >
                            {t("AppManager.ToDesign")}
                          </Button>
                        ]}
                      >
                        <Meta
                          title={device.name + t("PageFrames.Title")}
                        />
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
          }
        </Container>
      </div>
    </div>
  )
})