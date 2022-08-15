import { QuestionCircleOutlined, GithubOutlined, HomeOutlined } from "@ant-design/icons"
import { Button, Divider, Menu, Space } from "antd"
import { Header } from "antd/lib/layout/layout"
import React, { useCallback } from "react"
import { memo } from "react"
import AvatarMenu from "../AppManager/AvatarMenu"
import { useMatch, useNavigate, useParams } from "react-router-dom"
import { IApp } from "../model"
import { AppConfigRouts } from "./AppConfigRouts"
import { useTranslation } from "react-i18next"
import SelectLang from "../shared/SelectLang"
import { useParseLangMessage } from "../hooks/useParseLangMessage"

const ConifgHeader = memo((props: {
  app?: IApp,
}) => {
  const { app } = props;
  const navigate = useNavigate()
  const handleBack = useCallback(() => {
    navigate("/")
  }, [navigate]);

  const { t } = useTranslation();

  const { appUuid } = useParams();
  const match = useMatch(`/config-app/${appUuid}/*`)
  const parse = useParseLangMessage();
  const handleSelect = useCallback((info) => {
    navigate(`/config-app/${app?.uuid}/${info.key}`)
  }, [app?.uuid, navigate]);

  return (
    <Header className="header">
      <Button className="no-border" shape="circle" onClick={handleBack}><HomeOutlined /></Button>
      <Divider type='vertical' />
      <div style={{ marginLeft: "4px" }}>{parse(app?.title)}</div>
      <Menu
        className="app-config-menu"
        mode="horizontal"
        defaultSelectedKeys={[match?.params?.["*"]]}
        onSelect={handleSelect}
        items={[
          {
            key: AppConfigRouts.Base,
            label: t("AppConfig.BaseConfig"),
          },
          {
            key: AppConfigRouts.App,
            label: t("AppConfig.UIDesign"),
          },
          {
            key: AppConfigRouts.Model,
            label: t("AppConfig.DomainModel"),
          },
          {
            key: AppConfigRouts.Api,
            label: t("AppConfig.AppApi"),
          },
          {
            key: AppConfigRouts.Auth,
            label: t("AppConfig.ModelAuth"),
          },
          {
            key: AppConfigRouts.Flow,
            label: t("AppConfig.FlowDesign"),
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
        <SelectLang />
      </Space>
    </Header >
  )
})

export default ConifgHeader