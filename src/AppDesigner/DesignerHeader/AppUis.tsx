import { Row, Col, Card, Button, Skeleton } from "antd"
import Meta from "antd/lib/card/Meta"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { DESIGN, DESIGN_UI } from "~/consts"
import { useDevices } from "../hooks/useDevices"
import Container from "~/plugins/framelayouts/pc/Container/view"

const AppUis = memo((props: {
  loading?: boolean
}) => {
  const { loading } = props;
  const { appId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const devices = useDevices();

  return (
    <div className='content-inner'>
      <div className="content-show-block">
        <Container style={{ marginTop: 16 }}>
          {
            loading ?
              <Skeleton active={true}></Skeleton>
              :
              <Row className="app-row" gutter={24}>
                {
                  devices.map((device) => {
                    return (
                      <Col span={8}>
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
                              onClick={() => { navigate(`/${DESIGN}/${appId}/${DESIGN_UI}/${device.key}`) }}
                            >
                              {t("AppManager.ToDesign")}
                            </Button>,
                            <Button
                              key="preview"
                              shape="round"
                              onClick={() => { window.open(`/app/${device.key}/${appId}`) }}
                            >
                              {t("AppManager.ToPreview")}
                            </Button>,
                          ]}
                        >
                          <Meta
                            title={device.name + t("AppEntry.UI")}
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

export default AppUis