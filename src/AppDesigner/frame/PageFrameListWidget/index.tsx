import { Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import "./style.less"
import { DataNode } from 'antd/lib/tree';
import PageFrameLabel from './PageFrameLabel';
import CreatePageFrameDialog from './CreatePageFrameDialog';
import { FileOutlined } from '@ant-design/icons';
import { useAppViewKey } from '../../../shared/AppRoot/context';
import { pageFramesState, selectedFrameIdState } from '../../recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil'

export const PageFrameListWidget = memo(() => {
  const key = useAppViewKey();
  const [selectedId, setSelectedId] = useRecoilState(selectedFrameIdState(key));
  const pageFrames = useRecoilValue(pageFramesState(key));

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const template of pageFrames || []) {
      dataNodes.push({
        title: <PageFrameLabel pageFrame={template} />,
        icon: <FileOutlined />,
        key: template.id,
      })
    }
    return dataNodes
  }, [pageFrames])

  const onSelect = useCallback((selectedKeys) => {
    setSelectedId(selectedKeys?.[0])
  }, []);


  return (
    <div className='template-list-shell'>
      <Tree
        showIcon
        className='template-list-tree'
        selectedKeys={[selectedId]}
        onSelect={onSelect}
        treeData={getTreeData()}
      />
      <CreatePageFrameDialog />
    </div>
  );
});
