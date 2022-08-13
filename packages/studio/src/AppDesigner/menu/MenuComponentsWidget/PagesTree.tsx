import { Collapse } from 'antd';
import { IPage, IPageCategory } from '../../../model';
import React, { memo } from 'react';
import DraggableLabel from './DraggableLabel';
import { usePagesWithoutCategory } from '../../hooks/usePagesWithoutCategory';
import { useGetCategoryPages } from '../../hooks/useGetCategoryPages';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { OTHER_PAGES_ID, PAGE_LIST_ID } from '../consts';
const { Panel } = Collapse;

const PagesTree = memo((
  props: {
    categories: IPageCategory[],
    pages: IPage[]
  }
) => {
  const { categories, pages } = props;
  const pagesWithoutCategory = usePagesWithoutCategory(pages, categories);
  const getCategoryPage = useGetCategoryPages(pages);

  return (
    <Collapse
      bordered={false}
      ghost
      defaultActiveKey={[]}
    >
      {
        categories?.map((category) => {
          return (
            <Panel key={category.id} header={category.title}>
              <Droppable droppableId={PAGE_LIST_ID + category.id} isDropDisabled={true}>
                {(provided) => (
                  <div ref={provided.innerRef}>
                    {
                      getCategoryPage(category.id)?.map((page, index) => {
                        return (
                          <Draggable key={page.id} draggableId={page.id} index={index}>
                            {(provided, snapshot) => (
                              <>
                                <DraggableLabel
                                  title={page.title}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  float={snapshot.isDragging}
                                  ref={provided.innerRef}
                                />
                                {snapshot.isDragging && (
                                  <DraggableLabel
                                    key={page.id}
                                    title={page.title}
                                    fixed
                                  />
                                )}
                              </>
                            )}
                          </Draggable>
                        )
                      })
                    }
                    <div style={{ display: "none" }}>{provided.placeholder}</div>
                  </div>)}
              </Droppable>
            </Panel>
          )
        })
      }
      <Droppable droppableId={PAGE_LIST_ID + OTHER_PAGES_ID} isDropDisabled={true}>
        {(provided) => (
          <div ref={provided.innerRef}>
            {
              pagesWithoutCategory?.map((page, index) => {
                return (
                  <Draggable key={page.id} draggableId={page.id} index={index}>
                    {(provided, snapshot) => (
                      <>
                        <DraggableLabel
                          title={page.title}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          float={snapshot.isDragging}
                        />
                        {snapshot.isDragging && (
                          <DraggableLabel key={page.id} title={page.title} />
                        )}
                      </>
                    )}
                  </Draggable>
                )
              })
            }
            <div style={{ display: "none" }}>{provided.placeholder}</div>
          </div>)}
      </Droppable>
    </Collapse>
  );
});

export default PagesTree;