import { Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import "./index.less"
import { DataNode } from 'antd/lib/tree';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreatePageDialog from './CreatePageDialog';
import { useRecoilState } from 'recoil';
import { useDesingerKey } from '../../context';
import CategoryLabel from './CategoryLabel';
import PageLabel from './PageLabel';
import { selectedPageIdState } from '../../recoil/atom';
import { IPage, IPageCategory } from '../../../model';
import { useGetPage } from '../../hooks/useGetPage';
import { usePagesWithoutCategory } from '../../hooks/usePagesWithoutCategory';
import { useGetCategoryPages } from '../../hooks/useGetCategoryPages';

const { DirectoryTree } = Tree;

const PageListWidget = memo((
  props: {
    categories?: IPageCategory[],
    pages?: IPage[]
  }
) => {
  const { categories, pages } = props;
  const key = useDesingerKey();

  const getPage = useGetPage(pages);

  // const getPageCategory = useGetPageCategory();
  const [selectedPageId, setSelectedPageId] = useRecoilState(selectedPageIdState(key));
  const pagesWithoutCategory = usePagesWithoutCategory(pages, categories);
  const getCategoryPages = useGetCategoryPages(pages);

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const category of categories){
      dataNodes.push({
        title: <CategoryLabel category={category} />,
        key: category.id,
        children: getCategoryPages((page) => {
          return {
            title: page && <PageLabel page={page} />,
            key: childId,
            isLeaf: true,
          }
        })
      })
    }
    for (const node of nodes) {
      if (node.nodeType === ListNodeType.Page) {
        const page = getPage(node.pageId)
        dataNodes.push({
          title: page && <PageLabel page={page} />,
          key: node.pageId,
          isLeaf: true,
        })
      } else if (node.nodeType === ListNodeType.Category) {

      }
    }
    return dataNodes
  }, [getPage, nodes])

  const onSelect = (selectedKeys) => {
    const page = getPage(selectedKeys?.[0]);
    if (page?.id) {
      setSelectedPageId(page?.id);
    }
  };

  return (
    <div className='page-list-shell'>
      <div className="page-list-action">
        <CreateCategoryDialog />
        <CreatePageDialog />
      </div>
      <DirectoryTree
        className='page-list-tree'
        selectedKeys={[selectedPageId]}
        onSelect={onSelect}
        treeData={getTreeData()}
      />
    </div>
  );
});

export default PageListWidget;