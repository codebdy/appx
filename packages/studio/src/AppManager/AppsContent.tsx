import React from "react"
import { memo } from "react"
import AppFooter from "./AppFooter"
import { AppList } from "./AppList"
import AppManagebar from "./AppManagebar"
import { useQueryApps } from '../hooks/useQueryApps';
import { useShowError } from "../hooks/useShowError"
import { Card, Col, Row, Skeleton } from "antd"

const AppsSkeleton = () => {
  return (
    <Row gutter={[24, 24]} style={{
      minHeight: "calc(100vh - 240px)"
    }}>
      {
        new Array(4).fill(null).map((item, index) => {
          return (
            <Col span={6} key={index}>
              <Card className="hover-float app-card">
                <Skeleton active={true}></Skeleton>
              </Card>
            </Col>
          )
        })
      }

    </Row>
  )
}

const AppsContent = memo(() => {
  const { data, error, loading } = useQueryApps();
  useShowError(error)

  return (
    <>
      <AppManagebar />
      <div className='content-inner'>
        {
          loading
            ?
            <AppsSkeleton />
            :
            <AppList apps={data?.app?.nodes || []} />
        }
        <AppFooter />
      </div>
    </>
  )
})

export default AppsContent