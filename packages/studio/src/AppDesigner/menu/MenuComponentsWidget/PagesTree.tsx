import { Collapse } from 'antd';
import { IPage, IPageCategory } from '../../../model';
import React, { memo } from 'react';
import DraggableLabel from './DraggableLabel';
import { usePagesWithoutCategory } from '../../hooks/usePagesWithoutCategory';
import { useGetCategoryPages } from '../../hooks/useGetCategoryPages';
const { Panel } = Collapse;

const PagesTree = memo((
  props: {
    categories?: IPageCategory[],
    pages?: IPage[]
  }
) => {
  const { categories, pages } = props;
  const pagesWithoutCategory = usePagesWithoutCategory(pages, categories);
  const getCategoryPage = useGetCategoryPages(pages);

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={[]}
    >
      {
        categories?.map((category) => {
          return (
            <Panel key={category.id} header={category.title}>
              {
                getCategoryPage(category.id)?.map(page => {
                  return (
                    <DraggableLabel key={page.id} dragId={page.id} title={page.title} />
                  )
                })
              }
            </Panel>
          )
        })
      }
      {
        pagesWithoutCategory?.map(page => {
          return (
            <DraggableLabel key={page.id} dragId={page.id} title={page.title} />
          )
        })
      }

    </Collapse>
  );
});

export default PagesTree;