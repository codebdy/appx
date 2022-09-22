import { List } from 'antd';
import React, { memo, useMemo } from 'react';
import { useAppParams } from '../shared/AppRoot/context';
import { PluginItem } from './PluginItem';

export const PluginList = memo(() => {
  const { plugins } = useAppParams();

  const items = useMemo(() => [...plugins], [plugins]);

  return (
    <List
      itemLayout="vertical"
      dataSource={items}
      size="large"
      renderItem={(item) => (
        <PluginItem plugin={item} />
      )}
    />
  );
});
