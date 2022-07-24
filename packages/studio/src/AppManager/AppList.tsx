import { Row, Col, Empty } from "antd"
import React, { memo } from "react"
import { IApp } from "../model"
import AppCard from "./AppCard"

const AppList = memo((props: {
  apps: IApp[]
}) => {
  const { apps } = props
  return (
    <div className="content-show-block">
      {
        apps.length > 0
          ?
          <Row gutter={[24, 24]}>
            {
              apps.map((app) => {
                return (
                  <Col span={6} key={app.uuid}>
                    <AppCard app={app} />
                  </Col>
                )
              })
            }
          </Row>
          :
          <div style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}><Empty /></div>

      }
    </div>
  )
})

export default AppList