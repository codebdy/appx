import { AppstoreOutlined, QuestionCircleOutlined, GithubOutlined, SettingOutlined, DashboardOutlined } from "@ant-design/icons"
import { Divider, Space, Button } from "antd"
import { Header } from "antd/lib/layout/layout"
import React, { memo, useCallback } from "react"
import SvgIcon from "../common/SvgIcon"
import clx from "classnames"
import { useMatch, useNavigate } from "react-router-dom"
import { InerfaceSvg } from "../icons/InterfaceIcon"
import { useTranslation } from "react-i18next"
import SelectLang from "../plugins/framewidgets/pc/LangSelect/view"
import AvatarMenu from "../plugins/framewidgets/pc/AvatarMenu/view"

export enum AppManagerRoutes {
  Root = "/",
  Model = "system-model",
  Api = "system-api",
  Auth = "system-auth",
  SystemConfig = "system-config",
  Configs = "configs",
  Devices = "devices",
  Monitor = "monitor",
}

const AppHeader = memo((props: {
  scrolled: boolean
}) => {
  const { scrolled } = props;
  const navigate = useNavigate()
  const { t } = useTranslation();
  const match = useMatch("/*")

  const handleGotoRoot = useCallback(() => {
    navigate(AppManagerRoutes.Root)
  }, [navigate])

  const handleGotoModel = useCallback(() => {
    navigate(AppManagerRoutes.Model)
  }, [navigate])

  const handleGotoApi = useCallback(() => {
    navigate(AppManagerRoutes.Api)
  }, [navigate])

  const handleGotoAuth = useCallback(() => {
    navigate(AppManagerRoutes.Auth)
  }, [navigate])

  const handleGotoConfigs = useCallback(() => {
    navigate(AppManagerRoutes.Configs)
  }, [navigate])

  const handleGotoLog = useCallback(() => {
    navigate(AppManagerRoutes.Monitor)
  }, [navigate])

  return (
    <Header className={clx("header", { "float": scrolled })}>
      <div className='logo'>
        <svg style={{ width: "40px", height: "40px" }} viewBox="0 0 24 24">
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
        </svg>
        Apper
      </div>
      <Divider className='logo-divider' type='vertical' />
      <Space className='nav-area' size={"large"}>
        <Button
          type={match.pathname === AppManagerRoutes.Root ? "primary" : undefined}
          shape="round"
          icon={<AppstoreOutlined />
          }
          className='nav-button'
          onClick={handleGotoRoot}
        >
          {t("App")}
        </Button>
        <Button
          type={match.pathname === match.pathnameBase + AppManagerRoutes.Model ? "primary" : undefined}
          shape="round"
          icon={<SvgIcon>
            <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 1024 1024">
              <path d="M907.8 226.4l0.1-0.2L526 98.2l-13.4-4.5c-0.4-0.1-0.8-0.1-1.2 0l-13.3 4.5-381.8 128 0.1 0.2c-7.7 3.2-13.4 10.7-13.4 20v509.4c0 0.7 0.4 1.4 1.1 1.7l382 162.1 13.2 5.6 12.1 5.1c0.5 0.2 1 0.2 1.4 0l12.1-5.1 13.2-5.6 382-162.1c0.7-0.3 1.1-0.9 1.1-1.7V246.3c-0.1-9.2-5.8-16.7-13.4-19.9zM483.5 862L156 723c-0.7-0.3-1.1-0.9-1.1-1.7V294.9c0-1.3 1.3-2.2 2.5-1.7l327.5 139c0.7 0.3 1.1 0.9 1.1 1.7v426.4c0 1.3-1.3 2.2-2.5 1.7z m27.8-475L201.9 255.6c-1.5-0.7-1.5-2.9 0.1-3.4l310.1-103.9 310 103.9c1.6 0.5 1.7 2.7 0.1 3.4L512.7 387c-0.4 0.2-1 0.2-1.4 0zM868 723L540.5 862c-1.2 0.5-2.5-0.4-2.5-1.7V433.9c0-0.7 0.4-1.4 1.1-1.7l327.5-139c1.2-0.5 2.5 0.4 2.5 1.7v426.4c0 0.7-0.4 1.4-1.1 1.7z" p-id="16762"></path>
            </svg>
          </SvgIcon>
          }
          className='nav-button'
          onClick={handleGotoModel}
        >
          {t("System.Model")}
        </Button>
        <Button
          type={match.pathname === match.pathnameBase + AppManagerRoutes.Api ? "primary" : undefined}
          shape="round"
          icon={<SvgIcon>
            {InerfaceSvg}
          </SvgIcon>
          }
          className='nav-button'
          onClick={handleGotoApi}
        >
          {t("System.API")}
        </Button>
        <Button
          type={match.pathname.startsWith(match.pathnameBase + AppManagerRoutes.Auth) ? "primary" : undefined}
          shape="round"
          icon={<SvgIcon>
            <svg style={{ width: "16px", height: "16px" }} fill="currentColor" viewBox="0 0 968 968">
              <path d="M512 960.16002l-9.515724-3.685949C196.871833 838.349743 161.529907 683.948187 161.529907 578.089208L161.529907 173.769672l27.282367 0.935302c212.432227 7.233752 302.889425-88.641853 303.741839-89.577155l19.472494-21.286816 19.444864 21.286816c0.715291 0.77055 86.441744 89.961918 281.052071 89.961918 0 0 0 0 0.027629 0 7.398504 0 14.96176-0.110517 22.63451-0.384763l27.282367-0.935302L862.468047 578.089208c0 105.85898-35.340903 260.259512-340.953346 378.384863L512 960.16002zM214.281341 227.840148 214.281341 578.089208c0 56.930617 0.027629 207.234855 297.718659 325.4697C809.718659 785.324062 809.718659 635.019825 809.718659 578.089208l0-350.249059c-164.852582-0.632403-259.709997-59.296501-297.718659-89.604784C473.963709 168.516018 379.105271 227.152487 214.281341 227.840148z" p-id="3358"></path>
            </svg>
          </SvgIcon>
          }
          className='nav-button'
          onClick={handleGotoAuth}
        >
          {t("Auth.Title")}
        </Button>
        <Button
          type={match.pathname.startsWith(match.pathnameBase + AppManagerRoutes.Monitor) ? "primary" : undefined}
          shape="round"
          icon={<DashboardOutlined />}
          className='nav-button'
          onClick={handleGotoLog}
        >
          {t("Monitor.Title")}
        </Button>
        <Button shape="round"
          className='nav-button'
          icon={
            <SettingOutlined />
          }
          type={
            match.pathname.startsWith(match.pathnameBase + AppManagerRoutes.Configs)
              ?
              "primary"
              :
              undefined
          }
          onClick={handleGotoConfigs}
        >
          {t("Configs.Title")}
        </Button>
        {/* <Button shape="round" className='nav-button'>文档</Button>
      <Button shape="round" className='nav-button'>Github</Button> */}
      </Space>
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
    </Header>
  )
})

export default AppHeader
