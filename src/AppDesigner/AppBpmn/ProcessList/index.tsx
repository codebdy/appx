import { Tree } from 'antd';
import React, { memo, useCallback } from 'react';
import "./index.less"
import { DataNode } from 'antd/lib/tree';
import CreateCategoryDialog from './CreateCategoryDialog';
import CreateProcessDialog from './CreateProcessDialog';
import { useRecoilState } from 'recoil';
import { useAppViewKey } from '@rxdrag/plugin-sdk/contexts/appRoot';
import CategoryLabel from './CategoryLabel';
import ProcessLabel from './PageLabel';
import { selectedPageIdState } from '../../recoil/atom';
import { useGetPage } from '../../hooks/useGetPage';
import { usePagesWithoutCategory } from '../../hooks/usePagesWithoutCategory';
import { useGetCategoryPages } from '../../hooks/useGetCategoryPages';
import { useCategories } from '../../hooks/useCategories';

const { DirectoryTree } = Tree;

const PageListWidget = memo((
  props: {
  }
) => {
  const categories = useCategories();
  const key = useAppViewKey();

  const getPage = useGetPage();

  // const getPageCategory = useGetPageCategory();
  const [selectedPageId, setSelectedPageId] = useRecoilState(selectedPageIdState(key));
  const pagesWithoutCategory = usePagesWithoutCategory();
  const getCategoryPages = useGetCategoryPages();

  const getTreeData = useCallback(() => {
    const dataNodes: DataNode[] = []
    for (const category of categories) {
      dataNodes.push({
        title: <CategoryLabel categories={categories} category={category} />,
        key: category.id,
        children: getCategoryPages(category.uuid)?.map((page) => {
          return {
            title: page && <ProcessLabel page={page} categories={categories} />,
            key: page.id,
            isLeaf: true,
          }
        })
      })
    }

    for (const page of pagesWithoutCategory) {
      dataNodes.push({
        title: page && <ProcessLabel page={page} categories={categories}/>,
        key: page.id,
        isLeaf: true,
      })
    }
    return dataNodes
  }, [categories, getCategoryPages, pagesWithoutCategory])

  const onSelect = (selectedKeys) => {
    const page = getPage(selectedKeys?.[0]);
    if (page?.id) {
      setSelectedPageId(page?.id);
    }
  };

  return (
    <div className='process-list-shell'>
      <div className="process-list-action">
        <CreateCategoryDialog />
        <CreateProcessDialog categories={categories} />
      </div>
      <DirectoryTree
        className='process-list-tree'
        selectedKeys={[selectedPageId]}
        onSelect={onSelect}
        treeData={getTreeData()}
      />
    </div>
  );
});

export default PageListWidget;