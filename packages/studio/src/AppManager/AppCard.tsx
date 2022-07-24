import { SettingOutlined, EditOutlined, EllipsisOutlined, SendOutlined, DeleteOutlined, DownloadOutlined, LoadingOutlined } from "@ant-design/icons"
import { Card, Dropdown, Menu } from "antd"
import Meta from "antd/lib/card/Meta"
import React, { memo, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { TextWidget } from "../AppDesigner/widgets"
import { useRemoveApp } from "../hooks/useRemoveApp"
import { IApp } from "../model"
import { useShowError } from './../hooks/useShowError';

const AppCard = memo((props: {
  app: IApp
}) => {
  const { app } = props;
  const navigate = useNavigate();
  const [remove, { loading, error }] = useRemoveApp();

  useShowError(error)

  const handleEdit = useCallback(() => {
    navigate("/config-app/" + app.id)
  }, [navigate])

  const handleRemove = useCallback(() => {
    remove(app.id)
  }, [])


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
              <TextWidget>Settings</TextWidget>
            </Menu.Item>
            <Menu.Item key="remove" icon={<DeleteOutlined />} onClick={handleRemove}>
              <TextWidget>Delete</TextWidget>
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
        title={app.title}
        description={app.description}
      />
    </Card>
  )
})

export default AppCard;

