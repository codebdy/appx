import { QuestionCircleOutlined, GithubOutlined, HomeOutlined } from "@ant-design/icons"
import { Button, Divider, Menu, Space } from "antd"
import { Header } from "antd/lib/layout/layout"
import React, { useCallback } from "react"
import { memo } from "react"
import AvatarMenu from "../AppManager/AvatarMenu"
import { useNavigate } from "react-router-dom"
import { IApp } from "../model"
import { getLocalMessage } from "../locales/getLocalMessage"

const ConifgHeader = memo((props: {
  app?: IApp,
  onChange: (key: string) => void,
}) => {
  const { app, onChange } = props;
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/")
  }, [navigate]);

  const handleSelect = useCallback((info) => {
    onChange(info.key)
  }, [onChange]);

  return (
    <Header className="header">
      <Button className="no-border" shape="circle" onClick={handleBack}><HomeOutlined /></Button>
      <Divider type='vertical' />
      <div style={{ marginLeft: "4px" }}>{app?.title}</div>
      <Menu
        className="app-config-menu"
        mode="horizontal"
        defaultSelectedKeys={["app"]}
        onSelect={handleSelect}
        items={[
          {
            key: "base",
            label: getLocalMessage("AppConfig.BaseConfig"),
          },
          {
            key: "app",
            label: getLocalMessage("AppConfig.AplicationDesign"),
          },
          {
            key: "model",
            label: getLocalMessage("AppConfig.DomainModel"),
          },
          {
            key: "api",
            label: getLocalMessage("AppConfig.ApiTest"),
          },
          {
            key: "auth",
            label: getLocalMessage("AppConfig.ModelAuth"),
          },
        ]}
      />

      <Space>
        <Button className='min-button' size='large' shape="circle" icon={<QuestionCircleOutlined />} />
        <Button
          className='min-button'
          size='large'
          shape="circle"
          icon={<GithubOutlined />}
          href="https://github.com/rxdrag/apper"
          target="_blank"
        />
        <AvatarMenu />
      </Space>
    </Header >
  )
})

export default ConifgHeader