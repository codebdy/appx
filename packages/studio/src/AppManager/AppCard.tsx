import { SettingOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, DownloadOutlined, LoadingOutlined, SendOutlined } from "@ant-design/icons"
import { Card, Dropdown, Menu } from "antd"
import Meta from "antd/lib/card/Meta"
import React, { memo, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { AppConfigRouts } from "../AppConfig/AppConfigRouts"
import { useParseLangMessage } from "../hooks/useParseLangMessage"
import { useRemoveApp } from "../hooks/useRemoveApp"
import { IApp } from "../model"
import { useShowError } from './../hooks/useShowError';

const AppCard = memo((props: {
  app: IApp
}) => {
  const { app } = props;
  const navigate = useNavigate();
  const [remove, { loading, error }] = useRemoveApp();
  const { t } = useTranslation();
  useShowError(error)
  const parse = useParseLangMessage();

  const handleEdit = useCallback(() => {
    navigate(`/config-app/${app.uuid}/${AppConfigRouts.App}`)
  }, [app.uuid, navigate])

  const handleRemove = useCallback(() => {
    remove(app.id)
  }, [app.id, remove])

  return (
    <Card
      className="hover-float app-card"
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SendOutlined key="view" />,
        <EditOutlined key="edit" onClick={handleEdit} />,
        <DownloadOutlined key="download" />,
        <Dropdown overlay={
          <Menu>
            <Menu.Item key="settings"
              icon={<SettingOutlined />}
            >
              {t("Settings")}
            </Menu.Item>
            <Menu.Item key="remove" icon={<DeleteOutlined />} onClick={handleRemove}>
              {t("Delete")}
            </Menu.Item>
          </Menu>
        } placement="bottomRight" arrow trigger={['click']} disabled={loading}>
          {
            loading ?
              <LoadingOutlined />
              :
              <EllipsisOutlined key="ellipsis" />
          }
        </Dropdown>,
      ]}
    >
      <Meta
        title={parse(app.title)}
        description={app.description}
      />
    </Card>
  )
})

export default AppCard;

