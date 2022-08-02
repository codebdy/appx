import { QuestionCircleOutlined, GithubOutlined, HomeOutlined } from "@ant-design/icons"
import { Button, Divider, Menu, Space } from "antd"
import { Header } from "antd/lib/layout/layout"
import React, { useCallback } from "react"
import { memo } from "react"
import AvatarMenu from "../AppManager/AvatarMenu"
import { useNavigate } from "react-router-dom"
import { IApp } from "../model"
import { getLocalMessage } from "../locales/getLocalMessage"
import { AppConfigRouts } from "./AppConfigRouts"

const ConifgHeader = memo((props: {
  app?: IApp,
}) => {
  const { app } = props;
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/")
  }, [navigate]);

  const handleSelect = useCallback((info) => {
    navigate(`/config-app/${app?.uuid}/${info.key}`)
  }, [app?.uuid, navigate]);

  return (
    <Header className="header">
      <Button className="no-border" shape="circle" onClick={handleBack}><HomeOutlined /></Button>
      <Divider type='vertical' />
      <div style={{ marginLeft: "4px" }}>{app?.title}</div>
      <Menu
        className="app-config-menu"
        mode="horizontal"
        defaultSelectedKeys={[AppConfigRouts.App]}
        onSelect={handleSelect}
        items={[
          {
            key: AppConfigRouts.Base,
            label: getLocalMessage("AppConfig.BaseConfig"),
          },
          {
            key: AppConfigRouts.App,
            label: getLocalMessage("AppConfig.UIDesign"),
          },
          {
            key: AppConfigRouts.Model,
            label: getLocalMessage("AppConfig.DomainModel"),
          },
          {
            key: AppConfigRouts.Api,
            label: getLocalMessage("AppConfig.AppApi"),
          },
          {
            key: AppConfigRouts.Auth,
            label: getLocalMessage("AppConfig.ModelAuth"),
          },
          {
            key: AppConfigRouts.Flow,
            label: getLocalMessage("AppConfig.FlowDesign"),
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