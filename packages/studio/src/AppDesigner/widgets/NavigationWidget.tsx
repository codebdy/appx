import React, { memo, useCallback } from 'react'
import { ArrowLeftOutlined, DeploymentUnitOutlined, FileOutlined, PartitionOutlined, SettingOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Divider, Menu, Skeleton } from 'antd'
import { useNavigate, useParams } from "react-router-dom"
import { IApp } from '../../model';

// const logo = {
//   dark: '//img.alicdn.com/imgextra/i2/O1CN01NTUDi81fHLQvZCPnc_!!6000000003981-55-tps-1141-150.svg',
//   light:
//     '//img.alicdn.com/imgextra/i2/O1CN01Kq3OHU1fph6LGqjIz_!!6000000004056-55-tps-1141-150.svg',
// }

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="#">
            页面管理
          </a>
        ),
        icon: <FileOutlined />
      },
      {
        key: '2',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="#">
            导航菜单
          </a>
        ),
        icon: <PartitionOutlined />,
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="#">
            领域模型
          </a>
        ),
        icon: <DeploymentUnitOutlined />
      },
      {
        key: '3',
        label: (
          <a target="_blank" rel="noopener noreferrer" href="#">
            设置
          </a>
        ),
        icon: <SettingOutlined />
      },
    ]}
  />
);

export const NavigationWidget = memo((
  props: {
    app?: IApp,
    loading?: boolean
  }
) => {
  const { app, loading } = props;
  const { appId } = useParams();
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/config-app/" + appId)
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: 14, paddingLeft: "8px" }}>
      <Button className='no-border' shape='circle' onClick={handleBack}>
        <ArrowLeftOutlined />
      </Button>
      {/* <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="logo_color" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3ca9f2" />
            <stop offset="90%" stopColor="#3a29e6" />
            <stop offset="100%" stopColor="#3ca9f2" />
          </linearGradient>
        </defs>
        <path
          style={{ fill: "url(#logo_color)" }}
          d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z"
        />
      </svg> */}
      <Divider type="vertical" />
      {
        loading
          ?
          <Skeleton.Input active></Skeleton.Input>
          :
          <Breadcrumb>
            <Breadcrumb.Item>
              {app?.title}
            </Breadcrumb.Item>
            <Breadcrumb.Item>订单编辑</Breadcrumb.Item>
          </Breadcrumb>
      }
    </div>
  )
})
