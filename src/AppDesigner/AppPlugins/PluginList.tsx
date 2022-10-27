import { List } from 'antd';
import React, { memo, useMemo } from 'react';
import { useDesignerParams } from '~/plugin-sdk/contexts/desinger';
import { PluginItem } from './PluginItem';

export const PluginList = memo(() => {
  const { uploadedPlugins, debugPlugins } = useDesignerParams();
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
