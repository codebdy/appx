import { AppstoreOutlined, QuestionCircleOutlined, GithubOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons"
import { Divider, Space, Button, Menu, Dropdown } from "antd"
import { Header } from "antd/lib/layout/layout"
import React, { memo, useCallback } from "react"
import SvgIcon from "../common/SvgIcon"
import AvatarMenu from "./AvatarMenu"
import clx from "classnames"
import { useMatch, useNavigate } from "react-router-dom"
import { InerfaceSvg } from "../icons/InterfaceIcon"
import { useTranslation } from "react-i18next"
import SelectLang from "../plugins/framewidgets/pc/LangSelect/view"

export enum AppManagerRoutes {
  Root = "/",
  Model = "system-model",
  Api = "system-api",
  Auth = "system-auth",
  Config = "system-config",
  Devices = "devices",
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

  const handleGotoConfig = useCallback(() => {
    navigate(AppManagerRoutes.Config)
  }, [navigate])


  const menu = (
    <Menu
      selectedKeys={[match.pathname.substring(1)]}
    >
      <Menu.Item key={AppManagerRoutes.Model}
        icon={
          <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 1024 1024">
            <path d="M907.8 226.4l0.1-0.2L526 98.2l-13.4-4.5c-0.4-0.1-0.8-0.1-1.2 0l-13.3 4.5-381.8 128 0.1 0.2c-7.7 3.2-13.4 10.7-13.4 20v509.4c0 0.7 0.4 1.4 1.1 1.7l382 162.1 13.2 5.6 12.1 5.1c0.5 0.2 1 0.2 1.4 0l12.1-5.1 13.2-5.6 382-162.1c0.7-0.3 1.1-0.9 1.1-1.7V246.3c-0.1-9.2-5.8-16.7-13.4-19.9zM483.5 862L156 723c-0.7-0.3-1.1-0.9-1.1-1.7V294.9c0-1.3 1.3-2.2 2.5-1.7l327.5 139c0.7 0.3 1.1 0.9 1.1 1.7v426.4c0 1.3-1.3 2.2-2.5 1.7z m27.8-475L201.9 255.6c-1.5-0.7-1.5-2.9 0.1-3.4l310.1-103.9 310 103.9c1.6 0.5 1.7 2.7 0.1 3.4L512.7 387c-0.4 0.2-1 0.2-1.4 0zM868 723L540.5 862c-1.2 0.5-2.5-0.4-2.5-1.7V433.9c0-0.7 0.4-1.4 1.1-1.7l327.5-139c1.2-0.5 2.5 0.4 2.5 1.7v426.4c0 0.7-0.4 1.4-1.1 1.7z" p-id="16762"></path>
          </svg>
        }

        onClick={handleGotoModel}
      >
        {t("System.Model")}
      </Menu.Item>
      <Menu.Item key={AppManagerRoutes.Api}
        icon={InerfaceSvg}
        onClick={handleGotoApi}
      >
        {t("System.API")}
      </Menu.Item>
      <Menu.Item key={AppManagerRoutes.Auth}
        icon={
          <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 1024 1024">
            <path d="M513.169577 0L115.983092 126.164413c-14.864629 4.708299-24.960981 18.503314-24.980974 34.09768l2.04926 496.120737 0.46983 5.667952a347.046602 347.046602 0 0 0 98.244502 166.21994c62.43744 61.587747 215.662075 142.098656 281.048449 176.456242 10.276287 5.408046 17.943517 9.416598 22.331931 11.84572l7.457305 4.048537a17.468688 17.468688 0 0 0 16.324102 0.209924l10.866074-5.537999c38.366137-18.753224 232.545975-115.808155 304.749885-186.982438 47.872702-44.953757 81.970382-102.602927 98.284487-166.21994l2.299169-501.618751a35.791068 35.791068 0 0 0-24.980973-34.307604L513.169577 0z m355.171667 652.834113a295.624183 295.624183 0 0 1-79.791169 130.632798c-57.239318 56.469596-212.38326 137.110458-268.772885 165.540186a17.403712 17.403712 0 0 1-16.064196 0C446.21377 918.837998 293.628904 838.666966 237.969015 783.726817a294.415619 294.415619 0 0 1-79.831155-130.632798L156.128586 192.140574a15.91425 15.91425 0 0 1 11.036013-15.174517L502.383475 70.414557a35.401209 35.401209 0 0 1 21.312299 0l335.218876 106.5515a15.902254 15.902254 0 0 1 11.12598 15.174517l-1.919307 460.703535h0.219921zM519.227389 239.413493c38.805978-0.079971 76.062516 15.254488 103.562579 42.614602a142.950348 142.950348 0 0 1 42.624599 102.273046 142.968342 142.968342 0 0 1-43.224382 102.01314 146.032234 146.032234 0 0 1-67.215713 37.126585l-0.419848 60.478148h60.6081c9.646514-0.079971 18.933159 3.688667 25.800678 10.476214a36.234907 36.234907 0 0 1 10.776106 25.670725 35.860043 35.860043 0 0 1-10.826088 25.57076A36.746722 36.746722 0 0 1 614.962797 656.212892h-60.608101l-0.259906 100.93353a35.877037 35.877037 0 0 1-10.826088 25.57076 36.677747 36.677747 0 0 1-25.950624 10.566182c-9.646514 0.079971-18.933159-3.688667-25.800677-10.476214a36.251901 36.251901 0 0 1-10.776106-25.670725l0.899675-233.905483a145.674364 145.674364 0 0 1-66.955807-37.336509 143.0843 143.0843 0 0 1 0.46983-204.586078 146.827947 146.827947 0 0 1 103.912453-42.114782l0.159943 0.21992z m88.138153 143.158273a83.41486 83.41486 0 0 0-25.100931-60.13827c-33.84777-33.217997-88.038189-33.337954-122.025908-0.24991a83.175946 83.175946 0 0 0-25.570761 59.878364 84.142597 84.142597 0 0 0 25.100931 60.218242 85.863975 85.863975 0 0 0 60.868006 24.891006c46.973027-0.459834 85.209212-37.906303 86.648692-84.859338l0.079971 0.259906z m0 0" p-id="7181"></path>
          </svg>
        }
        onClick={handleGotoAuth}
      >
        {t("System.Auth")}
      </Menu.Item>
      <Menu.Item key={AppManagerRoutes.Config}
        icon={<SettingOutlined style={{ fontSize: 16 }} />}
        onClick={handleGotoConfig}
      >
        {t("System.Config")}
      </Menu.Item>
    </Menu>
  );
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
        <Button shape="round"
          className='nav-button'
          icon={
            <SvgIcon>
              <svg className='nav-icon' fill="currentColor" style={{ width: 18, height: 16 }} viewBox="0 0 1024 1024">
                <path d="M512.474 644.74c-4.077 0-8.154-1.137-11.662-3.507L138.145 404.196c-6.068-3.983-9.67-10.62-9.67-17.826s3.602-13.937 9.67-17.825l362.667-237.037a21.259 21.259 0 0 1 23.324 0l362.667 237.037c6.068 3.982 9.671 10.62 9.671 17.825s-3.603 13.938-9.671 17.826l-134.732 88.083c-9.86 6.447-23.04 3.697-29.487-6.163-6.448-9.861-3.698-23.04 6.163-29.488l107.425-70.163L512.474 174.84 188.776 386.37l323.698 211.532 111.882-73.197c9.86-6.447 23.04-3.698 29.487 6.163 6.447 9.86 3.698 23.04-6.163 29.488l-123.639 80.782c-3.413 2.465-7.49 3.603-11.567 3.603z m0 251.26c-4.077 0-8.154-1.138-11.662-3.508L138.145 655.455c-6.068-3.982-9.67-10.62-9.67-17.825s3.602-13.938 9.67-17.826l134.732-88.083c9.86-6.447 23.04-3.697 29.487 6.163 6.448 9.861 3.698 23.04-6.163 29.488l-107.425 70.163 323.698 211.532 323.698-211.532-323.698-211.437-111.881 73.197c-9.861 6.447-23.04 3.698-29.488-6.163-6.447-9.86-3.698-23.04 6.163-29.488l123.639-80.782a21.259 21.259 0 0 1 23.324 0L886.898 619.9c6.068 3.982 9.67 10.62 9.67 17.825s-3.602 13.938-9.67 17.826L524.23 892.587A21.99 21.99 0 0 1 512.474 896z m0-474.074c-11.757 0-21.333-9.576-21.333-21.333v-251.26c0-11.757 9.576-21.333 21.333-21.333s21.333 9.576 21.333 21.333v251.26c0 11.757-9.576 21.333-21.333 21.333z m0 474.074c-11.757 0-21.333-9.576-21.333-21.333v-251.26c0-11.757 9.576-21.333 21.333-21.333s21.333 9.576 21.333 21.333v251.26c0 11.757-9.576 21.333-21.333 21.333z" p-id="11663"></path>
              </svg>
            </SvgIcon>
          }
        >
          {t("Engines")}
        </Button>

        {/* <Button shape="round" className='nav-button' icon={
          <SvgIcon>
            <svg className='nav-icon' viewBox="0 0 24 24">
              <path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L6.04,7.5L12,10.85L17.96,7.5L12,4.15M5,15.91L11,19.29V12.58L5,9.21V15.91M19,15.91V9.21L13,12.58V19.29L19,15.91Z" />
            </svg>
          </SvgIcon>

        }>
          {t("Model")}
        </Button>
        <Button shape="round" className='nav-button'
          type={match.pathname === AppManagerRoutes.Templates ? "primary" : undefined}
          icon={
            <SvgIcon>
              <svg className='nav-icon' style={{ width: 18, height: 16 }} viewBox="0 0 1024 1024">
                <path d="M512.474 644.74c-4.077 0-8.154-1.137-11.662-3.507L138.145 404.196c-6.068-3.983-9.67-10.62-9.67-17.826s3.602-13.937 9.67-17.825l362.667-237.037a21.259 21.259 0 0 1 23.324 0l362.667 237.037c6.068 3.982 9.671 10.62 9.671 17.825s-3.603 13.938-9.671 17.826l-134.732 88.083c-9.86 6.447-23.04 3.697-29.487-6.163-6.448-9.861-3.698-23.04 6.163-29.488l107.425-70.163L512.474 174.84 188.776 386.37l323.698 211.532 111.882-73.197c9.86-6.447 23.04-3.698 29.487 6.163 6.447 9.86 3.698 23.04-6.163 29.488l-123.639 80.782c-3.413 2.465-7.49 3.603-11.567 3.603z m0 251.26c-4.077 0-8.154-1.138-11.662-3.508L138.145 655.455c-6.068-3.982-9.67-10.62-9.67-17.825s3.602-13.938 9.67-17.826l134.732-88.083c9.86-6.447 23.04-3.697 29.487 6.163 6.448 9.861 3.698 23.04-6.163 29.488l-107.425 70.163 323.698 211.532 323.698-211.532-323.698-211.437-111.881 73.197c-9.861 6.447-23.04 3.698-29.488-6.163-6.447-9.86-3.698-23.04 6.163-29.488l123.639-80.782a21.259 21.259 0 0 1 23.324 0L886.898 619.9c6.068 3.982 9.67 10.62 9.67 17.825s-3.602 13.938-9.67 17.826L524.23 892.587A21.99 21.99 0 0 1 512.474 896z m0-474.074c-11.757 0-21.333-9.576-21.333-21.333v-251.26c0-11.757 9.576-21.333 21.333-21.333s21.333 9.576 21.333 21.333v251.26c0 11.757-9.576 21.333-21.333 21.333z m0 474.074c-11.757 0-21.333-9.576-21.333-21.333v-251.26c0-11.757 9.576-21.333 21.333-21.333s21.333 9.576 21.333 21.333v251.26c0 11.757-9.576 21.333-21.333 21.333z" p-id="11663"></path>
              </svg>
            </SvgIcon>
          }
          onClick={handleGotoTemplates}
        >
          {t("Engines")}
        </Button> */}

        <Dropdown overlay={menu} trigger={['click']}>
          <Button
            shape="round" className='nav-button'
            icon={
              <SvgIcon>
                <svg className='nav-icon' viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21.7 18.6V17.6L22.8 16.8C22.9 16.7 23 16.6 22.9 16.5L21.9 14.8C21.9 14.7 21.7 14.7 21.6 14.7L20.4 15.2C20.1 15 19.8 14.8 19.5 14.7L19.3 13.4C19.3 13.3 19.2 13.2 19.1 13.2H17.1C16.9 13.2 16.8 13.3 16.8 13.4L16.6 14.7C16.3 14.9 16.1 15 15.8 15.2L14.6 14.7C14.5 14.7 14.4 14.7 14.3 14.8L13.3 16.5C13.3 16.6 13.3 16.7 13.4 16.8L14.5 17.6V18.6L13.4 19.4C13.3 19.5 13.2 19.6 13.3 19.7L14.3 21.4C14.4 21.5 14.5 21.5 14.6 21.5L15.8 21C16 21.2 16.3 21.4 16.6 21.5L16.8 22.8C16.9 22.9 17 23 17.1 23H19.1C19.2 23 19.3 22.9 19.3 22.8L19.5 21.5C19.8 21.3 20 21.2 20.3 21L21.5 21.4C21.6 21.4 21.7 21.4 21.8 21.3L22.8 19.6C22.9 19.5 22.9 19.4 22.8 19.4L21.7 18.6M18 19.5C17.2 19.5 16.5 18.8 16.5 18S17.2 16.5 18 16.5 19.5 17.2 19.5 18 18.8 19.5 18 19.5M12.3 22H3C1.9 22 1 21.1 1 20V4C1 2.9 1.9 2 3 2H21C22.1 2 23 2.9 23 4V13.1C22.4 12.5 21.7 12 21 11.7V6H3V20H11.3C11.5 20.7 11.8 21.4 12.3 22Z" />
                </svg>
              </SvgIcon>
            }
            type={
              match.pathname === match.pathnameBase + AppManagerRoutes.Model ||
                match.pathname === match.pathnameBase + AppManagerRoutes.Api ||
                match.pathname === match.pathnameBase + AppManagerRoutes.Auth ||
                match.pathname === match.pathnameBase + AppManagerRoutes.Config
                ?
                "primary"
                :
                undefined
            }
          >
            {t("SystemConfig")}
            <DownOutlined style={{ fontSize: 12 }} />
          </Button>
        </Dropdown>
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