import React from "react"
import { memo } from "react"
import AppFooter from "./AppFooter"
import AppList from "./AppList"
import AppManagebar from "./AppManagebar"
import { useApps } from './../hooks/useApps';
import { useShowError } from "../hooks/useShowError"
import Meta from "antd/lib/card/Meta"
import { Card, Col, Row, Skeleton } from "antd"

const AppsSkeleton = () => {
  return (
    <Row gutter={[24, 24]}>
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
  const { data, error, loading } = useApps();
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
            <AppList apps={data || []} />
        }
        <AppFooter />
      </div>
    </>
  )
})

export default AppsContent