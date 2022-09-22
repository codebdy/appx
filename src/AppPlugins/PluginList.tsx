import { List } from 'antd';
import React, { memo, useMemo } from 'react';
import { useAppParams } from '../shared/AppRoot/context';
import { PluginItem } from './PluginItem';

export const PluginList = memo(() => {
  const { normalPlugins, debugPlugins } = useAppParams();

  const items = useMemo(() => {
    return [
      ...normalPlugins,
      ...debugPlugins
    ]
  }, [debugPlugins, normalPlugins]);

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
