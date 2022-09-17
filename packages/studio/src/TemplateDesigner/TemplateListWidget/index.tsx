import { Spin, Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import "./style.less"
import { DataNode } from 'antd/lib/tree';
import TemplateLabel from './TemplateLabel';
import { ID } from '../../shared';
import { useQueryTemplates } from '../hooks/useQueryTemplates';
import { useParams } from 'react-router-dom';
import { useShowError } from '../../hooks/useShowError';
import CreatePageDialog from './CreateTemplateDialog';
import { FileOutlined } from '@ant-design/icons';

export const TemplateListWidget = memo((
  props: {
    selectedId?: ID,
    onSelected: (selectedId?: ID) => void,
  }
) => {
  const { selectedId, onSelected } = props;
  const { device } = useParams();
  const { data, error, loading } = useQueryTemplates(device);

  useShowError(error);

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const template of data?.template?.nodes || []) {
      dataNodes.push({
        title: <TemplateLabel template={template} />,
        icon: <FileOutlined />,
        key: template.id,
      })
    }
    return dataNodes
  }, [data?.template?.nodes])

  const onSelect = useCallback((selectedKeys) => {
    onSelected(selectedKeys?.[0])
  }, [onSelected]);


  return (
    <div className='template-list-shell'>
      <Spin spinning={loading}>
        <Tree
          showIcon
          className='template-list-tree'
          selectedKeys={[selectedId]}
          onSelect={onSelect}
          treeData={getTreeData()}
        />
        <CreatePageDialog />
      </Spin>
    </div>
  );
});
