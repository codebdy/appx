import { QuestionCircleOutlined, GithubOutlined, HomeOutlined } from "@ant-design/icons"
import { Button, Divider, Menu,  Space } from "antd"
import { Header } from "antd/lib/layout/layout"
import React, { useCallback } from "react"
import { memo } from "react"
import AvatarMenu from "../AppManager/AvatarMenu"
import { useNavigate } from "react-router-dom"
import { IApp } from "../model"
import { getLocalMessage } from "../locales/getLocalMessage"

const ConifgHeader = memo((props: {
  app?: IApp
}) => {
  const { app } = props;
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/")
  }, [navigate]);
  const onChange = useCallback((key: string) => {
    console.log(key);
  }, []);

  return (
    <Header className="header">
      <Button className="no-border" shape="circle" onClick={handleBack}><HomeOutlined /></Button>
      <Divider type='vertical' />
      <div style={{ marginLeft: "4px" }}>{app?.title}</div>
      <Menu
        className="app-config-menu"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={[
          {
            key: 1,
            label: "基础配置",
          },
          {
            key: 2,
            label: "应用设计",
          },
          {
            key: "model",
            label: getLocalMessage("panels.DomainModel"),
          },
          {
            key: "api",
            label: getLocalMessage("panels.ApiTest"),
          },
          {
            key: "auth",
            label: getLocalMessage("panels.ModelAuth"),
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