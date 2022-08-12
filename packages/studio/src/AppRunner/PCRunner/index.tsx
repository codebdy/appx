import { UserOutlined, VideoCameraOutlined, UploadOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { memo } from "react";
import { useAppParams } from "../../shared/AppRoot/context";
import TablePage from "../RunnerDistributer/TablePage";
import HeaderContent from "./components/HeaderContent";
import ProLayout from "./components/ProLayout";

const PCRunner = memo(() => {
  const { app } = useAppParams();

  return (
    <div
      id="appx-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        title={app.title}
        logo={
          <svg style={{ width: "40px", height: "40px" }} viewBox="0 0 24 24">
            <defs>
              <linearGradient id="logo_color" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3a29e6" />
                <stop offset="90%" stopColor="#f155c3" />
                <stop offset="100%" stopColor="#3a29e6" />
              </linearGradient>
            </defs>
            <path
              style={{ fill: "url(#logo_color)" }}
              d="M23 11.5L19.95 10.37C19.69 9.22 19.04 8.56 19.04 8.56C17.4 6.92 14.75 6.92 13.11 8.56L11.63 10.04L5 3C4 7 5 11 7.45 14.22L2 19.5C2 19.5 10.89 21.5 16.07 17.45C18.83 15.29 19.45 14.03 19.84 12.7L23 11.5M17.71 11.72C17.32 12.11 16.68 12.11 16.29 11.72C15.9 11.33 15.9 10.7 16.29 10.31C16.68 9.92 17.32 9.92 17.71 10.31C18.1 10.7 18.1 11.33 17.71 11.72Z"
            />
          </svg>
        }
        menu={
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              }, {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              }, {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              }, {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              }, {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              }, {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              }, {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              }, {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        }
        header={<HeaderContent />}
        footer={"©Copyright 悠闲的水 2022"}
      >
        fwfwewewe
        <TablePage />
      </ProLayout>
    </div>
  )
})

export default PCRunner;