import { Row, Col, Card, Button, Skeleton } from "antd"
import Meta from "antd/lib/card/Meta"
import React from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useParams } from "react-router-dom"
import { Device } from "../model"

const DeviceList = memo((props: {
  loading?: boolean
}) => {
  const { loading } = props;
  const pcImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
  const h5Image = pcImage;
  const adminImage = h5Image;
  const { appUuid } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className='content-inner'>
      <div className="content-show-block">
        <div className="config-content">
          <h2>{t("appManager.AppDesign")}</h2>
          {
            loading ?
              <Skeleton active={true}></Skeleton>
              :
              <Row className="app-row" gutter={24}>
                <Col span={6}>
                  <Card
                    cover={
                      <img
                        alt="example"
                        src={pcImage}
                      />
                    }
                    actions={[
                      <Button
                        key="design"
                        shape="round"
                        type="primary"
                        onClick={() => { navigate(`/design-app/${Device.PC}/${appUuid}`) }}
                      >
                        {t("appManager.ToDesign")}
                      </Button>,
                      <Button key="preview" shape="round" >{t("appManager.ToPreview")}</Button>,
                    ]}
                  >
                    <Meta
                      title={t("appManager.PCDesign")}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    cover={
                      <img
                        alt="example"
                        src={h5Image}
                      />
                    }
                    actions={[
                      <Button
                        key="design"
                        shape="round"
                        type="primary"
                        onClick={() => { navigate(`/design-app/${Device.H5}/${appUuid}`) }}
                      >
                        {t("appManager.ToDesign")}
                      </Button>,
                      <Button key="preview" shape="round" >{t("appManager.ToPreview")}</Button>,
                    ]}
                  >
                    <Meta
                      title={t("appManager.H5Design")}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card
                    cover={
                      <img
                        alt="example"
                        src={adminImage}
                      />
                    }
                    actions={[
                      <Button
                        key="design"
                        shape="round"
                        type="primary"
                        onClick={() => { navigate(`/design-app/${Device.Admin}/${appUuid}`) }}
                      >
                        {t("appManager.ToDesign")}
                      </Button>,
                      <Button key="preview" shape="round" >{t("appManager.ToPreview")}</Button>,
                    ]}
                  >
                    <Meta
                      title={t("appManager.AdminDesign")}
                    />
                  </Card>
                </Col>
              </Row>
          }
        </div>
      </div>
    </div>
  )
})

export default DeviceList