import { List } from 'antd';
import React, { memo, useMemo } from 'react';
import { useAppParams } from '@rxdrag/plugin-sdk/contexts/appRoot';
import { PluginItem } from './PluginItem';

export const PluginList = memo(() => {
  const { uploadedPlugins, debugPlugins } = useAppParams();
  const items = useMemo(() => {
    return [
      ...uploadedPlugins,
      ...debugPlugins
    ]
  }, [debugPlugins, uploadedPlugins]);

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
