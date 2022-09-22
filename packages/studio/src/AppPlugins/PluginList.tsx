import { List } from 'antd';
import React, { memo, useMemo } from 'react';
import { PluginType } from '../model';
import { useAppParams } from '../shared/AppRoot/context';
import { PluginItem } from './PluginItem';

export const PluginList = memo(() => {
  const { plugins } = useAppParams();

  const items = useMemo(() => {
    return [
      ...plugins?.filter(plugin => plugin.pluginInfo?.type === PluginType.normal) || [],
      ...plugins?.filter(plugin => plugin.pluginInfo?.type === PluginType.debug) || []
    ]
  }, [plugins]);

  return (
    <List
      itemLayout="vertical"
      dataSource={items}
      size="large"
      grid={{ gutter: 16, column: 2 }}
      renderItem={(item) => (
        <PluginItem plugin={item} />
      )}
    />
  );
});
