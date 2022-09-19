import { Row, Col, Card, Button, Skeleton } from "antd"
import Meta from "antd/lib/card/Meta"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { useDevices } from "../hooks/useDevices"

const DeviceList = memo((props: {
  loading?: boolean
}) => {
  const { loading } = props;
  const { appUuid } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const devices = useDevices();

  return (
    <div className='content-inner'>
      <div className="content-show-block">
        <div className="config-content">
          {
            loading ?
              <Skeleton active={true}></Skeleton>
              :
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
                              onClick={() => { navigate(`/design-app/${device.key}/${appUuid}`) }}
                            >
                              {t("AppManager.ToDesign")}
                            </Button>,
                            <Button
                              key="preview"
                              shape="round"
                              onClick={() => { window.open(`/app/${device.key}/${appUuid}`) }}
                            >
                              {t("AppManager.ToPreview")}
                            </Button>,
                          ]}
                        >
                          <Meta
                            title={device.name + t("AppManager.Design")}
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

export default DeviceList