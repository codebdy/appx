import { SettingOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, DownloadOutlined, LoadingOutlined } from "@ant-design/icons"
import { Card, Dropdown, Menu } from "antd"
import Meta from "antd/lib/card/Meta"
import React, { memo, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { AppEntryRouts } from "../AppDesigner/DesignerHeader/AppEntryRouts"
import { useParseLangMessage } from "@rxdrag/plugin-sdk/hooks/useParseLangMessage"
import { useRemoveApp } from "../AppDesigner/hooks/useRemoveApp"
import { IApp } from "../model"
import { useShowError } from '~/AppDesigner/hooks/useShowError';
import { UpsertAppModel } from "./AppModal/UpsertAppModel";
import { DESIGN } from "~/consts"

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
    navigate(`/${DESIGN}/${app.uuid}/${AppEntryRouts.AppUis}`)
  }, [app.uuid, navigate])

  const handleRemove = useCallback(() => {
    remove(app.id)
  }, [app.id, remove])

  const imageUrl = useMemo(
    () => app?.imageUrl || "/public/img/bird.png",
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
          <div className="app-image bottom-border" style={{ backgroundImage: `url(${imageUrl})` }}>
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
          //description={app.description}
        />
      </Card>
      {
        visible && <UpsertAppModel app={app} visible={visible} onClose={handleClose} />
      }

    </>
  )
})

export default AppCard;

