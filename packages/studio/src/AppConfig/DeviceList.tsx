import { Row, Col, Card, Button, Skeleton } from "antd"
import Meta from "antd/lib/card/Meta"
import React from "react"
import { memo } from "react"
import { getLocalMessage } from "../locales/getLocalMessage"
import { Device, IApp } from "../model"

const DeviceList = memo((props: {
  loading?: boolean,
  app?: IApp
}) => {
  const { loading, app } = props;
  const pcImage = "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";
  const h5Image = pcImage;
  const adminImage = h5Image;


  return (
    <div className="content-show-block">
      <div className="config-content">
        <h2>{getLocalMessage("appManager.AppDesign")}</h2>
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
                      href={`/design-app/${Device.PC}/${app?.uuid}`}
                    >
                      {getLocalMessage("appManager.ToDesign")}
                    </Button>,
                    <Button key="preview" shape="round" >{getLocalMessage("appManager.ToPreview")}</Button>,
                  ]}
                >
                  <Meta
                    title={getLocalMessage("appManager.PCDesign")}
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
                      href={`/design-app/${Device.H5}/${app?.uuid}`}
                    >
                      {getLocalMessage("appManager.ToDesign")}
                    </Button>,
                    <Button key="preview" shape="round" >{getLocalMessage("appManager.ToPreview")}</Button>,
                  ]}
                >
                  <Meta
                    title={getLocalMessage("appManager.H5Design")}
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
                      href={`/design-app/${Device.Admin}/${app?.uuid}`}
                    >
                      {getLocalMessage("appManager.ToDesign")}
                    </Button>,
                    <Button key="preview" shape="round" >{getLocalMessage("appManager.ToPreview")}</Button>,
                  ]}
                >
                  <Meta
                    title={getLocalMessage("appManager.AdminDesign")}
                  />
                </Card>
              </Col>
            </Row>
        }
      </div>
    </div>
  )
})

export default DeviceList