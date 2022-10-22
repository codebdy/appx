import { Row, Col, Card, Button, Skeleton } from "antd"
import Meta from "antd/lib/card/Meta"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { DESIGN_UI } from "~/consts"
import { useDevices } from "../../hooks/useDevices"

const AppUis = memo((props: {
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
        <div className="ui-list-content" style={{ marginTop: 16 }}>
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
                              onClick={() => { navigate(`/${DESIGN_UI}/${device.key}/${appUuid}`) }}
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
                            title={device.name + t("AppEntry.UI")}
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

export default AppUis