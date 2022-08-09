import { Collapse } from 'antd';
import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { useDesingerKey } from '../../context';
import { useGetPage } from '../../page/hooks/useGetPage';
import { pageListNodesState } from '../../page/recoil/atoms';
import { ListNodeType } from '../../page/recoil/IListNode';
import PageLabel from './PageLabel';
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
              <PageLabel key={node.pageId} page={getPage(node.pageId)} />
            )
          } else {
            return (
              <Panel key={node.uuid} header={node.title}>
                {
                  node.children?.map(pageId => {
                    return (
                      <PageLabel key={pageId} page={getPage(pageId)} />
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