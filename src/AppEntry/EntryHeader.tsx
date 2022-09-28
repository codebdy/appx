import { QuestionCircleOutlined, GithubOutlined, HomeOutlined, DownOutlined } from "@ant-design/icons"
import { Button, Divider, Menu, Space } from "antd"
import { Header } from "antd/lib/layout/layout"
import React, { useCallback } from "react"
import { memo } from "react"
import { useMatch, useNavigate, useParams } from "react-router-dom"
import { IApp } from "../model"
import { AppConfigRouts } from "./AppConfigRouts"
import { useTranslation } from "react-i18next"
import SelectLang from "../plugins/framewidgets/pc/LangSelect/view"
import { useParseLangMessage } from "../plugin-sdk/hooks/useParseLangMessage"
import AvatarMenu from "../plugins/framewidgets/pc/AvatarMenu/view"

const EntryHeader = memo((props: {
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
      <div className="app-title" style={{ marginLeft: "4px" }}>{parse(app?.title)}</div>
      <Menu
        className="app-entry-menu"
        mode="horizontal"
        defaultSelectedKeys={[match?.params?.["*"]]}
        onSelect={handleSelect}
        items={[
          {
            key: AppConfigRouts.App,
            label: t("AppEntry.UIDesign"),
          },
          {
            key: AppConfigRouts.Frame,
            label: t("AppEntry.FrameDesign"),
          },
          {
            key: AppConfigRouts.Model,
            label: <>
              {t("AppEntry.Model")}
              <DownOutlined style={{ fontSize: 10, marginLeft: 8 }} />
            </>,
            children: [
              {
                key: AppConfigRouts.Uml,
                label: t("AppEntry.UMLModel"),
              },
              {
                key: AppConfigRouts.Bpmn,
                label: t("AppEntry.BPMNFlow"),
              },
              {
                key: AppConfigRouts.Dmn,
                label: t("AppEntry.DMN"),
              },
            ]
          },
          {
            key: AppConfigRouts.Api,
            label: t("AppEntry.AppApi"),
          },
          {
            key: AppConfigRouts.Auth,
            label: t("AppEntry.ModelAuth"),
          },
          {
            key: AppConfigRouts.Plugins,
            label: t("AppEntry.Plugins"),
          },
          {
            key: AppConfigRouts.Config,
            label: t("AppEntry.BaseConfig"),
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

export default EntryHeader