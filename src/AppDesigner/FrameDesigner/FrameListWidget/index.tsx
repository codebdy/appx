import { Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import "./style.less"
import { DataNode } from 'antd/lib/tree';
import FrameLabel from './FrameLabel';
import { ID } from '~/shared';
import CreateFrameDialog from './CreateFrameDialog';
import { FileOutlined } from '@ant-design/icons';
import { IUiFrame } from '~/model';

export const FrameListWidget = memo((
  props: {
    templates?: IUiFrame[],
    selectedId?: ID,
    onSelected: (selectedId?: ID) => void,
  }
) => {
  const { templates, selectedId, onSelected } = props;

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const template of templates) {
      dataNodes.push({
        title: <FrameLabel frame={template} />,
        icon: <FileOutlined />,
        key: template.id,
      })
    }
    return dataNodes
  }, [templates])

  const onSelect = useCallback((selectedKeys) => {
    onSelected(selectedKeys?.[0])
  }, [onSelected]);


  return (
    <div className='template-list-shell'>
      <Tree
        showIcon
        className='template-list-tree'
        selectedKeys={[selectedId]}
        onSelect={onSelect}
        treeData={getTreeData()}
      />
      <CreateFrameDialog />
    </div>
  );
});
