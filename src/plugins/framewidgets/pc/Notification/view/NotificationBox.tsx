import { SettingOutlined } from "@ant-design/icons"
import { Button, Card, List } from "antd"
import moment from "moment";
import React, { memo, useEffect, useRef } from "react"
import { useShowError } from "~/AppDesigner/hooks/useShowError";
import { useLayzyQueryRecentNotifications } from "~/plugins/framewidgets/hooks/useLayzyQueryRecentNotifications";
import { useLocalTranslations } from "./hooks/useLocalTranslations";

export const NotificationBox = memo((
  props: {
    count?: number;
  }
) => {
  const { count } = props;
  const [query, { notifications, error, loading }] = useLayzyQueryRecentNotifications();
  const queryRef = useRef(query);
  queryRef.current = query

  useShowError(error);

  useEffect(() => {
    queryRef.current && queryRef.current()
  }, [count])

  const { t } = useLocalTranslations();
  return (
    <Card
      className="notificaiton-box float"
      actions={[
        <div className="actions">
          <Button type="text" icon={<SettingOutlined />}>{t("Settings")}</Button>
          <Button type="text" >{t("ViewAll")}</Button>
        </div>
      ]}
    >
      <List
        className="notification-list"
        itemLayout="horizontal"
        loading={loading}
        dataSource={notifications}
        renderItem={item => (
          <List.Item>
            {item.read ? item.text : <b>{item.text}</b>}
            <List.Item.Meta
              description={moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            />
          </List.Item>
        )}
      />
    </Card>
  )
})