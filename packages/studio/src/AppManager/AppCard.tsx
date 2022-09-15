import { SettingOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, DownloadOutlined, LoadingOutlined } from "@ant-design/icons"
import { Card, Dropdown, Menu } from "antd"
import Meta from "antd/lib/card/Meta"
import React, { memo, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { AppConfigRouts } from "../AppConfig/AppConfigRouts"
import { useParseLangMessage } from "../hooks/useParseLangMessage"
import { useRemoveApp } from "../hooks/useRemoveApp"
import { IApp } from "../model"
import { useShowError } from './../hooks/useShowError';
import { UpsertAppModel } from "./AppModel/UpsertAppModel"

const AppCard = memo((props: {
  app: IApp
}) => {
  const { app } = props;
  const [visible, setVisible] = useState(false);
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

  const imageUrl = useMemo(
    () => app?.imageUrl || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    [app?.imageUrl]
  )

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [])

  const handleOpen = useCallback(() => {
    setVisible(true);
  }, [])


  return (
    <>
      <Card
        className="hover-float app-card"
        cover={
          <div className="app-image" style={{ backgroundImage: `url(${imageUrl})` }}>
          </div>
        }
        actions={[
          // <SendOutlined key="view" />,
          <EditOutlined key="edit" onClick={handleEdit} />,
          <DownloadOutlined key="download" />,
          <Dropdown overlay={
            <Menu>
              <Menu.Item key="settings"
                icon={<SettingOutlined />}
                onClick={handleOpen}
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
      <UpsertAppModel app={app} visible={visible} onClose={handleClose} />
    </>
  )
})

export default AppCard;

