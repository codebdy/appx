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
    categories: IPageCategory[],
    pages: IPage[]
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
    for (const category of categories) {
      dataNodes.push({
        title: <CategoryLabel categories={categories} category={category} />,
        key: category.id,
        children: getCategoryPages(category.id)?.map((page) => {
          return {
            title: page && <PageLabel page={page} />,
            key: page.id,
            isLeaf: true,
          }
        })
      })
    }

    for (const page of pagesWithoutCategory) {
      dataNodes.push({
        title: page && <PageLabel page={page} />,
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
    <div className='page-list-shell'>
      <div className="page-list-action">
        <CreateCategoryDialog />
        <CreatePageDialog categories={categories} />
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