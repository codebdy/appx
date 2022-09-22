import { BugOutlined } from "@ant-design/icons"
import { Avatar, Button, List } from "antd"
import React, { useCallback } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next"
import SvgIcon from "../common/SvgIcon"
import { useShowError } from "../hooks/useShowError"
import { PluginType } from "../model"
import { useGetPluginLocalMessage } from "../plugin/hooks"
import { useDeletePluginInfo } from "../plugin/hooks/useDeletePluginInfo"
import { IInstalledPlugin } from "../plugin/model"

export const PluginItem = memo((
  props: {
    plugin: IInstalledPlugin
  }
) => {
  const { plugin } = props;
  const { t } = useTranslation();
  const { getTitle, getDescription } = useGetPluginLocalMessage();

  const [remove, { error: deletError, loading: deleting }] = useDeletePluginInfo();

  useShowError(deletError)

  const handleDelete = useCallback(() => {
    plugin.pluginInfo?.id && remove(plugin.pluginInfo?.id)
  }, [plugin.pluginInfo?.id, remove]);

  return (
    <List.Item
      actions={
        [
          <Button
            size="small"
            type="text"
            key="remove"
            loading={deleting}
            onClick={handleDelete}
          >{t("Delete")}</Button>,
          <Button
            size="small"
            type='link'
            key="update"
            disabled={plugin.pluginInfo?.type === PluginType.debug}
          >
            {t("Update")}
          </Button>,
        ]
      }
    >
      <List.Item.Meta
        avatar={<Avatar
          style={{ backgroundColor: plugin.pluginInfo?.type === PluginType.debug ? '#1890ff' : '#87d068' }}
          icon={
            plugin.pluginInfo?.type === PluginType.debug
              ?
              <BugOutlined />
              :
              <SvgIcon>

                <svg style={{ width: "24px", height: "24px", marginTop: 4 }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 6V5A2 2 0 0 0 17 3H15A2 2 0 0 0 13 5V6H11V5A2 2 0 0 0 9 3H7A2 2 0 0 0 5 5V6H3V20H21V6M19 18H5V8H19Z" />
                </svg>
              </SvgIcon>
          } />
        }
        title={getTitle(plugin.plugin)}
        description={`${t("Version")} ${plugin.plugin?.version}`}
      />
      <div>
        {getDescription(plugin.plugin)}
      </div>
    </List.Item>
  )
})