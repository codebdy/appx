import React from "react"
import { memo } from "react"
import AppFooter from "./AppFooter"
import { AppList } from "./AppList"
import AppManagebar from "./AppManagebar"
import { Card, Col, Row, Skeleton } from "antd"
import { useRecoilValue } from "recoil"
import { appsLoadingState, appsState } from "../recoil/atoms"

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
  const loading = useRecoilValue(appsLoadingState);
  const apps = useRecoilValue(appsState);
  return (
    <>
      <AppManagebar />
      <div className='content-inner'>
        {
          loading
            ?
            <AppsSkeleton />
            :
            <AppList apps={apps || []} />
        }
        <AppFooter />
      </div>
    </>
  )
})

export default AppsContent