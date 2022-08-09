import { Collapse } from 'antd';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { useDesingerKey } from '../../context';
import { useGetPage } from '../../page/hooks/useGetPage';
import { pageListNodesState } from '../../page/recoil/atoms';
import { ListNodeType } from '../../page/recoil/IListNode';
import DraggableLabel from './DraggableLabel';
const { Panel } = Collapse;

const PagesTree = memo(() => {
  const key = useDesingerKey();
  const nodes = useRecoilValue(pageListNodesState(key));
  const getPage = useGetPage(key);

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={[]}
    >
      {
        nodes.map((node) => {
          if (node.nodeType === ListNodeType.Page) {
            return (
              <DraggableLabel key={node.pageId} dragId={node.pageId} title={getPage(node.pageId).title} />
            )
          } else {
            return (
              <Panel key={node.uuid} header={node.title}>
                {
                  node.children?.map(pageId => {
                    return (
                      <DraggableLabel key={pageId} dragId={pageId} title={getPage(pageId).title} />
                    )
                  })
                }
              </Panel>
            )
          }
        })
      }

    </Collapse>
  );
});

export default PagesTree;