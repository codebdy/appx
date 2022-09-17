import { Button, Spin, Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import "./style.less"
import { DataNode } from 'antd/lib/tree';
import TemplateLabel from './TemplateLabel';
import { ID } from '../../shared';
import { useTranslation } from 'react-i18next';
import SvgIcon from '../../common/SvgIcon';
import { useQueryTemplates } from '../hooks/useQueryTemplates';
import { useParams } from 'react-router-dom';
import { useShowError } from '../../hooks/useShowError';

const { DirectoryTree } = Tree;

export const TemplateListWidget = memo((
  props: {
    selectedId?: ID,
    onSelected?: (selectedId?: ID) => void,
  }
) => {
  const { selectedId, onSelected } = props;
  const { t } = useTranslation();
  const { device } = useParams();
  const { data, error, loading } = useQueryTemplates(device);

  useShowError(error);

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const template of data?.template?.nodes) {
      dataNodes.push({
        title: <TemplateLabel template={template} />,
        key: template.id,
      })
    }
    return dataNodes
  }, [data?.template?.nodes])

  const onSelect = useCallback((selectedKeys) => {
    onSelected(selectedKeys?.[0])
  }, [onSelected]);

  const handleAddNew = useCallback(() => {

  }, [])

  return (
    <div className='template-list-shell'>
      <div className="template-list-action">
        <Button
          type='primary'
          icon={
            <SvgIcon>
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
                <path fill="currentColor" d="M13.81 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H14L20 8V13.09C19.67 13.04 19.34 13 19 13S18.33 13.04 18 13.09V9H13V4H6V20H13.09C13.21 20.72 13.46 21.39 13.81 22M23 18H20V15H18V18H15V20H18V23H20V20H23V18Z" />
              </svg>
            </SvgIcon>
          }
          onClick={handleAddNew}
        >
          {t("Templates.NewTemplate")}
        </Button>
      </div>
      <Spin spinning={loading}>
        <DirectoryTree
          className='template-list-tree'
          selectedKeys={[selectedId]}
          onSelect={onSelect}
          treeData={getTreeData()}
        />
      </Spin>
    </div>
  );
});
