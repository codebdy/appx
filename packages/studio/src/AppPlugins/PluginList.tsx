import { BugOutlined } from '@ant-design/icons';
import { Avatar, Button, List } from 'antd';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../common/SvgIcon';
import { useAppParams } from '../shared/AppRoot/context';
import { useGetPluginLocalMessage } from '../plugin/hooks/useGetPluginLocalMessage';
import { PluginType } from '../model';

export const PluginList = memo(() => {
  const { plugins } = useAppParams();

  const { t } = useTranslation();
  const { getTitle, getDescription } = useGetPluginLocalMessage();

  const items = useMemo(() => [...plugins], [plugins]);

  return (
    <List
      itemLayout="vertical"
      dataSource={items}
      size="large"
      renderItem={(item) => (
        <List.Item
          actions={
            [
              <Button size="small" type="text" key="remove">{t("Delete")}</Button>,
              <Button size="small" type='link' key="update">{t("Update")}</Button>,
            ]
          }
        >
          <List.Item.Meta
            avatar={<Avatar
              style={{ backgroundColor: item.pluginInfo?.type === PluginType.debug ? '#1890ff' : '#87d068' }}
              icon={
                item.pluginInfo?.type === PluginType.debug
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
            title={getTitle(item.plugin)}
            description={`${t("Version")} ${item.plugin?.version}`}
          />
          <div>
            {getDescription(item.plugin)}
          </div>
        </List.Item>
      )}
    />
  );
});
